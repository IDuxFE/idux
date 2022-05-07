/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ɵBaseTimePanelProps } from '@idux/components/_private/time-panel'

import { type ComputedRef, computed } from 'vue'

import { TimePickerContext, TimeRangePickerContext } from '../tokens'

export interface CommonPanelProps extends ɵBaseTimePanelProps {
  hourEnabled: boolean
  minuteEnabled: boolean
  secondEnabled: boolean
  use12Hours: boolean
  amPmCapital: boolean
}

export function usePanelProps(context: TimePickerContext | TimeRangePickerContext): ComputedRef<CommonPanelProps> {
  return computed(() => {
    const { props, config } = context
    const {
      disabledHours,
      disabledMinutes,
      disabledSeconds,
      format,
      hideDisabledOptions,
      hourStep,
      minuteStep,
      secondStep,
    } = props

    const _format = format ?? config.format

    return {
      disabledHours,
      disabledMinutes,
      disabledSeconds,
      hideDisabledOptions,
      hourStep,
      minuteStep,
      secondStep,
      hourEnabled: /[hH]/.test(_format),
      minuteEnabled: /m/.test(_format),
      secondEnabled: /s/.test(_format),
      use12Hours: /[aA]/.test(_format),
      amPmCapital: /A/.test(_format),
    }
  })
}
