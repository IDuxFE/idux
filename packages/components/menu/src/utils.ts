/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IconParams } from './types'
import type { VNode } from 'vue'

import { h } from 'vue'

import { isString } from 'lodash-es'

import { IxIcon } from '@idux/components/icon'

export function getIconNode({ slotCfg, propCfg }: IconParams): VNode | undefined {
  if (slotCfg) {
    return slotCfg()
  }
  if (propCfg) {
    if (isString(propCfg)) {
      return h(IxIcon, { name: propCfg })
    }
    return propCfg
  }
}
