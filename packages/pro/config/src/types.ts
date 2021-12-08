/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

// Common
export interface CommonConfig {
  prefixCls: string
}

export interface GlobalConfig {
  // Common
  common: CommonConfig
}

export type GlobalConfigKey = keyof GlobalConfig
