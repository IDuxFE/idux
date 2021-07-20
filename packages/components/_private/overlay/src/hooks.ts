import type { ComputedRef } from 'vue'
import type { PopperInstance, PopperOptions, PopperPlacement } from '@idux/cdk/popper'
import type { OverlayProps } from './types'

import { computed, getCurrentInstance, watch } from 'vue'
import { hasSlot, Logger } from '@idux/cdk/utils'
import { usePopper } from '@idux/cdk/popper'
import { getPopperOptions } from './utils'

export function useLogger(): void {
  const { slots } = getCurrentInstance()!
  if (!hasSlot(slots, 'trigger')) {
    Logger.error('Component must contain trigger slot.')
  }
  if (!hasSlot(slots, 'overlay')) {
    Logger.error('Component must contain overlay slot.')
  }
}

export function useRenderValid(): ComputedRef<boolean> {
  const { slots } = getCurrentInstance()!

  return computed(() => hasSlot(slots, 'trigger') && hasSlot(slots, 'overlay'))
}

export function useOverlay(props: OverlayProps): PopperInstance {
  return usePopper(getPopperOptions(props))
}

export function useWatcher(
  visibility: ComputedRef<boolean>,
  placement: ComputedRef<PopperPlacement>,
  update: (options?: Partial<PopperOptions>) => () => void,
): void {
  const props = getCurrentInstance()!.props as OverlayProps

  watch(visibility, value => {
    props['onUpdate:visible'](value)
  })

  watch(placement, value => {
    props['onUpdate:placement'](value)
  })

  watch([() => props.visible, () => props.placement], ([visible, placement]) => {
    update({ visible, placement })
  })
}
