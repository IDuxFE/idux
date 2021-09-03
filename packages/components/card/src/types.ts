import type { DefineComponent, HTMLAttributes, VNode } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { ButtonProps } from '@idux/components/button'
import type { HeaderProps } from '@idux/components/header'

import { IxPropTypes } from '@idux/cdk/utils'

export type CardSize = 'large' | 'medium' | 'small'
export interface CardCover {
  alt: string
  src: string
  srcset: string
}
export interface CardButtonProps extends ButtonProps {
  key?: string | number
  // 按钮的文本
  text?: string
  // 是否显示该按钮, 默认为 true
  visible?: boolean
  // 按钮点击回调
  onClick?: (evt: Event) => void
}

export const cardProps = {
  borderless: IxPropTypes.bool,
  cover: IxPropTypes.oneOfType([String, IxPropTypes.object<CardCover>()]),
  header: IxPropTypes.oneOfType([String, IxPropTypes.object<HeaderProps>()]),
  hoverable: IxPropTypes.bool,
  loading: IxPropTypes.bool.def(false),
  size: IxPropTypes.oneOf<CardSize>(['large', 'medium', 'small']),
  footer: IxPropTypes.array<CardButtonProps | VNode>(),
}

export type CardProps = IxInnerPropTypes<typeof cardProps>
export type CardPublicProps = IxPublicPropTypes<typeof cardProps>
export type CardComponent = DefineComponent<HTMLAttributes & typeof cardProps>
export type CardInstance = InstanceType<DefineComponent<CardProps>>

export const cardGridProps = {
  hoverable: IxPropTypes.bool,
}

export type CardGridProps = IxInnerPropTypes<typeof cardGridProps>
export type CardGridPublicProps = IxPublicPropTypes<typeof cardGridProps>
export type CardGridComponent = DefineComponent<HTMLAttributes & typeof cardGridProps>
export type CardGridInstance = InstanceType<DefineComponent<CardGridProps>>
