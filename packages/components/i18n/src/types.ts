export interface GlobalLocale {
  placeholder: string
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

export interface EmptyLocale {
  description: string
}

export interface Locale {
  type: LocaleType
  global: GlobalLocale
  pagination: PaginationLocale
  empty: EmptyLocale
}

export type LocaleKey = keyof Locale

export type LocaleType = 'zh-CN' | 'en-US'
