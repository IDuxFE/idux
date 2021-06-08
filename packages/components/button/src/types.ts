import type { DefineComponent } from 'vue'
import type { ButtonSize } from '@idux/components/config'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export type ButtonMode = 'primary' | 'default' | 'dashed' | 'text' | 'link'
export type ButtonShape = 'circle' | 'round'

export const buttonProps = {
  mode: IxPropTypes.oneOf<ButtonMode>(['primary', 'default', 'dashed', 'text', 'link']),
  danger: IxPropTypes.bool,
  ghost: IxPropTypes.bool,
  disabled: IxPropTypes.bool,
  loading: IxPropTypes.bool,
  size: IxPropTypes.oneOf<ButtonSize>(['large', 'medium', 'small']),
  shape: IxPropTypes.oneOf<ButtonShape>(['circle', 'round']),
  block: IxPropTypes.bool,
  icon: IxPropTypes.string,
  type: IxPropTypes.string.def('button'),
}

export type ButtonProps = IxExtractPropTypes<typeof buttonProps>

export type ButtonInstance = InstanceType<DefineComponent<ButtonProps>>

export const buttonGroupProps = {
  mode: IxPropTypes.oneOf<ButtonMode>(['primary', 'default', 'dashed', 'text', 'link']),
  size: IxPropTypes.oneOf<ButtonSize>(['large', 'medium', 'small']),
  shape: IxPropTypes.oneOf<ButtonShape>(['circle', 'round']),
}

export type ButtonGroupProps = IxExtractPropTypes<typeof buttonGroupProps>

export type ButtonGroupInstance = InstanceType<DefineComponent<ButtonGroupProps>>
