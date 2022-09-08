/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TransferOperationsContext } from './composables/useTransferOperations'
import type { ConvertToSlotParams } from './utils'
import type { VirtualScrollToFn } from '@idux/cdk/scroll'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { EmptyProps } from '@idux/components/empty'
import type { PaginationProps } from '@idux/components/pagination'
import type { GetKeyFn } from '@idux/components/utils'
import type { ComputedRef, DefineComponent, HTMLAttributes, PropType, Slots, VNode } from 'vue'

export interface SeparatedData<T extends TransferData = TransferData> {
  sourceData: T[]
  targetData: T[]
}
export interface TransferDataStrategiesConfig<T extends TransferData = TransferData, K = VKey> {
  genDataKeys?: (data: T[], getKey: GetKeyFn) => Set<K>
  genDataKeyMap?: (dataSource: T[], getKey: GetKeyFn) => Map<K, T>
  genDisabledKeys?: (data: T[], getKey: GetKeyFn) => Set<K>
  separateDataSource?: (
    dataSource: T[],
    dataKeyMap: Map<K, T>,
    selectedKeySet: Set<K>,
    getKey: GetKeyFn,
  ) => SeparatedData<T>
  dataFilter?: (data: T[], searchValue: string, searchFn: (item: T, searchValue: string) => boolean) => T[]
  append?: (keys: K[], selectedKeySet: Set<K>, getKey: GetKeyFn, handleChange: (keys: K[]) => void) => void
  remove?: (keys: K[], selectedKeySet: Set<K>, getKey: GetKeyFn, handleChange: (keys: K[]) => void) => void
}
export type TransferDataStrategies<T extends TransferData = TransferData> = Required<TransferDataStrategiesConfig<T>>

export type TransferMode = 'default' | 'immediate'

export interface TransferBindings<T extends TransferData = TransferData> {
  data: ComputedRef<T[]>
  filteredData: ComputedRef<T[]>
  paginatedData: ComputedRef<T[]>
  dataSource: ComputedRef<T[]>
  dataKeyMap: ComputedRef<Map<VKey, T>>
  filteredDataSource: ComputedRef<T[]>
  paginatedDataSource: ComputedRef<T[]>
  targetKeySet: ComputedRef<Set<VKey>>
  selectedKeys: ComputedRef<VKey[]>
  selectedKeySet: ComputedRef<Set<VKey>>
  disabledKeys: ComputedRef<Set<VKey>>
  disabledDataSourceKeys: ComputedRef<Set<VKey>>
  selectAllDisabled: ComputedRef<boolean>
  selectAllStatus: ComputedRef<{ checked: boolean; indeterminate: boolean }>

  showSelectAll: ComputedRef<boolean>
  searchable: ComputedRef<boolean>

  pagination: ComputedRef<PaginationProps | undefined>

  triggerAppend: <K = VKey>(keys: K[]) => void
  triggerRemove: <K = VKey>(keys: K[]) => void
  getKey: ComputedRef<GetKeyFn>
  handleSelectChange: <K = Set<VKey> | VKey[]>(keys: K) => void
  selectAll: (selected?: boolean) => void

  searchValue: ComputedRef<string>
  handleSearchChange: (value: string) => void
}

export type TransferListSlotParams<T extends TransferData = TransferData> = ConvertToSlotParams<TransferBindings<T>> & {
  isSource: boolean
}
export type TransferOperationsSlotParams = ConvertToSlotParams<TransferOperationsContext>
export type TransferSlot<T extends TransferData = TransferData> = (
  params: TransferListSlotParams<T> & { isSource: boolean },
) => VNode[]

export interface TransferSlots<T extends TransferData = TransferData> extends Slots {
  default?: TransferSlot<T>
  footer?: TransferSlot<T>
  headerLabel?: (params: { data: T[]; isSource: boolean }) => VNode[]
  headerSuffix?: (params: { isSource: boolean }) => VNode[]
  operations?: (operations: TransferOperationsSlotParams) => VNode[]
  label?: (params: { item: T; isSource: boolean }) => VNode[]
  empty?: (params: EmptyProps) => VNode[]
  clearIcon?: () => VNode[]
}

