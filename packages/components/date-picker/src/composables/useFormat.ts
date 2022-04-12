/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { DatePickerProps, DateRangePickerProps } from '../types'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

import { type DatePickerConfig, useGlobalConfig } from '@idux/components/config'

export interface FormatContext {
  formatRef: ComputedRef<string>
  dateFormatRef: ComputedRef<string>
  timeFormatRef: ComputedRef<string>
}

const defaultFormat = {
  date: 'yyyy-MM-dd',
  week: 'RRRR-II',
  month: 'yyyy-MM',
  quarter: "yyyy-'Q'Q",
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
} as const

export function useFormat(props: DatePickerProps | DateRangePickerProps, config: DatePickerConfig): FormatContext {
  const timePickerConfig = useGlobalConfig('timePicker')
  const formatRef = computed(() => {
    const type = props.type
    return props.format ?? config.format?.[type] ?? defaultFormat[type]
  })

  const dateFormatRef = computed(() => {
    if (props.type !== 'datetime') {
      return formatRef.value
    }

    return props.dateFormat ?? defaultFormat.date
  })

  const timeFormatRef = computed(() => {
    return props.timeFormat ?? timePickerConfig.format
  })

  return {
    formatRef,
    dateFormatRef,
    timeFormatRef,
  }
}
