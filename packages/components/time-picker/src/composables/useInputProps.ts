/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ɵInputProps } from '@idux/components/_private/input'

import { type ComputedRef, computed } from 'vue'

import { TimePickerContext, TimeRangePickerContext } from '../tokens'

export function useInputProps(context: TimePickerContext | TimeRangePickerContext): ComputedRef<ɵInputProps> {
  return computed(() => {
    const { props, config, accessor } = context

    return {
      borderless: false,
      clearable: props.clearable ?? config.clearable,
      clearIcon: props.clearIcon ?? config.clearIcon,
      disabled: accessor.disabled,
      size: 'sm',
    }
  })
}
