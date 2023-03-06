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
      code: { esm: true },
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
    layoutTool: {
      changeSize: false,
      resetable: false,
      searchable: false,
    },
  },
  tree: {
    clearIcon: 'close-circle',
    collapseIcon: ['collapse', 'uncollapse'],
  },
  textarea: {
    clearable: false,
    clearIcon: 'close-circle',
    resize: 'none',
    size: 'md',
    showCount: false,
    trim: false,
  },
  search: {
    clearable: true,
    clearIcon: 'close-circle',
    searchIcon: 'search',
  },
}
