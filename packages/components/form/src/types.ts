/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { AbstractControl, ValidateStatus } from '@idux/cdk/forms'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { ColProps } from '@idux/components/grid'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { controlPropDef } from '@idux/cdk/forms'
import { IxPropTypes } from '@idux/cdk/utils'

const colProp = IxPropTypes.oneOfType([Number, String, IxPropTypes.object<ColProps>()])

export const formProps = {
  control: controlPropDef,
  colonless: IxPropTypes.bool,
  controlCol: colProp,
  hasFeedback: IxPropTypes.bool,
  labelAlign: IxPropTypes.oneOf<FormLabelAlign>(['start', 'end']),
  labelCol: colProp,
  layout: IxPropTypes.oneOf<FormLayout>(['horizontal', 'vertical', 'inline']),
  size: IxPropTypes.oneOf<FormSize>(['lg', 'md', 'sm']),
  statusIcon: IxPropTypes.oneOfType([Boolean, IxPropTypes.object<Record<ValidateStatus, string>>()]).def(false),
}

export type FormProps = IxInnerPropTypes<typeof formProps>
export type FormPublicProps = IxPublicPropTypes<typeof formProps>
export type FormComponent = DefineComponent<Omit<HTMLAttributes, keyof FormPublicProps> & FormPublicProps>
export type FormInstance = InstanceType<DefineComponent<FormProps>>

export type FormColType = number | string | ColProps
export type FormLabelAlign = 'start' | 'end'
export type FormLayout = 'horizontal' | 'vertical' | `inline`
export type FormValidateMessage = Partial<Record<ValidateStatus, string | ((control: AbstractControl) => string)>>
export type FormSize = 'sm' | 'md' | 'lg'

export const formItemProps = {
  colonless: IxPropTypes.bool,
  control: controlPropDef,
  controlCol: colProp,
  hasFeedback: IxPropTypes.bool,
  extra: IxPropTypes.string,
  extraMessage: IxPropTypes.string,
  label: IxPropTypes.string,
  labelAlign: IxPropTypes.oneOf<FormLabelAlign>(['start', 'end']),
  labelCol: colProp,
  labelFor: IxPropTypes.string,
  labelTooltip: IxPropTypes.string,
  required: IxPropTypes.bool.def(false),
  message: IxPropTypes.oneOfType([
    String,
    IxPropTypes.func<(control: AbstractControl) => string>(),
    IxPropTypes.object<FormValidateMessage>(),
  ]),
  status: IxPropTypes.oneOf<ValidateStatus>(['valid', 'invalid', 'validating']),
  statusIcon: IxPropTypes.oneOfType([Boolean, IxPropTypes.object<Record<ValidateStatus, string>>()]),
}

export type FormItemProps = IxInnerPropTypes<typeof formItemProps>
export type FormItemPublicProps = IxPublicPropTypes<typeof formItemProps>
export type FormItemComponent = DefineComponent<Omit<HTMLAttributes, keyof FormItemPublicProps> & FormItemPublicProps>
export type FormItemInstance = InstanceType<DefineComponent<FormItemProps>>

export const formWrapperProps = {
  control: controlPropDef,
}

export type FormWrapperProps = IxInnerPropTypes<typeof formWrapperProps>
export type FormWrapperPublicProps = IxPublicPropTypes<typeof formWrapperProps>
export type FormWrapperComponent = DefineComponent<
  Omit<HTMLAttributes, keyof FormWrapperPublicProps> & FormWrapperPublicProps
>
export type FormWrapperInstance = InstanceType<DefineComponent<FormItemProps>>
