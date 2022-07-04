/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { ButtonProps } from '@idux/components/button'
import type { DefineComponent, HTMLAttributes, PropType, VNode } from 'vue'

import { ɵTooltipProps } from '@idux/components/tooltip'

export const popconfirmProps = {
  ...ɵTooltipProps,
  cancelButton: Object as PropType<ButtonProps>,
  cancelText: String,
  okButton: Object as PropType<ButtonProps>,
  okText: String,
  icon: {
    type: String,
    default: 'exclamation-circle-filled',
  },
  footer: {
    type: [Boolean, Array, Object] as PropType<boolean | PopconfirmButtonProps[] | VNode>,
    default: true,
  },

  'onUpdate:visible': [Function, Array] as PropType<MaybeArray<(visible: boolean) => void>>,
  onCancel: [Function, Array] as PropType<MaybeArray<(evt?: Event | unknown) => unknown>>,
  onOk: [Function, Array] as PropType<MaybeArray<(evt?: Event | unknown) => unknown>>,
} as const
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
