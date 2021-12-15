/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimePickerProps, TimeRangePickerProps } from '../types'
import type { TimePickerConfig } from '@idux/components/config'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

export interface InputEnableStatus {
  enableExternalInput: boolean
  enableInternalInput: boolean
}

export function useInputEnableStatus(
  props: TimePickerProps | TimeRangePickerProps,
  config: TimePickerConfig,
): ComputedRef<InputEnableStatus> {
  return computed(() => {
    const allowInput = props.allowInput ?? config.allowInput

    return {
      enableExternalInput: allowInput === true,
      enableInternalInput: allowInput === 'overlay',
    }
  })
}
