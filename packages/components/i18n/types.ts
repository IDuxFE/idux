export interface GlobalLocale {
  placeholder: string
}

export interface Locale {
  type: LocaleType
  global: GlobalLocale
}

export type LocaleKey = keyof Locale

export type LocaleType = 'en_US' | 'es_ES' | 'zh-CN' | 'zh-TW'
