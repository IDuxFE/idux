import type { Component, DefineComponent, HTMLAttributes, VNode, VNodeTypes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export const virtualListProps = {
  data: IxPropTypes.array().def(() => []),
  fullHeight: IxPropTypes.bool.def(true),
  height: IxPropTypes.number.def(0),
  itemHeight: IxPropTypes.number.def(0),
  itemKey: IxPropTypes.oneOfType([String, IxPropTypes.func<(item: unknown) => string | number>()]).isRequired,
  itemRender: IxPropTypes.func<VirtualItemRenderFn>(),
  tag: IxPropTypes.oneOfType<string | VNode | Component>([
    String,
    IxPropTypes.vNode,
    IxPropTypes.object<Component>(),
  ]).def('div'),
  onScroll: IxPropTypes.func<(evt: Event) => void>(),
}

export type VirtualScrollProps = IxInnerPropTypes<typeof virtualListProps>
export type VirtualScrollPublicProps = IxPublicPropTypes<typeof virtualListProps>
export interface VirtualScrollBindings {
  scrollTo: VirtualScrollToFn
}
export type VirtualScrollComponent = DefineComponent<HTMLAttributes & typeof virtualListProps, VirtualScrollBindings>
export type VirtualScrollInstance = InstanceType<DefineComponent<VirtualScrollProps, VirtualScrollBindings>>

export type VirtualScrollToAlign = 'top' | 'bottom' | 'auto'
export type VirtualScrollToOptions =
  | {
      key: string | number
      align?: VirtualScrollToAlign
      offset?: number
    }
  | {
      index: number
      align?: VirtualScrollToAlign
      offset?: number
    }
export type VirtualScrollToFn = (option?: number | VirtualScrollToOptions) => void
export type VirtualItemRenderFn<T = unknown> = (option: { item: T; index: number }) => VNodeTypes
