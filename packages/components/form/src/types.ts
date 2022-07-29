/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { AbstractControl, ValidateStatus } from '@idux/cdk/forms'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { ColProps, RowProps } from '@idux/components/grid'
import type { TooltipProps } from '@idux/components/tooltip'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

const colProp = [Number, String, Object] as PropType<number | string | ColProps>

export const formProps = {
  control: { type: [String, Number, Object] as PropType<string | number | AbstractControl>, default: undefined },
  colonless: {
    type: Boolean,
    default: undefined,
  },
  controlCol: colProp,
  controlTooltipIcon: String,
  /**
   * @deprecated
   */
  hasFeedback: {
    type: Boolean,
    default: undefined,
  },
  labelAlign: String as PropType<FormLabelAlign>,
  labelCol: colProp,
  labelTooltipIcon: String,
  layout: String as PropType<FormLayout>,
  messageTooltip: { type: [Boolean, Object] as PropType<boolean | TooltipProps>, default: false },
  size: String as PropType<FormSize>,
  /**
   * @deprecated
   */
  statusIcon: {
    type: [Boolean, Object] as PropType<boolean | Record<ValidateStatus, string>>,
    default: false,
  },
} as const

export type FormProps = ExtractInnerPropTypes<typeof formProps>
export type FormPublicProps = Omit<ExtractPublicPropTypes<typeof formProps>, 'hasFeedback' | 'statusIcon'>
export type FormComponent = DefineComponent<Omit<HTMLAttributes, keyof FormPublicProps> & FormPublicProps>
export type FormInstance = InstanceType<DefineComponent<FormProps>>

export const formItemProps = {
  colonless: {
    type: Boolean,
    default: undefined,
  },
  control: { type: [String, Number, Object] as PropType<string | number | AbstractControl>, default: undefined },
  controlCol: colProp,
  controlTooltip: String,
  controlTooltipIcon: String,
  description: String,
  /**
   * @deprecated
   */
  hasFeedback: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @deprecated Use `description` instead.
   */
  extra: String,
  /**
   * @deprecated Use `description` instead.
   */
  extraMessage: String,
  label: [String, Number] as PropType<string | number>,
  labelAlign: String as PropType<FormLabelAlign>,
  labelCol: colProp,
  labelFor: [String, Number] as PropType<string | number>,
  labelTooltip: String,
  labelTooltipIcon: String,
  required: {
    type: Boolean,
    default: false,
  },
  message: [String, Function, Object] as PropType<
    string | ((control?: AbstractControl) => string) | Partial<Record<ValidateStatus, string>>
  >,
  messageTooltip: { type: [Boolean, Object] as PropType<boolean | TooltipProps>, default: undefined },
  status: String as PropType<ValidateStatus>,
  /**
   * @deprecated
   */
  statusIcon: {
    type: [Boolean, Object] as PropType<boolean | Record<ValidateStatus, string>>,
    default: undefined,
  },
} as const

export type FormItemProps = ExtractInnerPropTypes<typeof formItemProps>
export type FormItemPublicProps = Omit<
  ExtractPublicPropTypes<typeof formItemProps>,
  'extra' | 'extraMessage' | 'hasFeedback' | 'statusIcon'
>
export type FormItemComponent = DefineComponent<
  Omit<HTMLAttributes, keyof FormItemPublicProps> & FormItemPublicProps & RowProps
>
export type FormItemInstance = InstanceType<DefineComponent<FormItemProps>>

export const formWrapperProps = {
  control: { type: [String, Number, Object] as PropType<string | number | AbstractControl>, default: undefined },
} as const

export type FormWrapperProps = ExtractInnerPropTypes<typeof formWrapperProps>
export type FormWrapperPublicProps = ExtractPublicPropTypes<typeof formWrapperProps>
export type FormWrapperComponent = DefineComponent<
  Omit<HTMLAttributes, keyof FormWrapperPublicProps> & FormWrapperPublicProps
>
export type FormWrapperInstance = InstanceType<DefineComponent<FormItemProps>>

export type FormColType = number | string | ColProps
export type FormLabelAlign = 'start' | 'end'
export type FormLayout = 'horizontal' | 'vertical' | `inline`
export type FormSize = 'sm' | 'md' | 'lg'
