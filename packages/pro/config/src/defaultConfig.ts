/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { IxInput } from '@idux/components/input'
import { type ProFormJsonSchema } from '@idux/pro/form'
import { zhCN } from '@idux/pro/locales'

import { type ProGlobalConfig } from './types'

export const defaultConfig: ProGlobalConfig = {
  common: { prefixCls: 'ix-pro' },
  locale: zhCN,
  form: {
    ajvOptions: {
      allErrors: true,
      loopEnum: 50,
    },
    autoId: true,
    autoLabelFor: true,
    formatComponents: {
      default: { component: IxInput },
    },
    ignoreKeywords: ['type', 'enum'],
    schemaFormatter: (fields, schema) => ({ fields: fields || {}, schema: schema || ({} as ProFormJsonSchema) }),
  },
  table: {
    columnIndexable: {
      align: 'center',
      customCell: ({ rowIndex }) => rowIndex,
    },
  },
  tree: {
    clearIcon: 'close-circle',
    collapseIcon: ['collapse', 'uncollapse'],
  },
  search: {
    clearable: true,
    clearIcon: 'close-circle',
    searchIcon: 'search',
  },
}
