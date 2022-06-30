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
import { ɵTooltipProps } from '@idux/components/tooltip'

export const popconfirmProps = {
  ...ɵTooltipProps,
  cancelButton: IxPropTypes.object<ButtonProps>(),
  cancelText: IxPropTypes.string,
  okButton: IxPropTypes.object<ButtonProps>(),
  okText: IxPropTypes.string,
  icon: IxPropTypes.string.def('exclamation-circle-filled'),
  footer: IxPropTypes.oneOfType([Boolean, IxPropTypes.array<PopconfirmButtonProps>(), IxPropTypes.vNode]).def(true),

  'onUpdate:visible': IxPropTypes.emit<(visible: boolean) => void>(),
  onCancel: IxPropTypes.emit<(evt?: Event | unknown) => unknown>(),
  onOk: IxPropTypes.emit<(evt?: Event | unknown) => unknown>(),
}
export interface PopconfirmButtonProps<K = VKey> extends ButtonProps {
  key?: K
  text?: string | VNode
  onClick?: (evt: Event) => void
}

export type PopconfirmProps = ExtractInnerPropTypes<typeof popconfirmProps>
export type PopconfirmPublicProps = ExtractPublicPropTypes<typeof popconfirmProps>
export interface PopconfirmBindings {
  updatePopper: () => void
  cancel: (evt?: Event | unknown) => Promise<void>
  ok: (evt?: Event | unknown) => Promise<void>
}
export type PopconfirmComponent = DefineComponent<
  Omit<HTMLAttributes, keyof PopconfirmPublicProps> & PopconfirmPublicProps,
  PopconfirmBindings
>
export type PopconfirmInstance = InstanceType<DefineComponent<PopconfirmProps, PopconfirmBindings>>
