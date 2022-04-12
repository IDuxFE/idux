/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePickerProps, DateRangePickerProps } from '../types'
import type { DatePickerConfig } from '@idux/components/config'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

export interface InputEnableStatus {
  allowInput: boolean | 'overlay'
  enableInput: boolean
  enableOverlayDateInput: boolean
  enableOverlayTimeInput: boolean
}

export function useInputEnableStatus(
  props: DatePickerProps | DateRangePickerProps,
  config: DatePickerConfig,
): ComputedRef<InputEnableStatus> {
  return computed(() => {
    const allowInput = props.allowInput ?? config.allowInput

    return {
      allowInput,
      enableInput: allowInput === true,
      enableOverlayDateInput: allowInput === 'overlay' || props.type === 'datetime',
      enableOverlayTimeInput: props.type === 'datetime',
    }
  })
}
