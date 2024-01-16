/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { VirtualScrollMode, VirtualScrollToFn } from '@idux/cdk/scroll'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, TreeTypeData, VKey } from '@idux/cdk/utils'
import type { CascaderStrategy } from '@idux/components/cascader'
import type { EmptyProps } from '@idux/components/empty'
import type {
  SearchFn,
  TransferData,
  TransferMode,
  TransferPaginationProps,
  TransferScroll,
} from '@idux/components/transfer'
import type { TreeProps } from '@idux/components/tree'
import type { ProTableColumn, ProTableLayoutToolProps, ProTableProps } from '@idux/pro/table'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export type ProTransferTypes = 'table' | 'tree'
export type { TransferData } from '@idux/components/transfer'

export type TreeTransferData<V extends object = Record<VKey, unknown>, C extends string = 'children'> = TransferData &
  TreeTypeData<V, C>

export type ProTransferTableProps<T = any, K = VKey> = {
  sourceColumns: ProTableColumn<T, K>[]
  targetColumns: ProTableColumn<T, K>[]
  sourceLayoutTool?: boolean | Omit<ProTableLayoutToolProps, 'changeSize'>
  targetLayoutTool?: boolean | Omit<ProTableLayoutToolProps, 'changeSize'>
  onColumnsChange?: (isSource: boolean, columns: ProTableColumn<T, K>[]) => void
} & Pick<ProTableProps, 'tableLayout' | 'ellipsis' | 'borderless'>

export type ProTransferTreeProps = Pick<
  TreeProps,
  | 'showLine'
  | 'childrenKey'
  | 'expandIcon'
  | 'labelKey'
  | 'leafLineIcon'
  | 'loadChildren'
  | 'onExpand'
  | 'onExpandedChange'
> & {
  cascaderStrategy?: CascaderStrategy
}

export interface TransferContentInstance {
  scrollTo?: VirtualScrollToFn
}

export const proTransferProps = {
  type: {
    type: String as PropType<ProTransferTypes>,
    default: 'table',
  },
  dataSource: {
    type: Array as PropType<TransferData[]>,
    default: (): TransferData[] => [],
  },
  value: Array as PropType<VKey[]>,
  sourceSelectedKeys: Array as PropType<VKey[]>,
  targetSelectedKeys: Array as PropType<VKey[]>,
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  searchable: {
    type: [Boolean, Object] as PropType<boolean | { source: boolean; target: boolean }>,
    default: false,
  },
  searchPlaceholder: [String, Array] as PropType<string | string[]>,
  searchFn: Function as PropType<SearchFn>,
  clearable: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  clearIcon: String as PropType<string>,
  empty: { type: [String, Object] as PropType<'default' | 'simple' | EmptyProps>, default: 'simple' },
  pagination: [Boolean, Object] as PropType<boolean | TransferPaginationProps>,
  mode: {
    type: String as PropType<TransferMode>,
    default: 'default',
  },
  spin: [Boolean, Object] as PropType<boolean | { source: boolean; target: boolean }>,
  getKey: [String, Function] as PropType<string | ((item: TransferData<any>) => any)>,
  scroll: Object as PropType<TransferScroll>,

  tableProps: Object as PropType<ProTransferTableProps>,
  treeProps: Object as PropType<ProTransferTreeProps>,

  defaultTargetData: Array as PropType<TransferData[]>,
  flatTargetData: {
    type: Boolean as PropType<boolean | 'all'>,
    default: false,
  },
  sourceExpandedKeys: Array as PropType<VKey[]>,
  targetExpandedKeys: Array as PropType<VKey[]>,
  virtual: { type: Boolean, default: false },
  virtualScrollMode: { type: String as PropType<VirtualScrollMode>, default: undefined },
  virtualItemHeight: { type: Number, default: undefined },

  //Events
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<(keys: any[]) => void>>,
  'onUpdate:sourceSelectedKeys': [Function, Array] as PropType<MaybeArray<(keys: any[]) => void>>,
  'onUpdate:targetSelectedKeys': [Function, Array] as PropType<MaybeArray<(keys: any[]) => void>>,
  'onUpdate:sourceExpandedKeys': [Function, Array] as PropType<MaybeArray<(keys: any[]) => void>>,
  'onUpdate:targetExpandedKeys': [Function, Array] as PropType<MaybeArray<(keys: any[]) => void>>,
  onChange: [Function, Array] as PropType<MaybeArray<(keys: any[], oldKeys: any[]) => void>>,
  onSearch: [Function, Array] as PropType<MaybeArray<(isSource: boolean, searchValue: string) => void>>,
  onSelectAll: [Function, Array] as PropType<MaybeArray<(isSource: boolean, selectAll: boolean) => void>>,
  onClear: [Function, Array] as PropType<MaybeArray<() => void>>,
  onScroll: [Function, Array] as PropType<MaybeArray<(isSource: boolean, evt: Event) => void>>,
  onScrolledChange: [Function, Array] as PropType<
    MaybeArray<(isSource: boolean, startIndex: number, endIndex: number, visibleData: unknown[]) => void>
  >,
  onScrolledBottom: [Function, Array] as PropType<MaybeArray<(isSource: boolean) => void>>,
} as const

export const proTransferTableContentProps = {
  isSource: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
} as const

export const proTransferTreeContentProps = {
  isSource: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
} as const

export const proTransferListContentProps = {
  isSource: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
} as const

export interface ProTransferApis {
  scrollTo: (isSource: boolean, ...params: Parameters<VirtualScrollToFn>) => ReturnType<VirtualScrollToFn>
}

export type ProTransferProps = ExtractInnerPropTypes<typeof proTransferProps>
export type ProTransferPublicProps = ExtractPublicPropTypes<typeof proTransferProps>
export type ProTransferComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ProTransferPublicProps> & ProTransferPublicProps,
  ProTransferApis
>
export type ProTransferInstance = InstanceType<DefineComponent<ProTransferProps, ProTransferApis>>
