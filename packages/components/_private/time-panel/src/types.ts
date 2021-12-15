/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export const baseTimePanelProps = {
  disabledHours: IxPropTypes.func<(selectedAmPm: string) => number[]>().def(() => []),
  disabledMinutes: IxPropTypes.func<(selectedHour: number, selectedAmPm: string) => number[]>().def(() => []),
  disabledSeconds: IxPropTypes.func<
    (selectedHour: number, selectedMinute: number, selectedAmPm: string) => number[]
  >().def(() => []),

  hideDisabledOptions: IxPropTypes.bool.def(false),
  hourStep: IxPropTypes.number.def(1),
  minuteStep: IxPropTypes.number.def(1),
  secondStep: IxPropTypes.number.def(1),
}

export const timePanelProps = {
  ...baseTimePanelProps,

  value: IxPropTypes.object<Date>(),
  defaultOpenValue: IxPropTypes.object<Date>(),
  visible: IxPropTypes.bool,
  hourEnabled: IxPropTypes.bool.def(true),
  minuteEnabled: IxPropTypes.bool.def(true),
  secondEnabled: IxPropTypes.bool.def(true),
  use12Hours: IxPropTypes.bool.def(false),

  // events
  'onUpdate:value': IxPropTypes.emit<(value: Date) => void>(),
  onChange: IxPropTypes.emit<(value: Date) => void>(),
}

export type TimePanelProps = IxInnerPropTypes<typeof timePanelProps>
export type TimePanelPublicProps = IxPublicPropTypes<typeof timePanelProps>
export type TimePanelComponent = DefineComponent<
  Omit<HTMLAttributes, keyof TimePanelPublicProps> & TimePanelPublicProps
>
export type TimePanelInstance = InstanceType<DefineComponent<TimePanelProps>>

// private
export interface TimePanelCell {
  value: number | string
  disabled: boolean
}

export const timePanelColumnProps = {
  selectedValue: IxPropTypes.oneOfType([IxPropTypes.number, IxPropTypes.string]).isRequired,
  options: IxPropTypes.arrayOf(IxPropTypes.object<TimePanelCell>()).isRequired,
  visible: IxPropTypes.bool,

  // events
  onChange: IxPropTypes.emit<(value: number | string) => void>(),
}

export const timePanelCellProps = {
  disabled: IxPropTypes.bool.def(false),
  selected: IxPropTypes.bool.def(false),
  value: IxPropTypes.oneOfType([Number, String]).isRequired,

  // events
  onChange: IxPropTypes.emit<(value: number | string) => void>(),
}
export type BaseTimePanelProps = IxInnerPropTypes<typeof baseTimePanelProps>
export type TimePanelColumnProps = IxInnerPropTypes<typeof timePanelColumnProps>
export type TimePanelCellProps = IxInnerPropTypes<typeof timePanelCellProps>

export type TimePanelColumnType = 'hour' | 'minute' | 'second' | 'AM/PM'
