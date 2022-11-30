/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { VirtualScrollToFn } from '@idux/cdk/scroll'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { EmptyProps } from '@idux/components/empty'
import type { HeaderProps } from '@idux/components/header'
import type { SpinProps } from '@idux/components/spin'
import type {
  TableColumnBase,
  TableColumnExpandable,
  TableColumnSelectable,
  TableCustomAdditional,
  TableCustomTag,
  TablePagination,
  TableScroll,
  TableSize,
  TableSticky,
} from '@idux/components/table'
import type { TooltipProps } from '@idux/components/tooltip'
import type { DefineComponent, HTMLAttributes, PropType, VNodeChild } from 'vue'

export const proTableProps = {
  expandedRowKeys: { type: Array as PropType<VKey[]>, default: undefined },
  selectedRowKeys: { type: Array as PropType<VKey[]>, default: undefined },

  autoHeight: { type: Boolean, default: undefined },
  borderless: { type: Boolean, default: undefined },
  childrenKey: { type: String, default: undefined },
  columns: { type: Array as PropType<ProTableColumn[]>, default: () => [] },
  customAdditional: { type: Object as PropType<TableCustomAdditional>, default: undefined },
  customTag: { type: Object as PropType<TableCustomTag>, default: undefined },
  dataSource: { type: Array as PropType<any[]>, default: () => [] },
  editable: { type: Boolean, default: false },
  ellipsis: { type: [Boolean, Object] as PropType<boolean | { title?: boolean }>, default: false },
  empty: { type: [String, Object] as PropType<'default' | 'simple' | EmptyProps>, default: 'default' },
  getKey: { type: [String, Function] as PropType<string | ((record: any) => any)>, default: undefined },
  header: { type: [String, Object] as PropType<string | HeaderProps>, default: undefined },
  headless: { type: Boolean, default: undefined },
  layoutTool: { type: [Boolean, Object] as PropType<boolean | ProTableLayoutToolPublicProps>, default: true },
  pagination: { type: [Boolean, Object] as PropType<boolean | TablePagination>, default: undefined },
  scroll: { type: Object as PropType<TableScroll>, default: undefined },
  scrollToTopOnChange: { type: Boolean, default: undefined },
  size: { type: String as PropType<TableSize>, default: undefined },
  spin: { type: [Boolean, Object] as PropType<boolean | SpinProps>, default: undefined },
  sticky: { type: [Boolean, Object] as PropType<boolean | TableSticky>, default: undefined },
  tableLayout: { type: String as PropType<'auto' | 'fixed'>, default: undefined },
  toolbar: { type: Array as PropType<Array<VNodeChild>>, default: undefined },
  virtual: { type: Boolean, default: false },

  // events
  'onUpdate:expandedRowKeys': [Function, Array] as PropType<MaybeArray<(keys: any[]) => void>>,
  'onUpdate:selectedRowKeys': [Function, Array] as PropType<MaybeArray<(keys: any[]) => void>>,
  onColumnsChange: [Function, Array] as PropType<MaybeArray<(columns: ProTableColumn[]) => void>>,
  onScroll: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onScrolledChange: [Function, Array] as PropType<
    MaybeArray<(startIndex: number, endIndex: number, visibleData: any[]) => void>
  >,
  onScrolledBottom: [Function, Array] as PropType<MaybeArray<() => void>>,
} as const

export type ProTableProps = ExtractInnerPropTypes<typeof proTableProps>
export type ProTablePublicProps = ExtractPublicPropTypes<typeof proTableProps>
export interface ProTableBindings {
  scrollTo: VirtualScrollToFn
}
export type ProTableComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ProTablePublicProps> & ProTablePublicProps,
  ProTableBindings
>
export type ProTableInstance = InstanceType<DefineComponent<ProTableProps, ProTableBindings>>

export const proTableLayoutToolProps = {
  placeholder: { type: String, default: undefined },
  searchable: { type: Boolean, default: undefined },
  searchValue: { type: String, default: undefined },

  'onUpdate:searchValue': [Function, Array] as PropType<MaybeArray<(searchValue: string) => void>>,
} as const

export type ProTableLayoutToolProps = ExtractInnerPropTypes<typeof proTableLayoutToolProps>
export type ProTableLayoutToolPublicProps = ExtractPublicPropTypes<typeof proTableLayoutToolProps>
export type ProTableLayoutToolComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ProTableLayoutToolPublicProps> & ProTableLayoutToolPublicProps
>
export type ProTableLayoutToolInstance = InstanceType<DefineComponent<ProTableLayoutToolProps>>

export type ProTableColumn<T = any, K = VKey> =
  | ProTableColumnBase<T, K>
  | ProTableColumnExpandable<T, K>
  | ProTableColumnSelectable<T, K>
  | ProTableColumnIndexable<T, K>

export interface ProTableColumnBase<T = any, K = VKey>
  extends TableColumnBase<T, K>,
    ProTableColumnResizable,
    ProTableColumnLayoutConfig {
  copyable?: boolean
  editable?: boolean
  tooltip?: string | TooltipProps
  tooltipIcon?: string

  children?: ProTableColumn<T, K>[]
}

export interface ProTableColumnExpandable<T = any, K = VKey>
  extends Omit<TableColumnExpandable<T, K>, keyof ProTableColumnBase>,
    ProTableColumnBase<T, K> {}

export interface ProTableColumnSelectable<T = any, K = VKey>
  extends TableColumnSelectable<T, K>,
    ProTableColumnResizable,
    ProTableColumnLayoutConfig {}

export interface ProTableColumnIndexable<T = any, K = VKey> extends ProTableColumnBase<T, K> {
  type: 'indexable'
}

export type ProTableColumnLayoutConfig = {
  changeFixed?: boolean
  changeIndex?: boolean
  changeVisible?: boolean
  visible?: boolean
}

export type ProTableColumnResizable = {
  maxWidth?: number | string
  minWidth?: number | string
  resizable?: boolean
}
