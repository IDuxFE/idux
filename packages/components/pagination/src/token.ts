/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PaginationProps } from './types'
import type { PaginationConfig } from '@idux/components/config'
import type { ComputedRef, InjectionKey, Ref, Slots } from 'vue'

import { PaginationLocale } from '@idux/components/i18n'

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
