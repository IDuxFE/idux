/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CommonConfig, GlobalConfig, LayoutProConfig } from './types'

import { shallowReactive } from 'vue'

// --------------------- Common ---------------------
const common = shallowReactive<CommonConfig>({ prefixCls: 'ix' })

// --------------------- Layout ---------------------
const layout = shallowReactive<LayoutProConfig>({
  mode: 'sider',
  theme: 'light',
  indent: 24,
  fixed: true,
})

export const defaultConfig: GlobalConfig = {
  // Common
  common,

  // layout
  layout,
}
