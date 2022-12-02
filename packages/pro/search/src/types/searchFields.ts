/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SelectPanelData } from './panels'
import type { SearchItemError } from './searchItem'
import type { SearchValue } from './searchValue'
import type { InputFormater, InputParser, PanelRenderContext } from './segment'
import type { VKey } from '@idux/cdk/utils'
import type { DatePanelProps, DateRangePanelProps } from '@idux/components/date-picker'
import type { VNodeChild } from 'vue'

interface SearchFieldBase<V = unknown> {
  key: VKey
  label: string
  multiple?: boolean
  operators?: string[]
  defaultOperator?: string
  defaultValue?: V
  inputClassName?: string
  placeholder?: string
  validator?: (value: SearchValue<V>) => Omit<SearchItemError, 'index'> | undefined
  onPanelVisibleChange?: (visible: boolean) => void
}

export const searchDataTypes = ['select', 'input', 'datePicker', 'dateRangePicker', 'custom'] as const
export type SearchDataTypes = typeof searchDataTypes[number]

export interface SelectSearchField extends SearchFieldBase<VKey | VKey[]> {
  type: 'select'
  fieldConfig: {
    dataSource: SelectPanelData[]
    multiple?: boolean
    searchable?: boolean
    separator?: string
    showSelectAll?: boolean
    virtual?: boolean
    searchFn?: (data: SelectPanelData, searchText: string) => boolean
    overlayItemWidth?: number
  }
}

export interface InputSearchField extends SearchFieldBase<string> {
  type: 'input'
  fieldConfig: {
    trim?: boolean
  }
}

export interface DatePickerSearchField extends SearchFieldBase<Date> {
  type: 'datePicker'
  fieldConfig: {
    format?: string
    type?: DatePanelProps['type']
    cellTooltip?: DatePanelProps['cellTooltip']
    disabledDate?: DatePanelProps['disabledDate']
    timePanelOptions?: DatePanelProps['timePanelOptions']
  }
}

export interface DateRangePickerSearchField extends SearchFieldBase<Date[]> {
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
