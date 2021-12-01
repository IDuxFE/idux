/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes, VKey } from '@idux/cdk/utils'
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
  footer: IxPropTypes.oneOfType<PopconfirmButtonProps[] | VNode | null>([IxPropTypes.array(), IxPropTypes.vNode]),
  onCancel: IxPropTypes.emit<(evt?: Event | unknown) => unknown>(),
  onOk: IxPropTypes.emit<(evt?: Event | unknown) => unknown>(),
}
export interface PopconfirmButtonProps extends ButtonProps {
  key?: VKey
  text?: string | VNode
  onClick?: (evt: Event) => void
}
export interface PopconfirmBindings {
  cancel: (evt?: Event | unknown) => Promise<void>
  ok: (evt?: Event | unknown) => Promise<void>
}

export type PopconfirmProps = IxInnerPropTypes<typeof popconfirmProps>
export type PopconfirmPublicProps = IxPublicPropTypes<typeof popconfirmProps>
export type PopconfirmComponent = DefineComponent<
  Omit<HTMLAttributes, keyof PopconfirmPublicProps> & PopconfirmPublicProps
>
export type PopconfirmInstance = InstanceType<DefineComponent<PopconfirmProps, PopconfirmBindings>>
