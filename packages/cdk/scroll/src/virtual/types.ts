/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, VNodeTypes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export const virtualListProps = {
  contentRender: IxPropTypes.func<VirtualContentRenderFn>(),
  dataSource: IxPropTypes.array().def(() => []),
  fullHeight: IxPropTypes.bool.def(false),
  height: IxPropTypes.number.def(0),
  itemHeight: IxPropTypes.number.def(0),
  itemKey: IxPropTypes.oneOfType([String, IxPropTypes.func<(item: unknown) => VKey>()]).isRequired,
  itemRender: IxPropTypes.func<VirtualItemRenderFn>(),
  virtual: IxPropTypes.bool.def(true),
  onScroll: IxPropTypes.emit<(evt: Event) => void>(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onScrolledChange: IxPropTypes.emit<(startIndex: number, endIndex: number, visibleData: any[]) => void>(),
  onScrolledBottom: IxPropTypes.emit<() => void>(),
}

export type VirtualScrollProps = ExtractInnerPropTypes<typeof virtualListProps>
export type VirtualScrollPublicProps = ExtractPublicPropTypes<typeof virtualListProps>
export interface VirtualScrollBindings {
  scrollTo: VirtualScrollToFn
}
export type VirtualScrollComponent = DefineComponent<
  Omit<HTMLAttributes, keyof VirtualScrollPublicProps> & VirtualScrollPublicProps,
  VirtualScrollBindings
>
export type VirtualScrollInstance = InstanceType<DefineComponent<VirtualScrollProps, VirtualScrollBindings>>

export type VirtualScrollToAlign = 'top' | 'bottom' | 'auto'
export type VirtualScrollToOptions =
  | {
      key: VKey
      align?: VirtualScrollToAlign
      offset?: number
    }
  | {
      index: number
      align?: VirtualScrollToAlign
      offset?: number
    }
export type VirtualScrollToFn = (option?: number | VirtualScrollToOptions) => void
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VirtualItemRenderFn<T = any> = (option: { item: T; index: number }) => VNodeTypes
export type VirtualContentRenderFn = (children: VNodeTypes[]) => VNodeTypes
