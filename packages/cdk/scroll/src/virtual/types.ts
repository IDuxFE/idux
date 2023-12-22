/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType, VNode, VNodeChild } from 'vue'

export interface VirtualScrollRowData<Col = unknown> {
  [key: string]: any
  data: Col[]
}

export interface RowSize {
  height: number
  colWidths: Map<VKey, number>
}

export type VirutalDataSizes = Map<VKey, RowSize>

export interface ModifiedData {
  data: any
  index: number
  poolKey?: string
}

export const virtualListProps = {
  contentRender: { type: Function as PropType<VirtualContentRenderFn>, default: undefined },
  bufferSize: { type: Number, default: 0 },
  bufferOffset: { type: Number, default: 0 },
  dataSource: { type: Array, default: (): unknown[] => [] },
  rowModifier: {
    type: Function as PropType<(renderedRows: any[]) => { start?: ModifiedData[]; end?: ModifiedData[] } | undefined>,
  },
  colModifier: {
    type: Function as PropType<
      (renderedRow: any, renderedCols: any[]) => { start?: ModifiedData[]; end?: ModifiedData[] } | undefined
    >,
  },
  getKey: { type: [String, Function] as PropType<string | ((item: any) => VKey)>, default: 'key' },
  height: { type: [Number, String] as PropType<number | 'auto' | '100%'>, default: 'auto' },
  fullHeight: { type: Boolean, default: false },
  /**
   * @deprecated use rowHeight instead
   */
  itemHeight: { type: Number, default: 0 },
  rowHeight: { type: Number, default: 0 },
  width: { type: [Number, String] as PropType<number | '100%'>, default: '100%' },
  fullWidth: { type: Boolean, default: true },
  colWidth: { type: Number, default: 0 },
  /**
   * @deprecated use rowRender instead
   */
  itemRender: { type: Function as PropType<VirtualRowRenderFn>, default: undefined },
  rowRender: { type: Function as PropType<VirtualRowRenderFn>, default: undefined },
  colRender: { type: Function as PropType<VirtualColRenderFn>, default: undefined },
  virtual: {
    type: [Boolean, Object] as PropType<boolean | VirtualScrollEnabled>,
    default: (): VirtualScrollEnabled => ({ horizontal: false, vertical: true }),
  },
  isStrictGrid: {
    type: Boolean,
    default: true,
  },
  onScroll: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onScrolledChange: [Function, Array] as PropType<
    MaybeArray<(startIndex: number, endIndex: number, visibleData: any[]) => void>
  >,
  onScrolledBottom: [Function, Array] as PropType<MaybeArray<() => void>>,
} as const

export type VirtualScrollProps = ExtractInnerPropTypes<typeof virtualListProps>
export type VirtualScrollPublicProps = ExtractPublicPropTypes<typeof virtualListProps>
export interface VirtualScrollBindings {
  scrollTo: VirtualScrollToFn
  getHolderElement: () => HTMLDivElement
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
export type VirtualRowRenderFn<Row = any> = (option: { item: Row; index: number; children?: VNode[] }) => VNodeChild
export type VirtualColRenderFn<Row extends VirtualScrollRowData = VirtualScrollRowData<any>> = (option: {
  row: Row
  item: Row['data'][number]
  index: number
  rowIndex: number
}) => VNodeChild
export type VirtualContentRenderFn = (
  children: VNode[],
  options: {
    renderedData: unknown[]
    topIndex: number
    bottomIndex: number
    leftIndex: number[]
    rightIndex: number[]
  },
) => VNodeChild

export type VirtualScrollEnabled = { horizontal: boolean; vertical: boolean }
