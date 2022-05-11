/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Locale } from '@idux/pro/locales'

// Common
export interface CommonConfig {
  prefixCls: string
}

export interface ProTree {
  clearIcon: string
  collapseIcon: [string, string]
}

export interface GlobalConfig {
  // Common
  common: CommonConfig
  locale: Locale

  proTree: ProTree
}

export type GlobalConfigKey = keyof GlobalConfig
