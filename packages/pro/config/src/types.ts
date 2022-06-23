/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PortalTargetType } from '@idux/cdk/portal'
import type { ProLocale } from '@idux/pro/locales'
import type { ProTableColumnIndexable } from '@idux/pro/table'
import type { VNode } from 'vue'

export interface ProGlobalConfig {
  common: ProCommonConfig
  locale: ProLocale

  table: ProTableConfig
  tree: ProTreeConfig
  search: ProSearchConfig
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

export interface ProSearchConfig {
  clearable: boolean
  clearIcon: string | VNode
  searchIcon: string | VNode
  overlayContainer?: PortalTargetType
}
