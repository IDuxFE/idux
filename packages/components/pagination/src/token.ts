import type { ComputedRef, InjectionKey, Ref, Slots } from 'vue'
import type { PaginationConfig } from '@idux/components/config'
import { PaginationLocale } from '@idux/components/i18n'
import type { PaginationProps } from './types'

export interface PaginationContext {
  props: PaginationProps
  slots: Slots
  config: PaginationConfig
  locale: ComputedRef<PaginationLocale>
  activeIndex: Ref<number>
  activeSize: Ref<number>
  onPageIndexChange: (index: number) => void
  onPageSizeChange: (size: number) => void
}

export const paginationToken: InjectionKey<PaginationContext> = Symbol('paginationToken')
