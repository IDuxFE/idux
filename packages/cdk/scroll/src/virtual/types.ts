/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, VNodeTypes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export const virtualListProps = {
  data: IxPropTypes.array().def(() => []),
  fullHeight: IxPropTypes.bool.def(true),
  height: IxPropTypes.number.def(0),
  itemHeight: IxPropTypes.number.def(0),
  itemKey: IxPropTypes.oneOfType([String, IxPropTypes.func<(item: unknown) => string | number>()]).isRequired,
  itemRender: IxPropTypes.func<VirtualItemRenderFn>(),
  contentRender: IxPropTypes.func<VirtualContentRenderFn>(),
  onScroll: IxPropTypes.func<(evt: Event) => void>(),
}

export type VirtualScrollProps = IxInnerPropTypes<typeof virtualListProps>
export type VirtualScrollPublicProps = IxPublicPropTypes<typeof virtualListProps>
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VirtualItemRenderFn<T = any> = (option: { item: T; index: number }) => VNodeTypes
export type VirtualContentRenderFn = (children: VNodeTypes[]) => VNodeTypes
