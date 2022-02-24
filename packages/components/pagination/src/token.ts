/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PagesContext } from './composables/usePages'
import type { PaginationProps, PaginationSize } from './types'
import type { PaginationConfig } from '@idux/components/config'
import type { Locale } from '@idux/components/locales'
import type { ComputedRef, InjectionKey, Slots } from 'vue'

export interface PaginationContext extends PagesContext {
  props: PaginationProps
  slots: Slots
  config: PaginationConfig
  locale: Locale
  mergedPrefixCls: ComputedRef<string>
  size: ComputedRef<PaginationSize>
  jumpToIndex: (event: KeyboardEvent) => void
}

export const paginationToken: InjectionKey<PaginationContext> = Symbol('paginationToken')
