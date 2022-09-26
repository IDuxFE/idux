/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimePickerProps, TimeRangePickerProps } from '../types'
import type { ɵBaseTimePanelProps } from '@idux/components/_private/time-panel'

import { type ComputedRef, computed } from 'vue'

import { checkAmPmCapital, checkHourEnabled, checkMinuteEnabled, checkSecondEnabled, checkUse12Hours } from '../utils'

export interface CommonPanelProps extends ɵBaseTimePanelProps {
  hourEnabled: boolean
  minuteEnabled: boolean
  secondEnabled: boolean
  use12Hours: boolean
  amPmCapital: boolean
}

export function usePanelProps(
  props: TimePickerProps | TimeRangePickerProps,
  formatRef: ComputedRef<string>,
): ComputedRef<CommonPanelProps> {
  return computed(() => {
    const { disabledHours, disabledMinutes, disabledSeconds, hideDisabledOptions, hourStep, minuteStep, secondStep } =
      props
    const format = formatRef.value

    return {
      disabledHours,
      disabledMinutes,
      disabledSeconds,
      hideDisabledOptions,
      hourStep,
      minuteStep,
      secondStep,
      hourEnabled: checkHourEnabled(format),
      minuteEnabled: checkMinuteEnabled(format),
      secondEnabled: checkSecondEnabled(format),
      use12Hours: checkUse12Hours(format),
      amPmCapital: checkAmPmCapital(format),
    }
  })
}
