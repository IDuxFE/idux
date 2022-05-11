/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CommonConfig, GlobalConfig, ProTree } from './types'

import { zhCN } from '@idux/pro/locales'

const common: CommonConfig = { prefixCls: 'ix-pro' }

const proTree: ProTree = {
  clearIcon: 'close-circle',
  collapseIcon: ['collapse', 'uncollapse'],
}

export const defaultConfig: GlobalConfig = {
  common,
  locale: zhCN,

  proTree,
}
