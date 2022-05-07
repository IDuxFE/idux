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
import { ɵbaseTimePanelProps } from '@idux/components/_private/time-panel'

const timePickerCommonProps = {
  ...ɵbaseTimePanelProps,
  // v-model
  open: {
    type: Boolean,
    default: undefined,
  },
  control: controlPropDef,
  allowInput: {
    type: [Boolean, String] as PropType<boolean | 'overlay'>,
    default: undefined,
  },
  autofocus: {
    type: Boolean,
    default: undefined,
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
  clearText: String,
  disabled: {
    type: Boolean,
    default: false,
  },
  format: String,
  overlayClassName: String,
  overlayContainer: ɵPortalTargetDef,
  overlayRender: Function as PropType<(children: VNode[]) => VNodeChild>,
  readonly: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  size: String as PropType<FormSize>,
  suffix: String,

  // events
  'onUpdate:open': [Function, Array] as PropType<MaybeArray<(isOpen: boolean) => void>>,
  onClear: [Function, Array] as PropType<MaybeArray<(evt: MouseEvent) => void>>,
  onFocus: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onBlur: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
}

export type TimePickerCommonProps = ExtractInnerPropTypes<typeof timePickerCommonProps>
export interface TimePickerCommonBindings {
  blur: () => void
  focus: (options?: FocusOptions) => void
}

export const timePickerProps = {
  ...timePickerCommonProps,

  // v-model
  value: [String, Date, Number] as PropType<string | Date | number>,

  defaultOpenValue: [String, Date, Number] as PropType<string | Date | number>,
  footer: { type: ɵFooterTypeDef, default: false },
  placeholder: String,

  // events
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<(value: Date | undefined) => void>>,
  onChange: [Function, Array] as PropType<MaybeArray<(value: Date | undefined, oldValue: Date | undefined) => void>>,
  onInput: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
}

export type TimePickerProps = ExtractInnerPropTypes<typeof timePickerProps>
export type TimePickerPublicProps = ExtractPublicPropTypes<typeof timePickerProps>
export type TimePickerComponent = DefineComponent<
  Omit<HTMLAttributes, keyof TimePickerPublicProps> & TimePickerPublicProps,
  TimePickerCommonBindings
>
export type TimePickerInstance = InstanceType<DefineComponent<TimePickerProps, TimePickerCommonBindings>>

export const timeRangePickerProps = {
  ...timePickerCommonProps,

  // v-model
  value: Array as PropType<(number | string | Date | undefined)[]>,
  defaultOpenValue: Array as PropType<(number | string | Date)[]>,
  footer: { type: ɵFooterTypeDef, default: true },
  placeholder: Array as PropType<string[]>,
  separator: [String, Object] as PropType<string | VNode>,

  // events
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<(value: Date[] | undefined) => void>>,
  onChange: [Function, Array] as PropType<
    MaybeArray<(value: Date[] | undefined, oldValue: Date[] | undefined) => void>
  >,
  onInput: [Function, Array] as PropType<MaybeArray<(isFrom: boolean, evt: Event) => void>>,
}

export type TimeRangePickerProps = ExtractInnerPropTypes<typeof timeRangePickerProps>
export type TimeRangePickerPublicProps = ExtractPublicPropTypes<typeof timeRangePickerProps>
export type TimeRangePickerComponent = DefineComponent<
  Omit<HTMLAttributes, keyof TimeRangePickerPublicProps> & TimeRangePickerPublicProps
>
export type TimeRangePickerInstance = InstanceType<DefineComponent<TimeRangePickerProps>>