export interface TransferPaginationProps {
  pageIndex?: [number | undefined, number | undefined] | [number | undefined] | number
  pageSize?: [number | undefined, number | undefined] | [number | undefined] | number
  disabled?: boolean
  total?: [number | undefined, number | undefined] | [number | undefined] | number
  onChange?: (isSource: boolean, pageIndex: number, pageSize: number) => void
}

export interface TransferScroll {
  height?: string | number
  width?: string | number | { source?: string | number; target?: string | number }
  fullHeight?: boolean
}

export type SearchFn<T extends TransferData = TransferData> = (
  isSource: boolean,
  item: T,
  searchValue: string,
) => boolean
export const transferProps = {
  value: Array as PropType<VKey[]>,
  sourceSelectedKeys: Array as PropType<VKey[]>,
  targetSelectedKeys: Array as PropType<VKey[]>,

  clearable: {
    type: Boolean,
    default: undefined,
  },
  clearIcon: String,
  customAdditional: { type: Function as PropType<TransferCustomAdditional>, default: undefined },
  dataSource: {
    type: Array as PropType<TransferData[]>,
    default: (): TransferData[] => [],
  },
  defaultTargetData: Array as PropType<TransferData[]>,
  disabled: {
    type: Boolean,
    default: false,
  },
  empty: [String, Object] as PropType<string | EmptyProps>,
  getKey: [String, Function] as PropType<string | ((item: TransferData<any>) => any)>,
  mode: {
    type: String as PropType<TransferMode>,
    default: 'default',
  },
  pagination: {
    type: [Boolean, Object] as PropType<boolean | TransferPaginationProps>,
    default: undefined,
  },
  scroll: Object as PropType<TransferScroll>,
  searchable: {
    type: [Boolean, Object] as PropType<boolean | { source: boolean; target: boolean }>,
    default: undefined,
  },
  searchFn: Function as PropType<SearchFn>,
  spin: {
    type: [Boolean, Object] as PropType<boolean | { source: boolean; target: boolean }>,
    default: undefined,
  },
  showSelectAll: {
    type: Boolean,
    default: undefined,
  },
  virtual: {
    type: Boolean,
    default: false,
  },

  //Events
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<(keys: any[]) => void>>,
  'onUpdate:sourceSelectedKeys': [Function, Array] as PropType<MaybeArray<(keys: any[]) => void>>,
  'onUpdate:targetSelectedKeys': [Function, Array] as PropType<MaybeArray<(keys: any[]) => void>>,
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

export const transferListProps = {
  isSource: {
    type: Boolean,
    required: true,
  },
}
export const transferListBodyProps = transferListProps
export const transferListHeaderProps = transferListProps
export const transferListFooterProps = transferListProps

export const transferListItemProps = {
  checked: {
    type: Boolean,
    default: false,
  },
  checkable: {
    type: Boolean,
    required: true,
  },
  removable: {
    type: Boolean,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [String, Number, Symbol],
    required: true,
  },
  onChange: [Function, Array] as PropType<MaybeArray<(value: boolean) => void>>,
  onRemove: [Function, Array] as PropType<MaybeArray<() => void>>,
} as const

export interface TransferApis {
  scrollTo: (isSource: boolean, ...params: Parameters<VirtualScrollToFn>) => ReturnType<VirtualScrollToFn>
}

export type TransferProps = ExtractInnerPropTypes<typeof transferProps>
export type TransferPublicProps = ExtractPublicPropTypes<typeof transferProps>
export type TransferComponent = DefineComponent<
  Omit<HTMLAttributes, keyof TransferPublicProps> & TransferPublicProps,
  TransferApis
>
export type TransferInstance = InstanceType<DefineComponent<TransferProps, TransferApis>>

export type TransferCustomAdditional = (options: {
  data: TransferData
  index: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) => Record<string, any> | undefined

export interface TransferData<K = VKey> {
  key?: K
  label?: string
  disabled?: boolean
  [key: string]: unknown
}
