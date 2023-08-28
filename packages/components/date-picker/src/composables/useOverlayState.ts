/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PickerControlContext } from './useControl'
import type { PickerRangeControlContext } from './useRangeControl'
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

export function useOverlayState(
  props: DatePickerProps | DateRangePickerProps,
  control: PickerControlContext | PickerRangeControlContext,
): OverlayStateContext {
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

  const changeOpenedState = (open: boolean) => {
    setOverlayOpened(open)
    if (!open) {
      control.init(true)
    }
  }

  const onAfterLeave = () => {
    if (!overlayOpened.value) {
      setOverlayVisible(false)
    }
  }

  onMounted(() => {
    if (props.autofocus) {
      changeOpenedState(true)
    }
  })

  return { overlayOpened, overlayVisible, setOverlayOpened: changeOpenedState, onAfterLeave }
}
