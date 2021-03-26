import type { ComputedRef } from 'vue'
import type { Locale, LocaleKey, LocaleType } from './types'

import { computed, ref } from 'vue'
import { Logger } from '@idux/cdk/utils'
import { zh_CN as defaultLocale } from './locales'

const currentType = ref<LocaleType>('zh-CN')
const localeMap: Partial<Record<LocaleType, Locale>> = { 'zh-CN': defaultLocale }

export function useLocale(locale: LocaleType | Locale): void {
  if (typeof locale === 'string') {
    if (localeMap[locale]) {
      currentType.value = locale
    } else {
      Logger.warn(`The local [${locale}] was not added, please via 'addLocale()' add it.`)
    }
  } else {
    const type = locale.type
    localeMap[type] = locale
    currentType.value = type
  }
}

export function addLocale(locale: Locale | Locale[]): void {
  const locales = Array.isArray(locale) ? locale : [locale]
  locales.forEach(item => {
    localeMap[item.type] = item
  })
}

/**
 *
 * @param key optional, gets the value of current locale by key
 */
export function getLocale<T extends LocaleKey>(key: T): ComputedRef<Locale[T]>
export function getLocale(): ComputedRef<Locale>
export function getLocale<T extends LocaleKey>(key?: T): ComputedRef<Locale | Locale[T]> {
  return computed(() => {
    let currLocale = localeMap[currentType.value]
    if (!currLocale) {
      currLocale = defaultLocale
    }
    return key ? currLocale[key] : currLocale
  })
}
