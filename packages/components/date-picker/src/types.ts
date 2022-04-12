/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { FormSize } from '@idux/components/form'
import type { DefineComponent, HTMLAttributes, PropType, VNode, VNodeChild } from 'vue'

import { controlPropDef } from '@idux/cdk/forms'
import { ɵPortalTargetDef } from '@idux/cdk/portal'
import { ɵFooterTypeDef } from '@idux/components/_private/footer'

export interface TimePanelOptions {
  disabledHours?: (selectedAmPm: string) => number[]
  disabledMinutes?: (selectedHour: number, selectedAmPm: string) => number[]
  disabledSeconds?: (selectedHour: number, selectedMinute: number, selectedAmPm: string) => number[]
  hideDisabledOptions?: boolean
  hourStep?: number
  minuteStep?: number
  secondStep?: number
  hourEnabled?: boolean
  minuteEnabled?: boolean
  secondEnabled?: boolean
  use12Hours?: boolean
}

const datePickerCommonProps = {
  control: controlPropDef,
  cellTooltip: Function as PropType<(cell: { value: Date; disabled: boolean }) => string | void>,
  open: {
    type: Boolean,
    default: undefined,
  },

  allowInput: {
    type: [Boolean, String] as PropType<boolean | 'overlay'>,
    default: undefined,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  borderless: {
    type: Boolean,
    default: undefined,
  },
  clearable: {
    type: Boolean,
    default: undefined,
  },
  clearIcon: String,
  disabled: {
    type: Boolean,
    default: false,
  },
  disabledDate: Function as PropType<(date: Date) => boolean>,
  format: String,
  dateFormat: String,
  timeFormat: String,
  overlayClassName: String,
  // overlayContainer: IxPropTypes.oneOfType([String, HTMLElement, IxPropTypes.func<() => string | HTMLElement>()]),
  overlayContainer: [String, HTMLElement, Function] as PropType<string | HTMLElement | (() => string | HTMLElement)>,
  overlayRender: Function as PropType<(children: VNode[]) => VNodeChild>,
  readonly: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  size: String as PropType<FormSize>,
  suffix: String,
  type: {
    type: String as PropType<DatePickerType>,
    default: 'date',
  },
  target: ɵPortalTargetDef,

  // events
  'onUpdate:open': [Function, Array] as PropType<MaybeArray<(isOpen: boolean) => void>>,
  onClear: [Function, Array] as PropType<MaybeArray<(evt: MouseEvent) => void>>,
  onFocus: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onBlur: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
}

export type DatePickerCommonProps = ExtractInnerPropTypes<typeof datePickerCommonProps>
export interface DatePickerCommonBindings {
  blur: () => void
  focus: (options?: FocusOptions) => void
}

export const datePickerProps = {
  ...datePickerCommonProps,

  value: [String, Date, Number],
  defaultOpenValue: [String, Date, Number],
  footer: { type: ɵFooterTypeDef, default: false },
  placeholder: String,
  timePanelOptions: Object as PropType<TimePanelOptions>,
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<(value: Date | undefined) => void>>,
  onChange: [Function, Array] as PropType<MaybeArray<(value: Date | undefined, oldValue: Date | undefined) => void>>,
  onInput: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
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

  value: Array as PropType<(number | string | Date | undefined)[]>,
  defaultOpenValue: Array as PropType<(number | string | Date)[]>,
  footer: { type: ɵFooterTypeDef, default: true },
  placeholder: Array as PropType<string[]>,
  separator: [String, Object] as PropType<string | VNode>,
  timePanelOptions: [Object, Array] as PropType<TimePanelOptions | TimePanelOptions[]>,
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<(value: Date[] | undefined) => void>>,
  onChange: [Function, Array] as PropType<
    MaybeArray<(value: Date[] | undefined, oldValue: Date[] | undefined) => void>
  >,
  onInput: [Function, Array] as PropType<MaybeArray<(isFrom: boolean, evt: Event) => void>>,
}

export type DateRangePickerProps = ExtractInnerPropTypes<typeof dateRangePickerProps>
export type DateRangePickerPublicProps = ExtractPublicPropTypes<typeof dateRangePickerProps>
export type DateRangePickerComponent = DefineComponent<
  Omit<HTMLAttributes, keyof DateRangePickerPublicProps> & DateRangePickerPublicProps,
  DatePickerCommonBindings
>
export type DateRangePickerInstance = InstanceType<DefineComponent<DateRangePickerProps, DatePickerCommonBindings>>

export type DatePickerType = 'date' | 'week' | 'month' | 'quarter' | 'year' | 'datetime'
