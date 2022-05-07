/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePickerProps, DateRangePickerProps, TimePanelOptions } from '../types'
import type { ɵTimePanelProps } from '@idux/components/_private/time-panel'

import { type ComputedRef, computed } from 'vue'

import { isArray } from 'lodash-es'

export function useTimePanelProps(
  props: DatePickerProps,
  timeFormatRef: ComputedRef<string>,
): ComputedRef<ɵTimePanelProps> {
  return computed(() => getTimePanelProps(props.timePanelOptions ?? {}, timeFormatRef))
}

export function useRangeTimePanelProps(
  props: DateRangePickerProps,
  timeFormatRef: ComputedRef<string>,
): ComputedRef<ɵTimePanelProps[]> {
  const getOptions = (isFrom: boolean) =>
    (isArray(props.timePanelOptions) ? props.timePanelOptions[isFrom ? 0 : 1] : props.timePanelOptions) ?? {}

  const rangeTimePanelProps = computed(() => [
    getTimePanelProps(getOptions(true), timeFormatRef),
    getTimePanelProps(getOptions(false), timeFormatRef),
  ])

  return rangeTimePanelProps
}

function getTimePanelProps(timePanelOptions: TimePanelOptions, timeFormatRef: ComputedRef<string>): ɵTimePanelProps {
  const { disabledHours, disabledMinutes, disabledSeconds, hideDisabledOptions, hourStep, minuteStep, secondStep } =
    timePanelOptions

  return {
    disabledHours,
    disabledMinutes,
    disabledSeconds,
    hideDisabledOptions,
    hourStep,
    minuteStep,
    secondStep,
    hourEnabled: /[hH]/.test(timeFormatRef.value),
    minuteEnabled: /m/.test(timeFormatRef.value),
    secondEnabled: /s/.test(timeFormatRef.value),
    use12Hours: /[aA]/.test(timeFormatRef.value),
  }
}
