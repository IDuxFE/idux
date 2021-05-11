import type { ComputedRef } from 'vue'
import type { OverlayOptions, OverlayPlacement } from '@idux/cdk/overlay'
import type { OverlayProps } from './types'

import { getCurrentInstance, watch } from 'vue'

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
