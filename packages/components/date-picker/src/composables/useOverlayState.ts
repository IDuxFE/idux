/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePickerProps, DateRangePickerProps } from '../types'
import type { ComputedRef } from 'vue'

import { onMounted, watch } from 'vue'

import { useControlledProp, useState } from '@idux/cdk/utils'

export interface OverlayStateContext {
  overlayOpened: ComputedRef<boolean>
  overlayVisible: ComputedRef<boolean>
  setOverlayOpened: (open: boolean) => void
  onAfterLeave: () => void
}

export function useOverlayState(props: DatePickerProps | DateRangePickerProps): OverlayStateContext {
  const [overlayOpened, setOverlayOpened] = useControlledProp(props, 'open', false)
  const [overlayVisible, setOverlayVisible] = useState(false)
  watch(
    overlayOpened,
    open => {
      if (open) {
        setOverlayVisible(true)
      }
    },
    { immediate: true },
  )

  const onAfterLeave = () => {
    if (!overlayOpened.value) {
      setOverlayVisible(false)
    }
  }

  onMounted(() => {
    if (props.autofocus) {
      setOverlayOpened(true)
    }
  })

  return { overlayOpened, overlayVisible, setOverlayOpened, onAfterLeave }
}
