/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePickerProps, DateRangePickerProps, TimePanelOptions } from '../types'

import { type ComputedRef, computed } from 'vue'

import { isArray } from 'lodash-es'

export function useTimePanelProps(
  props: DatePickerProps,
  hourEnabled: ComputedRef<boolean>,
  minuteEnabled: ComputedRef<boolean>,
  secondEnabled: ComputedRef<boolean>,
  use12Hours: ComputedRef<boolean>,
): ComputedRef<TimePanelOptions> {
  return computed(() => ({
    ...getTimePanelProps(props.timePanelOptions ?? {}),
    hourEnabled: hourEnabled.value,
    minuteEnabled: minuteEnabled.value,
    secondEnabled: secondEnabled.value,
    use12Hours: use12Hours.value,
  }))
}

export function useRangeTimePanelProps(
  props: DateRangePickerProps,
  hourEnabled: ComputedRef<boolean>,
  minuteEnabled: ComputedRef<boolean>,
  secondEnabled: ComputedRef<boolean>,
  use12Hours: ComputedRef<boolean>,
): ComputedRef<TimePanelOptions[]> {
  const getOptions = (isFrom: boolean) =>
    (isArray(props.timePanelOptions) ? props.timePanelOptions[isFrom ? 0 : 1] : props.timePanelOptions) ?? {}

  const rangeTimePanelProps = computed(() => {
    const enabledStatus = {
      hourEnabled: hourEnabled.value,
      minuteEnabled: minuteEnabled.value,
      secondEnabled: secondEnabled.value,
      use12Hours: use12Hours.value,
    }

    return [
      { ...getTimePanelProps(getOptions(true)), ...enabledStatus },
      { ...getTimePanelProps(getOptions(false)), ...enabledStatus },
    ]
  })

  return rangeTimePanelProps
}

function getTimePanelProps(timePanelOptions: TimePanelOptions): TimePanelOptions {
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
  }
}
