export interface EmptyLocale {
  description: string
}

export interface GlobalLocale {
  placeholder: string
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
  sortTitle: string
  sortDesc: string
  sortAsc: string
  sortCancel: string
}

export interface Locale {
  type: LocaleType
  empty: EmptyLocale
  global: GlobalLocale
  modal: ModalLocale
  pagination: PaginationLocale
  table: TableLocale
}

export type LocaleKey = keyof Locale

export type LocaleType = 'zh-CN' | 'en-US'
