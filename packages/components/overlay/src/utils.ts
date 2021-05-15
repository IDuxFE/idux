import type { ComputedRef } from 'vue'
import type { OverlayOptions, OverlayPlacement } from '@idux/cdk/overlay'
import type { OverlayProps } from './types'

import { computed, getCurrentInstance, watch } from 'vue'
import { hasSlot, Logger } from '@idux/cdk/utils'

export function useWatcher(
  visibility: ComputedRef<boolean>,
  placement: ComputedRef<OverlayPlacement>,
  update: (options?: Partial<OverlayOptions>) => void,
): void {
  const { emit, props } = getCurrentInstance()!

  watch(
    visibility,
    () => {
      emit('update:visible', visibility.value)
    },
    { immediate: true, flush: 'post' },
  )

  watch(
    placement,
    () => {
      emit('update:placement', placement.value)
    },
    { immediate: true, flush: 'post' },
  )

  watch(
    () => props.visible,
    () => {
      update({ visible: (props as OverlayProps).visible })
    },
  )

  watch(
    () => props.placement,
    () => {
      update({ placement: (props as OverlayProps).placement })
    },
  )
}

export function getOverlayOptions(): OverlayOptions {
  const props = getCurrentInstance()!.props as OverlayProps
  return {
    visible: props.visible,
    scrollStrategy: props.scrollStrategy,
    disabled: props.disabled,
    placement: props.placement,
    trigger: props.trigger,
    allowEnter: props.allowEnter,
    autoAdjust: props.autoAdjust,
    offset: props.offset,
    hideDelay: props.hideDelay,
    showDelay: props.showDelay,
  }
}

export function useLogger(): void {
  const { slots } = getCurrentInstance()!

  if (!hasSlot(slots, 'trigger')) {
    Logger.error('The component must contain trigger slot.')
  }

  if (!hasSlot(slots, 'overlay')) {
    Logger.error('The component must contain overlay slot.')
  }
}

export function useRenderValid(): ComputedRef<boolean> {
  return computed(() => {
    const { slots } = getCurrentInstance()!
    return hasSlot(slots, 'trigger') && hasSlot(slots, 'overlay')
  })
}

export function useArrowStyle(placement: ComputedRef<OverlayPlacement>): ComputedRef<{ left?: string; top?: string }> {
  return computed(() => {
    const props = getCurrentInstance()!.props as OverlayProps
    if (!props.arrowOffset) {
      return {}
    }
    if (placement.value.startsWith('top') || placement.value.startsWith('bottom')) {
      return { left: `${props.arrowOffset}px` }
    }
    return { top: `${props.arrowOffset}px` }
  })
}
