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
import { ɵbaseTimePanelProps } from '@idux/components/_private/time-panel'

const basePickerProps = {
  ...ɵbaseTimePanelProps,
  // v-model
  open: IxPropTypes.bool,
  control: controlPropDef,

  allowInput: IxPropTypes.oneOfType([Boolean, IxPropTypes.oneOf(['overlay'])]),
  autoSwap: IxPropTypes.bool.def(true),

  autofocus: IxPropTypes.bool,
  borderless: IxPropTypes.bool,
  clearable: IxPropTypes.bool,
  clearIcon: IxPropTypes.string,
  clearText: IxPropTypes.string,
  format: IxPropTypes.string,
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
  value: IxPropTypes.oneOfType<number | string | Date>([Number, String, Date]),

  defaultOpenValue: IxPropTypes.oneOfType<number | string | Date>([Number, String, Date]),
  disabled: IxPropTypes.bool.def(false),
  placeholder: IxPropTypes.string,
  readonly: IxPropTypes.bool.def(false),

  // events
  'onUpdate:value': IxPropTypes.emit<(value: Date | undefined) => void>(),
  onChange: IxPropTypes.emit<(value: Date | undefined) => void>(),
}

export type TimePickerProps = IxInnerPropTypes<typeof timePickerProps>
export type TimePickerPublicProps = IxPublicPropTypes<typeof timePickerProps>
export type TimePickerComponent = DefineComponent<
  Omit<HTMLAttributes, keyof TimePickerPublicProps> & TimePickerPublicProps
>
export type TimePickerInstance = InstanceType<DefineComponent<TimePickerProps>>

export const timeRangePickerProps = {
  ...basePickerProps,

  // v-model
  value: IxPropTypes.object<[number | string | Date | undefined, number | string | Date | undefined]>(),

  defaultOpenValue: IxPropTypes.object<[number | string | Date | undefined, number | string | Date | undefined]>(),
  disabled: IxPropTypes.bool.def(false),
  placeholder: IxPropTypes.object<[string, string]>(),
  readonly: IxPropTypes.bool.def(false),
  separator: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),

  // events
  'onUpdate:value': IxPropTypes.emit<(value: [Date | undefined, Date | undefined] | undefined) => void>(),
  onChange: IxPropTypes.emit<(value: [Date | undefined, Date | undefined] | undefined) => void>(),
}

export type TimeRangePickerProps = IxInnerPropTypes<typeof timeRangePickerProps>
export type TimeRangePickerPublicProps = IxPublicPropTypes<typeof timeRangePickerProps>
export type TimeRangePickerComponent = DefineComponent<
  Omit<HTMLAttributes, keyof TimeRangePickerPublicProps> & TimeRangePickerPublicProps
>
export type TimeRangePickerInstance = InstanceType<DefineComponent<TimeRangePickerProps>>

export const baseTriggerProps = {
  borderless: IxPropTypes.bool,
  clearable: IxPropTypes.bool,
  clearIcon: IxPropTypes.string,
  size: IxPropTypes.oneOf<FormSize>(['sm', 'md', 'lg']),
  suffix: IxPropTypes.string,
  disabled: IxPropTypes.bool.def(false),
  readonly: IxPropTypes.bool.def(false),
  focused: IxPropTypes.bool,
  onFocus: IxPropTypes.emit<(evt: FocusEvent) => void>(),
  onBlur: IxPropTypes.emit<(evt: FocusEvent) => void>(),
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
