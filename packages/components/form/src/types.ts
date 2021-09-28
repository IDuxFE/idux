import type { DefineComponent, HTMLAttributes } from 'vue'
import type { AbstractControl, ValidateStatus } from '@idux/cdk/forms'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { ColProps } from '@idux/components/grid'

import { controlPropDef } from '@idux/cdk/forms'
import { IxPropTypes } from '@idux/cdk/utils'

export type FormLabelAlign = 'start' | 'end'
export type FormLayout = 'horizontal' | 'vertical' | `inline`
export type FormSize = 'small' | 'medium' | 'large'
export type FormMessage = Partial<Record<ValidateStatus, string | ((control: AbstractControl) => string)>>
export type ColType = string | number | ColProps

const colProp = IxPropTypes.oneOfType([String, Number, IxPropTypes.object<ColProps>()])

export const formProps = {
  colonless: IxPropTypes.bool,
  control: controlPropDef,
  controlCol: colProp,
  hasFeedback: IxPropTypes.bool.def(false),
  labelAlign: IxPropTypes.oneOf<FormLabelAlign>(['start', 'end']),
  labelCol: colProp,
  layout: IxPropTypes.oneOf<FormLayout>(['horizontal', 'vertical', 'inline']),
  size: IxPropTypes.oneOf<FormSize>(['large', 'medium', 'small']),
}

export type FormProps = IxInnerPropTypes<typeof formProps>
export type FormPublicProps = IxPublicPropTypes<typeof formProps>
export type FormComponent = DefineComponent<Omit<HTMLAttributes, keyof FormPublicProps> & FormPublicProps>
export type FormInstance = InstanceType<DefineComponent<FormProps>>

export const formItemProps = {
  colonless: IxPropTypes.bool,
  control: controlPropDef,
  controlCol: colProp,
  extra: IxPropTypes.string,
  hasFeedback: IxPropTypes.bool,
  label: IxPropTypes.string,
  labelAlign: IxPropTypes.oneOf<FormLabelAlign>(['start', 'end']),
  labelCol: colProp,
  labelFor: IxPropTypes.string,
  labelTooltip: IxPropTypes.string,
  required: IxPropTypes.bool.def(false),
  message: IxPropTypes.oneOfType([
    String,
    IxPropTypes.func<(control: AbstractControl) => string>(),
    IxPropTypes.object<FormMessage>(),
  ]),
  status: IxPropTypes.oneOf<ValidateStatus>(['valid', 'invalid', 'validating']),
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
export type FormWrapperComponent = DefineComponent<FormWrapperPublicProps>
export type FormWrapperInstance = InstanceType<DefineComponent<FormItemProps>>
