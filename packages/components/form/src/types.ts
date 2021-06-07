import type { DefineComponent } from 'vue'
import type { AbstractControl, ValidateStatus } from '@idux/cdk/forms'
import type { FormLabelAlign, FormLayout, FormSize } from '@idux/components/config'
import type { ColProps } from '@idux/components/grid'

import { controlProp } from '@idux/cdk/forms'
import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

const colProp = IxPropTypes.oneOfType([String, Number, IxPropTypes.object<ColProps>()])

export const formProps = {
  colonless: IxPropTypes.bool,
  control: controlProp,
  controlCol: colProp,
  hasFeedback: IxPropTypes.bool.def(false),
  labelAlign: IxPropTypes.oneOf<FormLabelAlign>(['left', 'right']),
  labelCol: colProp,
  layout: IxPropTypes.oneOf<FormLayout>(['horizontal', 'vertical', 'inline']),
  size: IxPropTypes.oneOf<FormSize>(['large', 'medium', 'small']),
}

export type FormProps = IxExtractPropTypes<typeof formProps>

export type FormInstance = InstanceType<DefineComponent<FormProps>>

export type FormMessageFn = (control: AbstractControl | null) => string
export type FormMessage = Partial<Record<ValidateStatus, string | FormMessageFn>>

export const formItemProps = {
  colonless: IxPropTypes.bool,
  control: controlProp,
  controlCol: colProp,
  extra: IxPropTypes.string,
  hasFeedback: IxPropTypes.bool,
  label: IxPropTypes.string,
  labelAlign: IxPropTypes.oneOf<FormLabelAlign>(['left', 'right']),
  labelCol: colProp,
  labelFor: IxPropTypes.string,
  labelTooltip: IxPropTypes.string,
  required: IxPropTypes.bool.def(false),
  message: IxPropTypes.oneOfType([String, IxPropTypes.func<FormMessageFn>(), IxPropTypes.object<FormMessage>()]),
  status: IxPropTypes.oneOf<ValidateStatus>(['valid', 'invalid', 'validating']),
}

export type FormItemProps = IxExtractPropTypes<typeof formItemProps>

export type FormItemInstance = InstanceType<DefineComponent<FormItemProps>>

export type ColType = string | number | ColProps
