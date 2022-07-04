/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { ButtonProps } from '@idux/components/button'
import type { HeaderProps } from '@idux/components/header'
import type { DefineComponent, HTMLAttributes, PropType, VNode } from 'vue'

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
  borderless: {
    type: Boolean,
    default: undefined,
  },
  cover: [String, Object] as PropType<string | CardCover>,
  header: [String, Object] as PropType<string | HeaderProps>,
  hoverable: {
    type: Boolean,
    default: undefined,
  },
  shadow: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  size: String as PropType<CardSize>,
  footer: Array as PropType<(CardButtonProps | VNode)[]>,
  disabled: {
    type: Boolean,
    default: false,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  selectable: {
    type: Boolean,
    default: false,
  },

  // event
  'onUpdate:selected': [Function, Array] as PropType<MaybeArray<(selected: boolean) => void>>,
  onSelectedChange: [Function, Array] as PropType<MaybeArray<(selected: boolean) => void>>,
} as const

export type CardProps = ExtractInnerPropTypes<typeof cardProps>
export type CardPublicProps = ExtractPublicPropTypes<typeof cardProps>
export type CardComponent = DefineComponent<Omit<HTMLAttributes, keyof CardPublicProps> & CardPublicProps>
export type CardInstance = InstanceType<DefineComponent<CardProps>>

export const cardGridProps = {
  hoverable: {
    type: Boolean,
    default: undefined,
  },
} as const

export type CardGridProps = ExtractInnerPropTypes<typeof cardGridProps>
export type CardGridPublicProps = ExtractPublicPropTypes<typeof cardGridProps>
export type CardGridComponent = DefineComponent<Omit<HTMLAttributes, keyof CardGridPublicProps> & CardGridPublicProps>
export type CardGridInstance = InstanceType<DefineComponent<CardGridProps>>
