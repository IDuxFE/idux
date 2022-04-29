/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GetRowKey } from './composables/useGetRowKey'
import type { TransferOperationsContext } from './composables/useTransferOperations'
import type { ConvertToSlotParams } from './utils'
import type { VirtualScrollToFn } from '@idux/cdk/scroll'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { EmptyProps } from '@idux/components/empty'
import type { PaginationProps } from '@idux/components/pagination'
import type { ComputedRef, DefineComponent, HTMLAttributes, PropType, Slots, VNode } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export interface SeparatedData<T extends TransferData = TransferData> {
  sourceData: T[]
  targetData: T[]
}
export interface TransferDataStrategiesConfig<T extends TransferData = TransferData> {
  genDataKeys?: (data: T[], getRowKey: GetRowKey) => Set<VKey>
  genDataKeyMap?: (dataSource: T[], getRowKey: GetRowKey) => Map<VKey, T>
  genDisabledKeys?: (data: T[], getRowKey: GetRowKey) => Set<VKey>
  separateDataSource?: (
    dataSource: T[],
    dataKeyMap: Map<VKey, T>,
    selectedKeySet: Set<VKey>,
    getRowKey: GetRowKey,
  ) => SeparatedData<T>
  dataFilter?: (data: T[], searchValue: string, searchFn: (item: T, searchValue: string) => boolean) => T[]
  append?: (keys: VKey[], selectedKeySet: Set<VKey>, getRowKey: GetRowKey, handleChange: (keys: VKey[]) => void) => void
  remove?: (keys: VKey[], selectedKeySet: Set<VKey>, getRowKey: GetRowKey, handleChange: (keys: VKey[]) => void) => void
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

  triggerAppend: (keys: VKey[]) => void
  triggerRemove: (keys: VKey[]) => void
  getRowKey: GetRowKey
  handleSelectChange: (keys: Set<VKey> | VKey[]) => void
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
  label?: (item: T) => VNode[]
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
  value: IxPropTypes.array<VKey>(),
  sourceSelectedKeys: IxPropTypes.array<VKey>(),
  targetSelectedKeys: IxPropTypes.array<VKey>(),

  clearable: IxPropTypes.bool,
  clearIcon: IxPropTypes.string,
  customAdditional: { type: Object as PropType<TransferCustomAdditional>, default: undefined },
  dataSource: IxPropTypes.array<TransferData>().def(() => []),
  disabled: IxPropTypes.bool.def(false),
  empty: IxPropTypes.oneOfType<string | EmptyProps>([String, IxPropTypes.object<EmptyProps>()]),
  getKey: IxPropTypes.oneOfType([String, IxPropTypes.func<(item: TransferData) => number | string>()]),
  mode: IxPropTypes.oneOf<TransferMode>(['default', 'immediate']).def('default'),
  pagination: IxPropTypes.oneOfType([Boolean, IxPropTypes.object<TransferPaginationProps>()]),
  scroll: IxPropTypes.object<TransferScroll>(),
  searchable: IxPropTypes.oneOfType([Boolean, IxPropTypes.object<{ source: boolean; target: boolean }>()]),
  searchFn: IxPropTypes.func<SearchFn>(),
  spin: IxPropTypes.oneOfType([Boolean, IxPropTypes.object<{ source: boolean; target: boolean }>()]),
  showSelectAll: IxPropTypes.bool,
  virtual: IxPropTypes.bool.def(false),

  //Events
  'onUpdate:value': IxPropTypes.emit<(keys: VKey[]) => void>(),
  'onUpdate:sourceSelectedKeys': IxPropTypes.emit<(keys: VKey[]) => void>(),
  'onUpdate:targetSelectedKeys': IxPropTypes.emit<(keys: VKey[]) => void>(),
  onChange: IxPropTypes.emit<(keys: VKey[], oldKeys: VKey[]) => void>(),
  onSearch: IxPropTypes.emit<(isSource: boolean, searchValue: string) => void>(),
  onSelectAll: IxPropTypes.emit<(isSource: boolean, selectAll: boolean) => void>(),
  onClear: IxPropTypes.emit<() => void>(),

  onScroll: IxPropTypes.emit<(isSource: boolean, evt: Event) => void>(),
  onScrolledChange:
    IxPropTypes.emit<(isSource: boolean, startIndex: number, endIndex: number, visibleData: unknown[]) => void>(),
  onScrolledBottom: IxPropTypes.emit<(isSource: boolean) => void>(),
} as const

export const transferListProps = {
  isSource: IxPropTypes.bool.isRequired,
}
export const transferListBodyProps = transferListProps
export const transferListHeaderProps = transferListProps
export const transferListFooterProps = transferListProps

export const transferListItemProps = {
  checked: IxPropTypes.bool.def(false),
  checkable: IxPropTypes.bool.isRequired,
  removable: IxPropTypes.bool.isRequired,
  disabled: IxPropTypes.bool.def(false),
  value: IxPropTypes.oneOfType([String, Number, Symbol]).isRequired,
  onChange: IxPropTypes.emit<(value: boolean) => void>(),
  onRemove: IxPropTypes.emit<() => void>(),
}

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

export interface TransferData {
  key?: VKey
  label?: string
  disabled?: boolean
  [key: string]: unknown
}
