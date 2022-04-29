/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType, VNode, VNodeChild } from 'vue'

export const virtualListProps = {
  contentRender: { type: Function as PropType<VirtualContentRenderFn>, default: undefined },
  dataSource: { type: Array, default: (): unknown[] => [] },
  fullHeight: { type: Boolean, default: false },
  getKey: { type: [String, Function] as PropType<string | ((item: any) => VKey)>, default: 'key' },
  height: { type: Number, default: 0 },
  itemHeight: { type: Number, default: 0 },
  /**
   * @deprecated
   */
  itemKey: { type: [String, Function] as PropType<string | ((item: any) => VKey)>, default: undefined },
  itemRender: { type: Function as PropType<VirtualItemRenderFn>, default: undefined },
  virtual: { type: Boolean, default: true },
  onScroll: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onScrolledChange: [Function, Array] as PropType<
    MaybeArray<(startIndex: number, endIndex: number, visibleData: any[]) => void>
  >,
  onScrolledBottom: [Function, Array] as PropType<MaybeArray<() => void>>,
} as const

export type VirtualScrollProps = ExtractInnerPropTypes<typeof virtualListProps>
export type VirtualScrollPublicProps = Omit<ExtractPublicPropTypes<typeof virtualListProps>, 'itemKey'>
export interface VirtualScrollBindings {
  scrollTo: VirtualScrollToFn
}
export type VirtualScrollComponent = DefineComponent<
  Omit<HTMLAttributes, keyof VirtualScrollPublicProps> & VirtualScrollPublicProps,
  VirtualScrollBindings
>
export type VirtualScrollInstance = InstanceType<DefineComponent<VirtualScrollProps, VirtualScrollBindings>>

export type VirtualScrollToOptions = { align?: 'top' | 'bottom' | 'auto'; offset?: number } & (
  | { key: VKey }
  | { index: number }
)
export type VirtualScrollToFn = (option?: number | VirtualScrollToOptions) => void
export type VirtualItemRenderFn<T = any> = (option: { item: T; index: number }) => VNodeChild
export type VirtualContentRenderFn = (children: VNode[]) => VNodeChild
