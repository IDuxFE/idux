/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePickerProps, DateRangePickerProps } from '../types'
import type { PickerControlContext } from './useControl'
import type { PickerRangeControlContext } from './useRangeControl'
import type { ComputedRef } from 'vue'

import { onMounted } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'

export interface OverlayStateContext {
  overlayOpened: ComputedRef<boolean>
  setOverlayOpened: (open: boolean) => void
}

export function useOverlayState(
  props: DatePickerProps | DateRangePickerProps,
  control: PickerControlContext | PickerRangeControlContext,
): OverlayStateContext {
  const [overlayOpened, setOverlayOpened] = useControlledProp(props, 'open', false)

  const changeOpenedState = (open: boolean) => {
    setOverlayOpened(open)
    if (!open) {
      control.init(true)
    }
  }

  onMounted(() => {
    if (props.autofocus) {
      setOverlayOpened(true)
    }
  })

  return { overlayOpened, setOverlayOpened: changeOpenedState }
}
