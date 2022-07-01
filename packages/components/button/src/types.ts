/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, DefineComponent, HTMLAttributes, PropType } from 'vue'

export type ButtonMode = 'primary' | 'default' | 'dashed' | 'text' | 'link'
export type ButtonShape = 'circle' | 'round'
export type ButtonSize = 'lg' | 'xl' | 'md' | 'sm' | 'xs'
export type ButtonType = 'button' | 'submit' | 'reset'

export const buttonProps = {
  mode: String as PropType<ButtonMode>,
  danger: {
    type: Boolean,
    default: undefined,
  },
  ghost: {
    type: Boolean,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: undefined,
  },
  loading: {
    type: Boolean,
    default: undefined,
  },
  size: String as PropType<ButtonSize>,
  shape: String as PropType<ButtonShape>,
  block: {
    type: Boolean,
    default: undefined,
  },
  icon: String,
  type: {
    type: String as PropType<ButtonType>,
    default: 'button',
  },
}

export type ButtonProps = ExtractInnerPropTypes<typeof buttonProps>
export type ButtonPublicProps = ExtractPublicPropTypes<typeof buttonProps>
export type ButtonComponent = DefineComponent<
  Omit<ButtonHTMLAttributes | AnchorHTMLAttributes, keyof ButtonPublicProps> & ButtonPublicProps
>
export type ButtonInstance = InstanceType<DefineComponent<ButtonProps>>

export const buttonGroupProps = {
  mode: String as PropType<ButtonMode>,
  size: String as PropType<ButtonSize>,
  shape: String as PropType<ButtonShape>,
}

export type ButtonGroupProps = ExtractInnerPropTypes<typeof buttonGroupProps>
export type ButtonGroupPublicProps = ExtractPublicPropTypes<typeof buttonGroupProps>
export type ButtonGroupComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ButtonGroupPublicProps> & ButtonGroupPublicProps
>
export type ButtonGroupInstance = InstanceType<DefineComponent<ButtonGroupProps>>
