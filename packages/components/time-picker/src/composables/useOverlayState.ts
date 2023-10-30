/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimePickerProps, TimeRangePickerProps } from '../types'

import { type ComputedRef, onMounted } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'

export interface OverlayStateContext {
  overlayOpened: ComputedRef<boolean>
  setOverlayOpened: (open: boolean) => void
}

export function useOverlayState(props: TimePickerProps | TimeRangePickerProps, focus: () => void): OverlayStateContext {
  const [overlayOpened, setOverlayOpened] = useControlledProp(props, 'open', false)

  onMounted(() => {
    if (props.autofocus) {
      focus()
    }
  })

  return { overlayOpened, setOverlayOpened }
}
