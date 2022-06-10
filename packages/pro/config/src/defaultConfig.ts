/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { zhCN } from '@idux/pro/locales'

import { type ProGlobalConfig } from './types'

export const defaultConfig: ProGlobalConfig = {
  common: { prefixCls: 'ix-pro' },
  locale: zhCN,

  table: {
    columnIndexable: {
      align: 'center',
      customCell: ({ rowIndex }) => rowIndex,
    },
    toolbar: ['layout'],
  },
  tree: {
    clearIcon: 'close-circle',
    collapseIcon: ['collapse', 'uncollapse'],
  },
}
