/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { DatePanelProps, DateRangePanelProps } from '@idux/components/date-picker'
import type { SelectData } from '@idux/components/select'
import type { DefineComponent, HTMLAttributes, PropType, VNode, VNodeChild } from 'vue'

import { PortalTargetType } from '@idux/cdk/portal'

export interface SearchValue<V = unknown> {
  key: VKey
  name?: string
  value: V
  operator?: string
}

export interface InvalidSearchValue<V = unknown> extends Partial<SearchValue<V>> {
  nameInput?: string
  operatorInput?: string
  valueInput?: string
}

export interface PanelRenderContext<V = unknown> {
  input: string
  value: V
  ok: () => void
  cancel: () => void
  setValue: (value: V) => void
  setOnKeyDown: (onKeyDown: ((evt: KeyboardEvent) => boolean) | undefined) => void
}

export interface Segment<V = unknown> {
  name: string
  inputClassName: string | (string | undefined)[]
  defaultValue?: V
  format: InputFormater<V>
  parse: InputParser<V>
  panelRenderer?: (context: PanelRenderContext<V>) => VNodeChild
}

export type InputFormater<V = unknown> = (value: V) => string
export type InputParser<V = unknown> = (input: string) => V | null

export interface SearchItem {
  key: VKey
  optionKey?: VKey
  segments: Segment[]
}

interface SearchFieldBase {
  key: VKey
  label: string
  multiple?: boolean
  operators?: string[]
  defaultOperator?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any
  inputClassName?: string
}

export type SelectPanelData = Required<Pick<SelectData, 'key' | 'label'>> & SelectData

export const searchDataTypes = ['select', 'input', 'datePicker', 'dateRangePicker', 'custom'] as const
export type SearchDataTypes = typeof searchDataTypes[number]

export interface SelectSearchField extends SearchFieldBase {
  type: 'select'
  fieldConfig: {
    dataSource: SelectPanelData[]
    multiple?: boolean
    searchable?: boolean
    separator?: string
    virtual?: boolean
    searchFn?: (data: SelectPanelData, searchText: string) => boolean
    overlayItemWidth?: number
  }
}

export interface InputSearchField extends SearchFieldBase {
  type: 'input'
  fieldConfig: {
    trim?: boolean
  }
}

export interface DatePickerSearchField extends SearchFieldBase {
  type: 'datePicker'
  fieldConfig: {
    format?: string
    type?: DatePanelProps['type']
    cellTooltip?: DatePanelProps['cellTooltip']
    disabledDate?: DatePanelProps['disabledDate']
    timePanelOptions?: DatePanelProps['timePanelOptions']
  }
}

export interface DateRangePickerSearchField extends SearchFieldBase {
  type: 'dateRangePicker'
  fieldConfig: {
    format?: string
    separator?: string
    type?: DateRangePanelProps['type']
    cellTooltip?: DateRangePanelProps['cellTooltip']
    disabledDate?: DateRangePanelProps['disabledDate']
    timePanelOptions?: DateRangePanelProps['timePanelOptions']
  }
}

export interface CustomSearchField extends SearchFieldBase {
  type: 'custom'
  fieldConfig: {
    customPanel?: string | ((context: PanelRenderContext) => VNodeChild)
    format: InputFormater
    parse: InputParser
  }
}

export type SearchField =
  | SelectSearchField
  | InputSearchField
  | DatePickerSearchField
  | DateRangePickerSearchField
  | CustomSearchField

export const proSearchProps = {
  value: Array as PropType<SearchValue[]>,
  clearable: {
    type: Boolean,
    default: undefined,
  },
  clearIcon: [String, Object] as PropType<string | VNode>,
  maxLabel: { type: [Number, String] as PropType<number | 'responsive'>, default: 'responsive' },
  searchIcon: [String, Object] as PropType<string | VNode>,
  disabled: {
    type: Boolean,
    default: false,
  },
  overlayContainer: {
    type: [String, HTMLElement, Function] as PropType<PortalTargetType>,
    default: undefined,
  },
  placeholder: String,
  searchFields: Array as PropType<SearchField[]>,

  //events
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<(value: SearchValue[] | undefined) => void>>,
  onChange: [Function, Array] as PropType<
    MaybeArray<(value: SearchValue[] | undefined, oldValue: SearchValue[] | undefined) => void>
  >,
  onClear: [Function, Array] as PropType<MaybeArray<() => void>>,
  onItemRemove: [Array, Function] as PropType<MaybeArray<(item: SearchValue) => void>>,
  onSearch: [Array, Function] as PropType<MaybeArray<(value: SearchValue[] | undefined) => void>>,
  onItemInvalid: [Array, Function] as PropType<MaybeArray<(item: InvalidSearchValue) => void>>,
} as const

export type ProSearchProps = ExtractInnerPropTypes<typeof proSearchProps>
export type ProSearchPublicProps = ExtractPublicPropTypes<typeof proSearchProps>
export type ProSearchComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ProSearchPublicProps> & ProSearchPublicProps
>
export type ProSearchInstance = InstanceType<DefineComponent<ProSearchProps>>

export const searchItemProps = {
  searchItem: {
    type: Object as PropType<SearchItem>,
    required: true,
  },
  tagOnly: {
    type: Boolean,
    default: false,
  },
}
export type SearchItemProps = ExtractInnerPropTypes<typeof searchItemProps>

export const segmentProps = {
  itemKey: {
    type: [String, Number, Symbol] as PropType<VKey>,
    required: true,
  },
  input: String,
  value: null,
  disabled: Boolean,
  segment: {
    type: Object as PropType<Segment>,
    required: true,
  },
} as const
export type SegmentProps = ExtractInnerPropTypes<typeof segmentProps>

export const searchSelectPanelProps = {
  value: { type: Array as PropType<VKey[]>, default: undefined },
  dataSource: { type: Array as PropType<SelectPanelData[]>, default: undefined },
  multiple: { type: Boolean, default: false },
  allSelected: Boolean,
  virtual: { type: Boolean, default: false },
  onChange: Function as PropType<(value: VKey[]) => void>,
  onSelectAll: Function as PropType<(selectAll: boolean) => void>,
  setOnKeyDown: Function as PropType<(onKeyDown: ((evt: KeyboardEvent) => boolean) | undefined) => void>,
  onConfirm: Function as PropType<() => void>,
  onCancel: Function as PropType<() => void>,
} as const
export type SearchSelectPanelProps = ExtractInnerPropTypes<typeof searchSelectPanelProps>

export const searchDatePickerPanelProps = {
  panelType: {
    type: String as PropType<'datePicker' | 'dateRangePicker'>,
    required: true,
  },
  value: { type: [Date, Array] as PropType<Date | Date[]>, default: undefined },
  cellTooltip: Function as PropType<(cell: { value: Date; disabled: boolean }) => string | void>,
  disabledDate: Function as PropType<(date: Date) => boolean>,
  defaultOpenValue: [Date, Array] as PropType<Date | Date[]>,
  type: {
    type: String as PropType<DatePanelProps['type']>,
    default: 'date',
  },
  timePanelOptions: [Object, Array] as PropType<
    DatePanelProps['timePanelOptions'] | DateRangePanelProps['timePanelOptions']
  >,
  onChange: Function as PropType<(value: Date | Date[] | undefined) => void>,
  onConfirm: Function as PropType<() => void>,
  onCancel: Function as PropType<() => void>,
} as const
export type SearchDatePickerPanelProps = ExtractInnerPropTypes<typeof searchDatePickerPanelProps>
