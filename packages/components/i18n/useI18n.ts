import { computed, ref } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import { IDUX_COMPONENTS_PREFIX } from '../core/constant'
import { Logger } from '../core/logger'
import { zh_CN as defaultLocale } from './languages/zh_CN'
import type { Locale, LocaleKey, LocaleType } from './types'

const currentType: Ref<LocaleType> = ref('zh-CN')
const localeMap: Partial<Record<LocaleType, Locale>> = { 'zh-CN': defaultLocale }

export function useI18n(locale: LocaleType | Locale): void {
  if (typeof locale === 'string') {
    if (localeMap[locale]) {
      currentType.value = locale
    } else {
      Logger.warn(`${IDUX_COMPONENTS_PREFIX} The local [${locale}] was not added, please via 'addI18n()' add it.`)
    }
  } else {
    const type = locale.type
    localeMap[type] = locale
    currentType.value = type
  }
}

export function addI18n(locale: Locale | Locale[]): void {
  const locales = Array.isArray(locale) ? locale : [locale]
  locales.forEach(item => {
    localeMap[item.type] = item
  })
}

/**
 *
 * @param key optional, gets the value of current locale by key
 */
export function getI18n<T extends LocaleKey>(key: T): ComputedRef<Locale[T]>
export function getI18n(): ComputedRef<Locale>
export function getI18n<T extends LocaleKey>(key?: T): ComputedRef<Locale | Locale[T]> {
  return computed(() => {
    let currLocale = localeMap[currentType.value]
    /* istanbul ignore next */
    if (!currLocale) {
      /* istanbul ignore next */
      currLocale = defaultLocale
    }
    return key ? currLocale[key] : currLocale
  })
}
