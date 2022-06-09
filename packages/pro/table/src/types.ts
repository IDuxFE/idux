/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ValidatorFn, ValidatorOptions } from '@idux/cdk/forms'
import type { VirtualScrollToFn } from '@idux/cdk/scroll'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { CascaderProps } from '@idux/components/cascader'
import type { CheckboxProps } from '@idux/components/checkbox'
import type { DatePickerProps, DateRangePickerProps } from '@idux/components/date-picker'
import type { EmptyProps } from '@idux/components/empty'
import type { HeaderProps } from '@idux/components/header'
import type { InputProps } from '@idux/components/input'
import type { InputNumberProps } from '@idux/components/input-number'
import type { RadioProps } from '@idux/components/radio'
import type { RateProps } from '@idux/components/rate'
import type { SelectProps } from '@idux/components/select'
import type { SpinProps } from '@idux/components/spin'
import type { SwitchProps } from '@idux/components/switch'
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
import type { TextareaProps } from '@idux/components/textarea'
import type { TimeRangePickerProps } from '@idux/components/time-picker'
import type { TooltipProps } from '@idux/components/tooltip'
import type { TreeSelectProps } from '@idux/components/tree-select'
import type { DefineComponent, HTMLAttributes, PropType, VNode } from 'vue'

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
  ellipsis: { type: Boolean, default: false },
  empty: { type: [String, Object] as PropType<string | EmptyProps>, default: undefined },
  getKey: { type: [String, Function] as PropType<string | ((record: any) => VKey)>, default: undefined },
  header: { type: [String, Object] as PropType<string | HeaderProps>, default: undefined },
  headless: { type: Boolean, default: undefined },
  pagination: { type: [Boolean, Object] as PropType<boolean | TablePagination>, default: undefined },
  scroll: { type: Object as PropType<TableScroll>, default: undefined },
  size: { type: String as PropType<TableSize>, default: undefined },
  spin: { type: [Boolean, Object] as PropType<boolean | SpinProps>, default: undefined },
  sticky: { type: [Boolean, Object] as PropType<boolean | TableSticky>, default: undefined },
  tableLayout: { type: String as PropType<'auto' | 'fixed'>, default: undefined },
  toolbar: { type: Array as PropType<Array<ProTableToolbar>>, default: undefined },
  virtual: { type: Boolean, default: false },

  // events
  'onUpdate:expandedRowKeys': [Function, Array] as PropType<MaybeArray<(keys: VKey[]) => void>>,
  'onUpdate:selectedRowKeys': [Function, Array] as PropType<MaybeArray<(keys: VKey[]) => void>>,
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

export const proTableLayoutToolProps = {}

export type ProTableLayoutToolProps = ExtractInnerPropTypes<typeof proTableLayoutToolProps>
export type ProTableLayoutToolPublicProps = ExtractPublicPropTypes<typeof proTableLayoutToolProps>
export type ProTableLayoutToolComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ProTableLayoutToolPublicProps> & ProTableLayoutToolPublicProps
>
export type ProTableLayoutToolInstance = InstanceType<DefineComponent<ProTableLayoutToolProps>>

export type ProTableColumn<T = any, V = any, CT = 'input'> =
  | ProTableColumnBase<T, V, CT>
  | ProTableColumnExpandable<T, V, CT>
  | ProTableColumnSelectable<T>
  | ProTableColumnIndexable<T, V>

export interface ProTableColumnBase<T = any, V = any, CT = 'input'>
  extends TableColumnBase<T, V>,
    ProTableColumnResizable,
    ProTableColumnLayoutConfig,
    ProTableColumnCellTypeWithProps<CT> {
  copyable?: boolean
  editable?: boolean
  tooltip?: string | TooltipProps
  tooltipIcon?: string

  children?: ProTableColumn<T>[]
}

export interface ProTableColumnExpandable<T = any, V = any, CT = 'input'>
  extends Omit<TableColumnExpandable<T, V>, keyof ProTableColumnBase>,
    ProTableColumnBase<T, V, CT> {}

export interface ProTableColumnSelectable<T = any>
  extends TableColumnSelectable<T>,
    ProTableColumnResizable,
    ProTableColumnLayoutConfig {}

export interface ProTableColumnIndexable<T = any, V = never> extends ProTableColumnBase<T, V> {
  type: 'indexable'
}

export type ProTableColumnLayoutConfig = {
  changeFixed?: boolean
  changeIndex?: boolean
  changeVisible?: boolean
  visible?: boolean
}

export type ProTableColumnResizable = {
  minWidth?: number | string
  maxWidth?: number | string
  resizable?: boolean
}

export interface ProTableColumnCellProps {
  cascader: CascaderProps
  checkbox: CheckboxProps
  date: DatePickerProps
  dateRange: DateRangePickerProps
  input: InputProps
  inputNumber: InputNumberProps
  radio: RadioProps
  rate: RateProps
  select: SelectProps
  switch: SwitchProps
  textarea: TextareaProps
  time: TimeRangePickerProps
  timeRange: TimeRangePickerProps
  treeSelect: TreeSelectProps
}

export type ProTableColumnCellType = keyof ProTableColumnCellProps

export type ProTableColumnCellTypeWithProps<CT> = {
  cellType?: CT
  format?: string
  fieldProps?: CT extends ProTableColumnCellType ? ProTableColumnCellProps[CT] : Record<string, any>
  fieldValidators?: ValidatorFn | ValidatorFn[] | ValidatorOptions
}

export type ProTableToolbar =
  | 'layout'
  | {
      key?: VKey
      trigger: string | VNode
      onClick?: () => void
      [key: string]: unknown
    }
