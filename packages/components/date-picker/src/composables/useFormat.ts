/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { DatePickerProps } from '../types'
import type { DatePickerConfig } from '@idux/components/config'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

const defaultFormat = {
  date: 'yyyy-MM-dd',
  week: 'RRRR-II',
  month: 'yyyy-MM',
  quarter: "yyyy-'Q'Q",
  year: 'yyyy',
} as const

export function useFormat(props: DatePickerProps, config: DatePickerConfig): ComputedRef<string> {
  return computed(() => {
    let format = props.format
    if (format) {
      return format
    }
    const formatConfig = config.format
    const type = props.type
    if (formatConfig) {
      format = formatConfig[type]
    }
    return format ?? defaultFormat[type]
  })
}
