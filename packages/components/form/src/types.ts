import type { DefineComponent } from 'vue'
import type { AbstractControl, ValidateStatus } from '@idux/cdk/forms'
import type { FormLabelAlign, FormLayout, FormSize } from '@idux/components/config'
import type { ColProps } from '@idux/components/grid'

import { controlPropTypeDef } from '@idux/cdk/forms'
import { PropTypes, withUndefined } from '@idux/cdk/utils'
import { object } from 'vue-types'

export type ColType = string | number | ColProps
const colPropTypeDef = withUndefined(PropTypes.oneOfType([PropTypes.string, PropTypes.number, object<ColProps>()]))

export interface FormProps {
  colonless?: boolean
  control?: string | number | AbstractControl
  controlCol?: ColType
  hasFeedback: boolean
  labelAlign?: FormLabelAlign
  labelCol?: ColType
  layout?: FormLayout
  size?: FormSize
}

export const formPropsDef = {
  colonless: PropTypes.bool,
  control: controlPropTypeDef,
  controlCol: colPropTypeDef,
  hasFeedback: PropTypes.bool.def(false),
  labelAlign: PropTypes.oneOf(['left', 'right'] as const),
  labelCol: colPropTypeDef,
  layout: PropTypes.oneOf(['horizontal', 'vertical', 'inline'] as const),
  size: PropTypes.oneOf(['large', 'medium', 'small'] as const),
}

export type FormInstance = InstanceType<DefineComponent<FormProps>>
export type FormMessageFn = (control: AbstractControl | null) => string
export type FormStatusMessage = Partial<Record<ValidateStatus, string | FormMessageFn>>

export interface FormItemProps {
  colonless?: boolean
  control?: string | number | AbstractControl
  controlCol?: ColType
  extra?: string
  hasFeedback?: boolean
  label?: string
  labelAlign?: FormLabelAlign
  labelCol?: ColType
  labelFor?: string
  labelTooltip?: string
  required: boolean
  message?: string | FormMessageFn | FormStatusMessage
  status?: ValidateStatus
}

export const formItemPropsDef = {
  colonless: PropTypes.bool,
  control: controlPropTypeDef,
  controlCol: colPropTypeDef,
  extra: PropTypes.string,
  hasFeedback: PropTypes.bool,
  label: PropTypes.string,
  labelAlign: PropTypes.oneOf(['left', 'right'] as const),
  labelCol: colPropTypeDef,
  labelFor: PropTypes.string,
  labelTooltip: PropTypes.string,
  required: PropTypes.bool.def(false),
  status: PropTypes.oneOf(['valid', 'invalid', 'validating'] as const),
  message: withUndefined(PropTypes.oneOfType([PropTypes.string, PropTypes.func, object<FormStatusMessage>()])),
}

export type FormItemInstance = InstanceType<DefineComponent<FormItemProps>>
