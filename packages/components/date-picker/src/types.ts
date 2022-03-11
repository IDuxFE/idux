/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { FormSize } from '@idux/components/form'
import type { TimePickerProps } from '@idux/components/time-picker'
import type { DefineComponent, HTMLAttributes, VNode, VNodeTypes } from 'vue'

import { controlPropDef } from '@idux/cdk/forms'
import { ɵPortalTargetDef } from '@idux/cdk/portal'
import { IxPropTypes } from '@idux/cdk/utils'

const datePickerCommonProps = {
  control: controlPropDef,
  open: IxPropTypes.bool,

  allowInput: IxPropTypes.oneOfType([Boolean, IxPropTypes.oneOf(['overlay'])]),
  autofocus: IxPropTypes.bool.def(false),
  borderless: IxPropTypes.bool,
  clearable: IxPropTypes.bool,
  clearIcon: IxPropTypes.string,
  disabled: IxPropTypes.bool.def(false),
  disabledDate: IxPropTypes.func<(date: Date) => boolean>(),
  format: IxPropTypes.string,
  overlayClassName: IxPropTypes.string,
  overlayContainer: IxPropTypes.oneOfType([String, HTMLElement, IxPropTypes.func<() => string | HTMLElement>()]),
  overlayRender: IxPropTypes.func<(children: VNode[]) => VNodeTypes>(),
  readonly: IxPropTypes.bool.def(false),
  size: IxPropTypes.oneOf<FormSize>(['sm', 'md', 'lg']),
  suffix: IxPropTypes.string,
  target: ɵPortalTargetDef,
  type: IxPropTypes.oneOf<DatePickerType>(['date', 'week', 'month', 'quarter', 'year']).def('date'),

  // events
  'onUpdate:open': IxPropTypes.emit<(isOpen: boolean) => void>(),
  onClear: IxPropTypes.emit<(evt: MouseEvent) => void>(),
  onFocus: IxPropTypes.emit<(evt: FocusEvent) => void>(),
  onBlur: IxPropTypes.emit<(evt: FocusEvent) => void>(),
}

export type DatePickerCommonProps = ExtractInnerPropTypes<typeof datePickerCommonProps>
export interface DatePickerCommonBindings {
  blur: () => void
  focus: (options?: FocusOptions) => void
}

export const datePickerProps = {
  ...datePickerCommonProps,

  value: IxPropTypes.oneOfType<number | string | Date>([Number, String, Date]),
  defaultOpenValue: IxPropTypes.oneOfType<number | string | Date>([Number, String, Date]),
  placeholder: IxPropTypes.string,
  timePicker: IxPropTypes.oneOfType([Boolean, IxPropTypes.object<TimePickerProps>()]),

  'onUpdate:value': IxPropTypes.emit<(value: Date) => void>(),
  onChange: IxPropTypes.emit<(value: Date, oldValue: Date) => void>(),
  onInput: IxPropTypes.emit<(evt: Event) => void>(),
}

export type DatePickerProps = ExtractInnerPropTypes<typeof datePickerProps>
export type DatePickerPublicProps = ExtractPublicPropTypes<typeof datePickerProps>
export type DatePickerComponent = DefineComponent<
  Omit<HTMLAttributes, keyof DatePickerPublicProps> & DatePickerPublicProps,
  DatePickerCommonBindings
>
export type DatePickerInstance = InstanceType<DefineComponent<DatePickerProps, DatePickerCommonBindings>>

export const dateRangePickerProps = {
  ...datePickerCommonProps,

  value: IxPropTypes.array<number | string | Date>(),
  defaultOpenValue: IxPropTypes.array<number | string | Date>(),
  placeholder: IxPropTypes.arrayOf(String),
  separator: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  timePicker: IxPropTypes.oneOfType([
    Boolean,
    IxPropTypes.object<TimePickerProps>(),
    IxPropTypes.array<TimePickerProps>(),
  ]),

  'onUpdate:value': IxPropTypes.emit<(value: any[]) => void>(),
}

export type DateRangePickerProps = ExtractInnerPropTypes<typeof dateRangePickerProps>
export type DateRangePickerPublicProps = ExtractPublicPropTypes<typeof dateRangePickerProps>
export type DateRangePickerComponent = DefineComponent<
  Omit<HTMLAttributes, keyof DateRangePickerPublicProps> & DateRangePickerPublicProps,
  DatePickerCommonBindings
>
export type DateRangePickerInstance = InstanceType<DefineComponent<DateRangePickerProps, DatePickerCommonBindings>>

export type DatePickerType = 'date' | 'week' | 'month' | 'quarter' | 'year'

// private

export const panelRowProps = {
  rowIndex: IxPropTypes.number.isRequired,
}

export const panelCellProps = {
  rowIndex: IxPropTypes.number.isRequired,
  cellIndex: IxPropTypes.number.isRequired,
  isWeek: IxPropTypes.bool,
}
