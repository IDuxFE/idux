/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { ButtonProps } from '@idux/components/button'
import type { HeaderProps } from '@idux/components/header'
import type { DefineComponent, HTMLAttributes, VNode } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export type CardSize = 'sm' | 'md' | 'lg'
export interface CardCover {
  alt: string
  src: string
  srcset: string
}
export interface CardButtonProps extends ButtonProps {
  key?: string | number
  // 按钮的文本
  text?: string
  // 按钮点击回调
  onClick?: (evt: Event) => void
}

export const cardProps = {
  borderless: IxPropTypes.bool,
  cover: IxPropTypes.oneOfType([String, IxPropTypes.object<CardCover>()]),
  header: IxPropTypes.oneOfType([String, IxPropTypes.object<HeaderProps>()]),
  hoverable: IxPropTypes.bool,
  shadow: IxPropTypes.bool.def(true),
  loading: IxPropTypes.bool.def(false),
  size: IxPropTypes.oneOf<CardSize>(['sm', 'md', 'lg']),
  footer: IxPropTypes.array<CardButtonProps | VNode>(),
  disabled: IxPropTypes.bool.def(false),
  selected: IxPropTypes.bool.def(false),
  selectable: IxPropTypes.bool.def(false),

  // event
  'onUpdate:selected': IxPropTypes.emit<(selected: boolean) => void>(),
  onSelectedChange: IxPropTypes.emit<(selected: boolean) => void>(),
}

export type CardProps = ExtractInnerPropTypes<typeof cardProps>
export type CardPublicProps = ExtractPublicPropTypes<typeof cardProps>
export type CardComponent = DefineComponent<Omit<HTMLAttributes, keyof CardPublicProps> & CardPublicProps>
export type CardInstance = InstanceType<DefineComponent<CardProps>>

export const cardGridProps = {
  hoverable: IxPropTypes.bool,
}

export type CardGridProps = ExtractInnerPropTypes<typeof cardGridProps>
export type CardGridPublicProps = ExtractPublicPropTypes<typeof cardGridProps>
export type CardGridComponent = DefineComponent<Omit<HTMLAttributes, keyof CardGridPublicProps> & CardGridPublicProps>
export type CardGridInstance = InstanceType<DefineComponent<CardGridProps>>
