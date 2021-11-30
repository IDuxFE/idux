/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { LayoutProModeTypes, LayoutProThemes } from '@idux/pro/layout'

// Common
export interface CommonConfig {
  prefixCls: string
}

// Layout
export interface LayoutProConfig {
  mode: LayoutProModeTypes
  theme: LayoutProThemes
  indent: number
  fixed: boolean
}

// --- end ---

export interface GlobalConfig {
  // Common
  common: CommonConfig
  layout: LayoutProConfig
  // --- end ---
}

export type GlobalConfigKey = keyof GlobalConfig
