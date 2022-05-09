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
  datetimePlaceholder: string
}

export interface DateRangePickerLocale {
  datePlaceholder: [string, string]
  weekPlaceholder: [string, string]
  monthPlaceholder: [string, string]
  quarterPlaceholder: [string, string]
  yearPlaceholder: [string, string]
  datetimePlaceholder: [string, string]
  separator: string
  okText: string
  cancelText: string
}

export interface EmptyLocale {
  description: string
}

export interface ModalLocale {
  cancelText: string
  okText: string
  justOkText: string
}
export interface PopconfirmLocale {
  cancelText: string
  okText: string
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

export interface SelectLocale {
  limitMessage: string
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

export interface TimePickerLocale {
  okText: string
  placeholder: string
}

export interface TimeRangePickerLocale {
  okText: string
  separator: string
  placeholder: [string, string]
}

export interface TransferLocale {
  toSelect: string
  selected: string
  searchPlaceholder: [string, string]
}

export interface TreeSelectLocale {
  expandAll: string
  collapseAll: string
}

export interface UploadLocale {
  uploading: string
  error: string
  cancel: string
  preview: string
  remove: string
  retry: string
  download: string
}

export interface Locale {
  type: LocaleType
  date: DateLocale
  datePicker: DatePickerLocale
  dateRangePicker: DateRangePickerLocale
  empty: EmptyLocale
  modal: ModalLocale
  popconfirm: PopconfirmLocale
  pagination: PaginationLocale
  select: SelectLocale
  table: TableLocale
  timePicker: TimePickerLocale
  timeRangePicker: TimeRangePickerLocale
  transfer: TransferLocale
  treeSelect: TreeSelectLocale
  upload: UploadLocale
}

export type LocaleType = 'zh-CN' | 'en-US'
