/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { Locale as FNSLocale } from 'date-fns'

export type DateLocale = FNSLocale

export interface DatePickerLocale {
  today: string
  ok: string
  clear: string
  month: string
  year: string
  monthSelect: string
  yearSelect: string
  monthFormat: string
  yearFormat: string
  previousMonth: string
  nextMonth: string
  previousYear: string
  nextYear: string
  previousDecade: string
  nextDecade: string
  datePlaceholder: string
  weekPlaceholder: string
  monthPlaceholder: string
  quarterPlaceholder: string
  yearPlaceholder: string
}

export interface DateRangePickerLocale {
  datePlaceholder: [string, string]
  weekPlaceholder: [string, string]
  monthPlaceholder: [string, string]
  quarterPlaceholder: [string, string]
  yearPlaceholder: [string, string]
}

export interface EmptyLocale {
  description: string
}

export interface ModalLocale {
  cancelText: string
  okText: string
  justOkText: string
}

export interface PaginationLocale {
  itemsPerPage: string
  jumpTo: string
  page: string
  prev: string
  next: string
  prev5: string
  next5: string
  totalPrefix: string
  totalSuffix: string
}

export interface TableLocale {
  expand: string
  collapse: string
  filterTitle: string
  filterConfirm: string
  filterReset: string
  filterEmptyText: string
  selectAll: string
  selectInvert: string
  selectNone: string
  selectPageAll: string
  selectPageInvert: string
  sortDesc: string
  sortAsc: string
  sortCancel: string
}

export interface Locale {
  type: LocaleType
  date: DateLocale
  datePicker: DatePickerLocale
  dateRangePicker: DateRangePickerLocale
  empty: EmptyLocale
  modal: ModalLocale
  pagination: PaginationLocale
  table: TableLocale
}

export type LocaleKey = keyof Locale

export type LocaleType = 'zh-CN' | 'en-US'
