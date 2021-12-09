/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IconType } from './types'
import type { Slot, VNode } from 'vue'

import { h } from 'vue'

import { isString } from 'lodash-es'

import { IxIcon } from '@idux/components/icon'

export function getIconNode(slotCfg?: Slot, propCfg?: IconType): VNode | VNode[] | null {
  if (slotCfg) {
    return slotCfg()
  }
  if (propCfg) {
    if (isString(propCfg)) {
      return h(IxIcon, { name: propCfg })
    }
    return propCfg
  }
  return null
}
