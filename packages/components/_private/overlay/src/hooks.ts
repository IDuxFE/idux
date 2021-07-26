import type { ComputedRef } from 'vue'
import type { PopperOptions, PopperPlacement } from '@idux/cdk/popper'
import type { OverlayProps } from './types'

import { computed, getCurrentInstance, watch } from 'vue'
import { callEmit, hasSlot, Logger } from '@idux/cdk/utils'

export function useRenderValid(): ComputedRef<boolean> {
  const { slots } = getCurrentInstance()!

  return computed(() => {
    if (!hasSlot(slots, 'trigger')) {
      Logger.error('Component must contain trigger slot.')
      return false
    }
    if (!hasSlot(slots, 'overlay')) {
      Logger.error('Component must contain overlay slot.')
      return false
    }
    return true
  })
}

export function useWatcher(
  props: OverlayProps,
  visibility: ComputedRef<boolean>,
  placement: ComputedRef<PopperPlacement>,
  update: (options?: Partial<PopperOptions>) => () => void,
): void {
  watch(visibility, value => {
    callEmit(props['onUpdate:visible'], value)
  })

  watch(placement, value => {
    callEmit(props['onUpdate:placement'], value)
  })

  watch([() => props.visible, () => props.placement], ([visible, placement]) => {
    update({ visible, placement })
  })
}
