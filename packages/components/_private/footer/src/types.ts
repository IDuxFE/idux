/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { ButtonProps } from '@idux/components/button'
import type { DefineComponent, HTMLAttributes, VNode } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export interface FooterButtonProps extends ButtonProps {
  key?: VKey
  text?: string | VNode
  onClick?: (evt: Event) => void
}

export const footerProps = {
  cancel: IxPropTypes.func<(evt?: Event | unknown) => Promise<void>>(),
  cancelButton: IxPropTypes.object<ButtonProps>(),
  cancelLoading: IxPropTypes.bool,
  cancelText: IxPropTypes.string,
  cancelVisible: IxPropTypes.bool.def(true),
  footer: IxPropTypes.oneOfType([Boolean, IxPropTypes.array<FooterButtonProps>(), IxPropTypes.vNode]),
  ok: IxPropTypes.func<(evt?: Event | unknown) => Promise<void>>(),
  okButton: IxPropTypes.object<ButtonProps>(),
  okLoading: IxPropTypes.bool,
  okText: IxPropTypes.string,
}

export type FooterProps = ExtractInnerPropTypes<typeof footerProps>
export type FooterPublicProps = ExtractPublicPropTypes<typeof footerProps>
export type FooterComponent = DefineComponent<Omit<HTMLAttributes, keyof FooterPublicProps> & FooterPublicProps>
export type FooterInstance = InstanceType<DefineComponent<FooterProps>>
