/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { ButtonProps } from '@idux/components/button'
import type { ButtonHTMLAttributes, DefineComponent, HTMLAttributes, PropType, VNode, VNodeChild } from 'vue'

export interface FooterButtonProps extends ButtonHTMLAttributes, ButtonProps {
  disabled?: boolean
  key?: VKey
  text?: string | VNode | (() => VNodeChild)
  onClick?: (evt: Event) => void
}

export const footerProps = {
  cancel: Function as PropType<(evt?: Event | unknown) => Promise<void> | void>,
  cancelButton: Object as PropType<ButtonProps>,
  cancelLoading: Boolean,
  cancelText: String,
  cancelVisible: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: undefined,
  },
  footer: [Boolean, Array, Object, Function] as PropType<boolean | FooterButtonProps[] | VNode | (() => VNodeChild)>,
  ok: Function as PropType<(evt?: Event | unknown) => Promise<void> | void>,
  okButton: Object as PropType<ButtonProps>,
  okLoading: Boolean,
  okText: String,
} as const

export type FooterProps = ExtractInnerPropTypes<typeof footerProps>
export type FooterPublicProps = ExtractPublicPropTypes<typeof footerProps>
export type FooterComponent = DefineComponent<Omit<HTMLAttributes, keyof FooterPublicProps> & FooterPublicProps>
export type FooterInstance = InstanceType<DefineComponent<FooterProps>>
