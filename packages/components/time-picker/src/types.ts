/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { FormSize } from '@idux/components/form'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { controlPropDef } from '@idux/cdk/forms'
import { ɵPortalTargetDef } from '@idux/cdk/portal'
import { IxPropTypes } from '@idux/cdk/utils'
import { ɵbaseTimeSelectorProps } from '@idux/components/_private'
import { getLocale } from '@idux/components/i18n'

const locale = getLocale('timePicker')

const basePickerProps = {
  ...ɵbaseTimeSelectorProps,
  // v-model
  open: IxPropTypes.bool,
  control: controlPropDef,

  allowInput: IxPropTypes.oneOf([IxPropTypes.bool, 'overlay']),
  autoSwap: IxPropTypes.bool.def(true),

  autofocus: IxPropTypes.bool,
  borderless: IxPropTypes.bool,
  clearable: IxPropTypes.bool,
  clearIcon: IxPropTypes.string,
  clearText: IxPropTypes.string,
  format: IxPropTypes.string.def('HH:mm:ss'),
  overlayClassName: IxPropTypes.string,
  size: IxPropTypes.oneOf<FormSize>(['sm', 'md', 'lg']),
  suffix: IxPropTypes.string,
  target: ɵPortalTargetDef,

  // events
  'onUpdate:open': IxPropTypes.emit<(isOpen: boolean) => void>(),
  onClear: IxPropTypes.emit<(evt: MouseEvent) => void>(),
  onFocus: IxPropTypes.emit<(evt: FocusEvent) => void>(),
  onBlur: IxPropTypes.emit<(evt: FocusEvent) => void>(),
}

export const timePickerProps = {
  ...basePickerProps,

  // v-model
  value: IxPropTypes.object<Date>(),

  defaultOpenValue: IxPropTypes.object<Date>(),
  disabled: IxPropTypes.bool.def(false),
  placeholder: IxPropTypes.string.def(locale.value.selectTime),
  readonly: IxPropTypes.bool.def(false),

  // events
  'onUpdate:value': IxPropTypes.emit<(value: Date | undefined) => void>(),
  onChange: IxPropTypes.emit<(value: Date | undefined) => void>(),
}

export type TimePickerProps = IxInnerPropTypes<typeof timePickerProps>
export type TimePickerPublicProps = IxPublicPropTypes<typeof timePickerProps>
export type TimePickerComponent = DefineComponent<HTMLAttributes & typeof timePickerProps>
export type TimePickerInstance = InstanceType<DefineComponent<TimePickerProps>>

export const timeRangePickerProps = {
  ...basePickerProps,

  // v-model
  value: IxPropTypes.object<[Date | undefined, Date | undefined]>(),

  defaultOpenValue: IxPropTypes.object<[Date | undefined, Date | undefined]>(),
  disabled: IxPropTypes.bool.def(false),
  placeholder: IxPropTypes.array<string>().def(['起始时间', '结束时间']),
  readonly: IxPropTypes.bool.def(false),

  // events
  'onUpdate:value': IxPropTypes.emit<(value: [Date | undefined, Date | undefined] | undefined) => void>(),
  onChange: IxPropTypes.emit<(value: [Date | undefined, Date | undefined] | undefined) => void>(),
}

export type TimeRangePickerProps = IxInnerPropTypes<typeof timeRangePickerProps>
export type TimeRangePickerPublicProps = IxPublicPropTypes<typeof timeRangePickerProps>
export type TimeRangePickerComponent = DefineComponent<HTMLAttributes & typeof timeRangePickerProps>
export type TimeRangePickerInstance = InstanceType<DefineComponent<TimeRangePickerProps>>

export const baseTriggerProps = {
  borderless: IxPropTypes.bool,
  clearable: IxPropTypes.bool,
  clearIcon: IxPropTypes.string,
  size: IxPropTypes.oneOf<FormSize>(['sm', 'md', 'lg']),
  suffix: IxPropTypes.string,
  disabled: IxPropTypes.bool,
  onClick: IxPropTypes.emit<(evt: Event) => void>(),
  onClear: IxPropTypes.emit<(evt: MouseEvent) => void>(),
}
export type BaseTriggerProps = IxInnerPropTypes<typeof baseTriggerProps>

export const timePickerTriggerProps = {
  value: IxPropTypes.object<Date>(),
}
export type TimePickerTriggerProps = IxInnerPropTypes<typeof timePickerTriggerProps>

export const timeRangePickerTriggerProps = {
  value: IxPropTypes.object<[Date | undefined, Date | undefined]>(),
}
export type TimeRangePickerTriggerProps = IxInnerPropTypes<typeof timeRangePickerTriggerProps>
