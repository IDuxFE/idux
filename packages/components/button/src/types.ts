/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export type ButtonMode = 'primary' | 'default' | 'dashed' | 'text' | 'link'
export type ButtonShape = 'circle' | 'round'
export type ButtonSize = 'lg' | 'xl' | 'md' | 'sm' | 'xs'
export type ButtonType = 'button' | 'submit' | 'reset'

export const buttonProps = {
  mode: IxPropTypes.oneOf<ButtonMode>(['primary', 'default', 'dashed', 'text', 'link']),
  danger: IxPropTypes.bool,
  ghost: IxPropTypes.bool,
  disabled: IxPropTypes.bool,
  loading: IxPropTypes.bool,
  size: IxPropTypes.oneOf<ButtonSize>(['lg', 'xl', 'md', 'sm', 'xs']),
  shape: IxPropTypes.oneOf<ButtonShape>(['circle', 'round']),
  block: IxPropTypes.bool,
  icon: IxPropTypes.string,
  type: IxPropTypes.oneOf<ButtonType>(['button', 'submit', 'reset']).def('button'),
}

export type ButtonProps = ExtractInnerPropTypes<typeof buttonProps>
export type ButtonPublicProps = ExtractPublicPropTypes<typeof buttonProps>
export type ButtonComponent = DefineComponent<
  Omit<ButtonHTMLAttributes | AnchorHTMLAttributes, keyof ButtonPublicProps> & ButtonPublicProps
>
export type ButtonInstance = InstanceType<DefineComponent<ButtonProps>>

export const buttonGroupProps = {
  mode: IxPropTypes.oneOf<ButtonMode>(['primary', 'default', 'dashed', 'text', 'link']),
  size: IxPropTypes.oneOf<ButtonSize>(['lg', 'xl', 'md', 'sm', 'xs']),
  shape: IxPropTypes.oneOf<ButtonShape>(['circle', 'round']),
}

export type ButtonGroupProps = ExtractInnerPropTypes<typeof buttonGroupProps>
export type ButtonGroupPublicProps = ExtractPublicPropTypes<typeof buttonGroupProps>
export type ButtonGroupComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ButtonGroupPublicProps> & ButtonGroupPublicProps
>
export type ButtonGroupInstance = InstanceType<DefineComponent<ButtonGroupProps>>
