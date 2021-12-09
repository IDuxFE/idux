/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

import { genDateAtTimeZero } from './utils'

export const baseTimeSelectorProps = {
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

export const timeSelectorProps = {
  ...baseTimeSelectorProps,

  value: IxPropTypes.object<Date>(),
  defaultOpenValue: IxPropTypes.object<Date>().def(() => genDateAtTimeZero()),
  visible: IxPropTypes.bool,
  hourEnabled: IxPropTypes.bool.def(true),
  minuteEnabled: IxPropTypes.bool.def(true),
  secondEnabled: IxPropTypes.bool.def(true),
  use12Hours: IxPropTypes.bool.def(false),

  // events
  'onUpdate:value': IxPropTypes.emit<(value: Date) => void>(),
  onChange: IxPropTypes.emit<(value: Date) => void>(),
}

export type TimeSelectorProps = IxInnerPropTypes<typeof timeSelectorProps>
export type TimeSelectorPublicProps = IxPublicPropTypes<typeof timeSelectorProps>
export type TimeSelectorComponent = DefineComponent<
  Omit<HTMLAttributes, keyof TimeSelectorPublicProps> & TimeSelectorPublicProps
>
export type TimeSelectorInstance = InstanceType<DefineComponent<TimeSelectorProps>>

// private
export interface TimeSelectorCell {
  value: number | string
  disabled: boolean
}

export const timeSelectorColumnProps = {
  selectedValue: IxPropTypes.oneOfType([IxPropTypes.number, IxPropTypes.string]).isRequired,
  options: IxPropTypes.arrayOf(IxPropTypes.object<TimeSelectorCell>()).isRequired,
  visible: IxPropTypes.bool,

  // events
  onChange: IxPropTypes.emit<(value: number | string) => void>(),
}

export const timeSelectorCellProps = {
  disabled: IxPropTypes.bool.def(false),
  selected: IxPropTypes.bool.def(false),
  value: IxPropTypes.oneOfType([Number, String]).isRequired,

  // events
  onChange: IxPropTypes.emit<(value: number | string) => void>(),
}
export type BaseTimeSelectorProps = IxInnerPropTypes<typeof baseTimeSelectorProps>
export type TimeSelectorColumnProps = IxInnerPropTypes<typeof timeSelectorColumnProps>
export type TimeSelectorCellProps = IxInnerPropTypes<typeof timeSelectorCellProps>

export type TimeSelectorColumnType = 'hour' | 'minute' | 'second' | 'AM/PM'
