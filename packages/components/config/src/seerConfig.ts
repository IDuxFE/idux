/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { h } from 'vue'

import { IxIcon } from '@idux/components/icon'

import { type DeepPartialGlobalConfig } from './globalConfig'

export const seerConfig: DeepPartialGlobalConfig = {
  common: {
    theme: 'seer',
  },
  button: {
    size: 'sm',
  },
  desc: {
    colonless: true,
    labelAlign: 'start',
  },
  form: {
    colonless: true,
    labelAlign: 'start',
  },
  menu: {
    offset: [0, 4],
  },
  modal: {
    centered: true,
    maskClosable: false,
  },
  progress: {
    strokeLinecap: 'square',
  },
  table: {
    columnExpandable: {
      icon: ({ expanded }) => h(IxIcon, { name: expanded ? 'minus-square' : 'plus-square' }),
    },
  },
}
