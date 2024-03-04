/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { DatePickerProps, DateRangePickerProps } from '../types'

import { type ComputedRef, computed } from 'vue'

import { type DatePickerConfig } from '@idux/components/config'

interface TimePanelEnabledStatus {
  hourEnabled: ComputedRef<boolean>
  hourUse12Hours: ComputedRef<boolean>
  minuteEnabled: ComputedRef<boolean>
  secondEnabled: ComputedRef<boolean>
  use12Hours: ComputedRef<boolean>
}

export interface DateInputEnabledStatus {
  yearEnabled: boolean
  monthEnabled: boolean
  dateEnabled: boolean
}

export interface FormatContext extends Omit<TimePanelEnabledStatus, 'hourUse12Hours'> {
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
  const formatRef = computed(() => {
    const type = props.type
    return props.format ?? config.format?.[type] ?? defaultFormat[type]
  })

  const { hourEnabled, hourUse12Hours, minuteEnabled, secondEnabled, use12Hours } = useTimePanelEnabledStatus(
    props,
    formatRef,
  )

  const dateFormatRef = computed(() => {
    if (props.type !== 'datetime') {
      return formatRef.value
    }

    return props.dateFormat ?? defaultFormat.date
  })

  const timeFormatRef = computed(() => {
    if (props.timeFormat) {
      return props.timeFormat
    }

    const hourFormat = hourEnabled.value && (hourUse12Hours.value ? 'hh' : 'HH')
    const timeFormatBase = [hourFormat, minuteEnabled.value && 'mm', secondEnabled.value && 'ss']
      .filter(Boolean)
      .join(':')

    return use12Hours.value ? `${timeFormatBase} a` : timeFormatBase
  })

  return {
    formatRef,
    dateFormatRef,
    timeFormatRef,

    hourEnabled,
    minuteEnabled,
    secondEnabled,
    use12Hours,
  }
}

function useTimePanelEnabledStatus(
  props: DatePickerProps | DateRangePickerProps,
  formatRef: ComputedRef<string>,
): TimePanelEnabledStatus {
  const _formatRef = computed(() => props.timeFormat ?? formatRef.value)

  return {
    hourEnabled: computed(() => /[hH]/.test(_formatRef.value)),
    hourUse12Hours: computed(() => /h/.test(_formatRef.value)),
    minuteEnabled: computed(() => /m/.test(_formatRef.value)),
    secondEnabled: computed(() => /s/.test(_formatRef.value)),
    use12Hours: computed(() => /[aA]/.test(_formatRef.value)),
  }
}

export function useDateInputEnabledStatus(formatRef: ComputedRef<string>): ComputedRef<DateInputEnabledStatus> {
  return computed(() => {
    const format = formatRef.value

    return {
      yearEnabled: /[yYR]/.test(format),
      monthEnabled: /[MQID]/.test(format),
      dateEnabled: /[dDiEec]/.test(format),
    }
  })
}
