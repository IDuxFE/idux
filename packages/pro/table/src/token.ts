/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ColumnsContext } from './composables/useColumns'
import type { ProTableProps } from './types'
import type { ProTableConfig } from '@idux/pro/config'
import type { ProLocale } from '@idux/pro/locales'
import type { ComputedRef, InjectionKey } from 'vue'

export interface ProTableContext extends ColumnsContext {
  props: ProTableProps
  config: ProTableConfig
  locale: ProLocale
  mergedPrefixCls: ComputedRef<string>
  mergedSize: ComputedRef<'lg' | 'md' | 'sm'>
  setMergedSize: (value: 'lg' | 'md' | 'sm') => void
}

export const proTableToken: InjectionKey<ProTableContext> = Symbol('proTableToken')
