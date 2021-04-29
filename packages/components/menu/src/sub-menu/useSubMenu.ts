import type { ComputedRef, ComponentPublicInstance, Ref } from 'vue'
import type { OverlayOptions } from '@idux/cdk/overlay'
import type { MenuMode, SubMenuProps } from '../types'
import type { MenuContext, SubMenuContext, SetChildSelectStateFn, SetChildOpenStateFn } from '../token'

import { computed, onMounted, onUnmounted, ref, toRaw, watch } from 'vue'
import debounce from 'lodash/debounce'
import { useOverlay } from '@idux/cdk/overlay'

export const useSubMenuClasses = (
  props: SubMenuProps,
  mode: ComputedRef<MenuMode>,
  opened: Ref<boolean>,
  isSelected: Ref<boolean>,
): ComputedRef<Record<string, boolean>> => {
  return computed(() => {
    return {
      'ix-menu-sub': true,
      'ix-menu-sub-disabled': props.disabled,
      'ix-menu-sub-opened': opened.value,
      'ix-menu-sub-selected': isSelected.value,
      [`ix-menu-sub-${mode.value}`]: true,
    }
  })
}

export interface SubMenuOverlay {
  triggerRef: Ref<ComponentPublicInstance | null>
  overlayRef: Ref<HTMLElement | null>
  visibility: ComputedRef<boolean>
  show: (showDelay?: number) => void
  hide: (hideDelay?: number) => void
  overlayWidth: Ref<string>
}

export const useSubMenuOverlay = (mode: ComputedRef<MenuMode>, opened: Ref<boolean>): SubMenuOverlay => {
  const placement = computed(() => {
    return mode.value === 'vertical' ? 'right-start' : 'bottom-start'
  })

  const options: OverlayOptions = {
    scrollStrategy: 'reposition',
    placement: placement.value,
    trigger: 'manual',
    offset: [0, 4],
    hideDelay: 0,
    showDelay: 0,
  }

  const overlay = useOverlay<ComponentPublicInstance, HTMLElement>(options)
  const { triggerRef, overlayRef, initialize, destroy, visibility, show, hide, update } = overlay

  watch(placement, currPlacement => update({ placement: currPlacement }))

  const overlayWidth = ref('')

  const syncWidth = () => {
    if (mode.value === 'horizontal' && triggerRef.value) {
      overlayWidth.value = triggerRef.value.$el.getBoundingClientRect().width + 'px'
    }
  }

  onMounted(() => {
    initialize()
    syncWidth()
    watch(opened, value => (value ? show() : hide()), { immediate: true })
  })

  onUnmounted(() => {
    destroy()
  })

  return { triggerRef, overlayRef, visibility, show, hide, overlayWidth }
}

export const useSubMenuMode = (
  menuContext: MenuContext,
  subMenuContext: SubMenuContext | null,
): ComputedRef<MenuMode> => {
  return computed(() => {
    const currMode = menuContext.mode.value
    if (currMode !== 'inline' && subMenuContext) {
      return 'vertical'
    }
    return currMode
  })
}

export interface UseSubMenuOpened {
  opened: ComputedRef<boolean>
  setOpen: (value: boolean) => void
  setChildOpenState: SetChildOpenStateFn
  setMouseOverlay: (value: boolean) => void
}

export const useSubMenuOpened = (
  cid: ComputedRef<string | number>,
  mode: ComputedRef<MenuMode>,
  menuContext: MenuContext,
  subMenuContext: SubMenuContext | null,
): UseSubMenuOpened => {
  const opened = computed(() => {
    return menuContext.openedIds.value.includes(cid.value)
  })
  const childOpen = ref(false)
  const mouseOverlay = ref(false)

  const setOpen = (opened: boolean) => {
    menuContext.setChildOpenState(cid.value, opened)
    if (subMenuContext) {
      subMenuContext.setChildOpenState(cid.value, opened)
    }
  }

  const setChildOpenState = (_: string | number, opened: boolean) => {
    childOpen.value = opened
  }

  const setMouseOverlay = debounce((value: boolean) => (mouseOverlay.value = value), 100)

  watch([mode, childOpen, mouseOverlay], ([currMode, currChildOpen, currMouseOverlay]) => {
    if (currMode !== 'inline') {
      setOpen(currChildOpen || currMouseOverlay)
    }
  })

  return { opened, setOpen, setChildOpenState, setMouseOverlay }
}

export interface UseSubMenuSelected {
  isSelected: ComputedRef<boolean>
  setChildSelectState: SetChildSelectStateFn
}

export const useSubMenuSelected = (
  cid: ComputedRef<string | number>,
  multiple: ComputedRef<boolean>,
  subMenuContext: SubMenuContext | null,
): UseSubMenuSelected => {
  const selectedIds = ref<Array<string | number>>([])

  const isSelected = computed(() => selectedIds.value.length > 0)

  watch(isSelected, selected => subMenuContext?.setChildSelectState(cid.value, selected))

  const setChildSelectState = (cid: string | number, selected: boolean) => {
    const rawSelectedIds = toRaw(selectedIds.value)
    const selectedIndex = rawSelectedIds.indexOf(cid)

    if (selected) {
      if (selectedIndex === -1) {
        selectedIds.value = multiple.value ? [...rawSelectedIds, cid] : [cid]
      }
    } else if (selectedIndex !== -1) {
      if (multiple.value) {
        rawSelectedIds.splice(selectedIndex, 1)
        selectedIds.value = [...rawSelectedIds]
      } else {
        selectedIds.value = []
      }
    }
  }

  return { isSelected, setChildSelectState }
}
