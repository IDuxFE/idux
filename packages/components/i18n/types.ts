export interface GlobalLocale {
  placeholder: string
}

export interface EmptyLocale {
  description: string
}

export interface Locale {
  type: LocaleType
  global: GlobalLocale
  empty: EmptyLocale
}

export type LocaleKey = keyof Locale

export type LocaleType = 'zh-CN' | 'en-US'
