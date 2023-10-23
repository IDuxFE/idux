/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type VNodeChild, h } from 'vue'

import { IxIcon } from '@idux/components/icon'

import { type DeepPartialGlobalConfig } from './globalConfig'

const expandIconRenderer = ({ expanded }: { expanded: boolean }): VNodeChild =>
  h('svg', { viewBox: '0 0 16 16', width: '14px', height: '14px' }, [
    h('rect', { x: 1, y: 1, width: 16, height: 16, rx: 1, fill: '#EDF1F7' }),
    h('rect', { x: 6, y: 8, width: 6, height: 2, rx: 0.2, fill: '#5E6573' }),
    !expanded ? h('rect', { x: 8, y: 6, width: 2, height: 6, rx: 0.2, fill: '#5E6573' }) : null,
  ])

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
  card: {
    size: 'sm',
  },
  menu: {
    offset: [0, 4],
  },
  modal: {
    maskClosable: false,
    centered: true,
  },
  pagination: {
    size: 'sm',
  },
  progress: {
    strokeLinecap: 'square',
  },
  stepper: {
    size: 'sm',
  },
  table: {
    columnExpandable: {
      icon: expandIconRenderer,
    },
  },
  timePicker: {
    allowInput: true,
  },
  tree: {
    expandIcon: expandIconRenderer,
  },
  text: {
    copyIcon: ({ copied }) =>
      h(IxIcon, { name: !copied ? 'copy' : 'check-circle-filled', style: copied ? { color: '#20CC94' } : undefined }),
  },
}
