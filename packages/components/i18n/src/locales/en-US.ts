/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Locale } from '../types'

import { enUS } from 'date-fns/locale'

/* eslint-disable camelcase */
export const en_US: Locale = {
  type: 'en-US',
  date: enUS,
  datePicker: {
    today: 'Today',
    ok: 'OK',
    clear: 'Clear',
    month: 'Month',
    year: 'Year',
    monthSelect: 'Choose a month',
    yearSelect: 'Choose a year',
    monthFormat: 'MMM',
    yearFormat: 'yyyy',
    previousMonth: 'Previous month',
    nextMonth: 'Next month',
    previousYear: 'Last year',
    nextYear: 'Next year',
    previousDecade: 'Last decade',
    nextDecade: 'Next decade',
    datePlaceholder: 'Select date',
    weekPlaceholder: 'Select week',
    monthPlaceholder: 'Select month',
    quarterPlaceholder: 'Select quarter',
    yearPlaceholder: 'Select year',
  },
  dateRangePicker: {
    datePlaceholder: ['Start date', 'End date'],
    weekPlaceholder: ['Start week', 'End week'],
    monthPlaceholder: ['Start month', 'End month'],
    quarterPlaceholder: ['Start quarter', 'End quarter'],
    yearPlaceholder: ['Start year', 'End year'],
  },
  empty: {
    description: 'No Data',
  },
  modal: {
    cancelText: 'Cancel',
    okText: 'OK',
    justOkText: 'OK',
  },
  pagination: {
    itemsPerPage: '/ page',
    jumpTo: 'Go to',
    page: '',
    prev: 'Previous Page',
    next: 'Next Page',
    prev5: 'Previous 5 Pages',
    next5: 'Next 5 Pages',
    totalPrefix: 'Total',
    totalSuffix: 'items',
  },
  table: {
    expand: 'Expand row',
    collapse: 'Collapse row',
    filterTitle: 'Filter menu',
    filterConfirm: 'OK',
    filterReset: 'Reset',
    filterEmptyText: 'No filters',
    selectAll: 'Select all data',
    selectInvert: 'Invert all data',
    selectNone: 'Clear all data',
    selectPageAll: 'Select current page',
    selectPageInvert: 'Invert current page',
    sortDesc: 'Click to sort descending',
    sortAsc: 'Click to sort ascending',
    sortCancel: 'Click to cancel sorting',
  },
}
