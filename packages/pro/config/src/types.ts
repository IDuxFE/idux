/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProLocale } from '@idux/pro/locales'
import type { ProTableColumnIndexable } from '@idux/pro/table'

export interface ProGlobalConfig {
  common: ProCommonConfig
  locale: ProLocale

  table: ProTableConfig
  tree: ProTreeConfig
}

export type ProGlobalConfigKey = keyof ProGlobalConfig

export interface ProCommonConfig {
  prefixCls: string
}

export interface ProTableConfig {
  columnIndexable: Omit<ProTableColumnIndexable, 'type'>
}

export interface ProTreeConfig {
  clearIcon: string
  collapseIcon: [string, string]
}
