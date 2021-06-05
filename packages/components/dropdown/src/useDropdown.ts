import type { ComputedRef, Ref } from 'vue'
import type { OverlayElement, OverlayPlacement, OverlayTrigger } from '@idux/cdk/overlay'
import type { DropdownProps } from './types'

import { computed, getCurrentInstance, onMounted, provide, ref, watch } from 'vue'
import { useOverlay } from '@idux/cdk/overlay'
import { useGlobalConfig } from '@idux/components/config'
import { dropdownToken } from './token'

export interface UseDropdownConfig {
  placement: ComputedRef<OverlayPlacement>
  trigger: ComputedRef<OverlayTrigger>
}

export const useDropdownConfig = (props: DropdownProps): UseDropdownConfig => {
  const config = useGlobalConfig('dropdown')
  const placement = computed(() => props.placement ?? config.placement)
  const trigger = computed(() => props.trigger ?? config.trigger)
  return { placement, trigger }
}

export interface UseDropdownOpenState {
  openState: Ref<boolean>
  onMouseOverlayChang: (open: boolean) => void
}

export const useDropdownOpenState = (trigger: ComputedRef<OverlayTrigger>): UseDropdownOpenState => {
  const openState = ref(false)
  const onMouseOverlayChang = (open: boolean) => {
    if (trigger.value === 'hover') {
      openState.value = open
    }
  }

  const setMenuOpenState = (open: boolean) => {
    openState.value = open
  }

  provide(dropdownToken, { setMenuOpenState, onMouseOverlayChang })

  return { openState, onMouseOverlayChang }
}

export interface UseDropdownOverlay {
  triggerRef: Ref<OverlayElement | null>
  overlayRef: Ref<OverlayElement | null>
  visibility: ComputedRef<boolean>
  onClickOutside: () => void
}

export const useDropdownOverlay = (
  props: DropdownProps,
  placement: ComputedRef<OverlayPlacement>,
  trigger: ComputedRef<OverlayTrigger>,
  openState: Ref<boolean>,
): UseDropdownOverlay => {
  const { triggerRef, overlayRef, visibility, show, hide, update, initialize } = useOverlay({
    scrollStrategy: 'reposition',
    placement: placement.value,
    trigger: trigger.value,
    visible: props.visible,
    offset: [0, 8],
    showDelay: 0,
    hideDelay: 300,
  })

  onMounted(() => initialize())

  watch([placement, trigger], ([currPlacement, currTrigger]) => {
    update({ placement: currPlacement, trigger: currTrigger })
  })

  watch(
    () => props.visible,
    visible => {
      if (visible !== visibility.value) {
        visible ? show() : hide()
      }
    },
  )

  watch(openState, currOpenState => {
    currOpenState ? show() : hide()
  })

  const { emit } = getCurrentInstance()!
  watch(visibility, visible => {
    emit('update:visible', visible)
  })

  const onClickOutside = () => {
    if (trigger.value === 'click' || trigger.value === 'contextmenu') {
      hide()
    }
  }

  return { triggerRef, overlayRef, visibility, onClickOutside }
}
