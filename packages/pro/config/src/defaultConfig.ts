/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CommonConfig, GlobalConfig, ProTree } from './types'

const common: CommonConfig = { prefixCls: 'ix-pro' }

const proTree: ProTree = {
  clearIcon: 'close-circle',
  expandIcon: ['minus-square', 'plus-square'],
}

export const defaultConfig: GlobalConfig = {
  common,
  proTree,
}
