import type { AnchorHTMLAttributes, ButtonHTMLAttributes, DefineComponent, HTMLAttributes } from 'vue'
import type { IxPublicPropTypes, IxInnerPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export type ButtonMode = 'primary' | 'default' | 'dashed' | 'text' | 'link'
export type ButtonShape = 'circle' | 'round'
export type ButtonSize = 'lg' | 'md' | 'sm'
export type ButtonType = 'button' | 'submit' | 'reset'

export const buttonProps = {
  mode: IxPropTypes.oneOf<ButtonMode>(['primary', 'default', 'dashed', 'text', 'link']),
  danger: IxPropTypes.bool,
  ghost: IxPropTypes.bool,
  disabled: IxPropTypes.bool,
  loading: IxPropTypes.bool,
  size: IxPropTypes.oneOf<ButtonSize>(['lg', 'md', 'sm']),
  shape: IxPropTypes.oneOf<ButtonShape>(['circle', 'round']),
  block: IxPropTypes.bool,
  icon: IxPropTypes.string,
  type: IxPropTypes.oneOf<ButtonType>(['button', 'submit', 'reset']).def('button'),
}

export type ButtonProps = IxInnerPropTypes<typeof buttonProps>
export type ButtonPublicProps = IxPublicPropTypes<typeof buttonProps>
export type ButtonComponent = DefineComponent<
  Omit<ButtonHTMLAttributes | AnchorHTMLAttributes, keyof ButtonPublicProps> & ButtonPublicProps
>
export type ButtonInstance = InstanceType<DefineComponent<ButtonProps>>

export const buttonGroupProps = {
  mode: IxPropTypes.oneOf<ButtonMode>(['primary', 'default', 'dashed', 'text', 'link']),
  size: IxPropTypes.oneOf<ButtonSize>(['lg', 'md', 'sm']),
  shape: IxPropTypes.oneOf<ButtonShape>(['circle', 'round']),
}

export type ButtonGroupProps = IxInnerPropTypes<typeof buttonGroupProps>
export type ButtonGroupPublicProps = IxPublicPropTypes<typeof buttonGroupProps>
export type ButtonGroupComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ButtonGroupPublicProps> & ButtonGroupPublicProps
>
export type ButtonGroupInstance = InstanceType<DefineComponent<ButtonGroupProps>>
