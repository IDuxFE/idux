import type { ComputedRef } from 'vue'
import type { OverlayOptions, OverlayPlacement } from '@idux/cdk/overlay/src/types'
import type { OverlayProps } from './types'

import { getCurrentInstance, watch } from 'vue'

export default function useWatcher(
  visibility: ComputedRef<boolean>,
  placement: ComputedRef<OverlayPlacement>,
  update: (options?: Partial<OverlayOptions>) => void,
): void {
  const { emit, props } = getCurrentInstance()!

  watch(visibility, () => {
    emit('update:visibility', visibility.value)
  })

  watch(placement, () => {
    emit('update:placement', placement.value)
  })

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
