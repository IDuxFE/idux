/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Locale } from '../types'

import { enUS as dateFnsLocale } from 'date-fns/locale'

const enUS: Locale = {
  type: 'en-US',
  date: dateFnsLocale,
  datePicker: {
    today: 'Today',
    ok: 'OK',
    clear: 'Clear',
    month: 'Month',
    year: 'Year',
    monthSelect: 'Select month',
    yearSelect: 'Select year',
    monthFormat: 'MMM',
    yearFormat: 'yyyy',
    previousMonth: 'Previous month',
    nextMonth: 'Next month',
    previousYear: 'Previous year',
    nextYear: 'Next year',
    previousDecade: 'Previous decade',
    nextDecade: 'Next decade',
    datePlaceholder: 'Select date',
    weekPlaceholder: 'Select week',
    monthPlaceholder: 'Select month',
    quarterPlaceholder: 'Select quarter',
    yearPlaceholder: 'Select year',
    datetimePlaceholder: 'Select time',
  },
  dateRangePicker: {
    datePlaceholder: ['Start date', 'End date'],
    weekPlaceholder: ['Start week', 'End week'],
    monthPlaceholder: ['Start month', 'End month'],
    quarterPlaceholder: ['Start quarter', 'End quarter'],
    yearPlaceholder: ['Start year', 'End year'],
    datetimePlaceholder: ['Start time', 'End time'],
    separator: 'To',
    okText: 'OK',
    cancelText: 'Cancel',
  },
  empty: {
    description: 'No data available',
  },
  modal: {
    cancelText: 'Cancel',
    okText: 'OK',
    justOkText: 'OK',
  },
  pagination: {
    itemsPerPage: 'Entries per Page',
    itemsSuffix: '',
    jumpTo: 'Page',
    page: '',
    prev: 'Previous',
    next: 'Next',
    prev5: 'Previous 5 Pages',
    next5: 'Next 5 Pages',
    totalPrefix: '',
    totalSuffix: 'entries in total',
  },
  popconfirm: {
    cancelText: 'Cancel',
    okText: 'OK',
  },
  select: {
    limitMessage: 'Select ${0} or fewer items',
  },
  table: {
    expand: 'Expand',
    collapse: 'Collapse',
    filterTitle: 'Filter',
    filterConfirm: 'OK',
    filterReset: 'Reset',
    filterEmptyText: 'No Filters',
    selectAll: 'Select All',
    selectInvert: 'Invert Selection',
    selectNone: 'Clear All',
    selectPageAll: 'Select Current Page',
    selectPageInvert: 'Invert Current Selection',
    sortDesc: 'Sort descending',
    sortAsc: 'Sort ascending',
    sortCancel: 'Cancel sort',
  },
  timePicker: {
    okText: 'OK',
    placeholder: 'Select time',
  },
  timeRangePicker: {
    okText: 'OK',
    separator: 'To',
    placeholder: ['Start time', 'End time'],
  },
  tour: {
    nextText: 'Next',
    prevText: 'Previous',
    finishText: 'Done',
  },
  transfer: {
    toSelect: 'Available',
    selected: 'Selected',
    searchPlaceholder: ['Search', 'Search'],
  },
  treeSelect: {
    expandAll: 'Expand',
    collapseAll: 'Collapse',
  },
  upload: {
    uploading: 'Uploading...',
    error: 'Upload failed',
    cancel: 'Cancel',
    preview: 'Preview',
    remove: 'Delete',
    retry: 'Reupload',
    download: 'Download',
  },
}

export default enUS
