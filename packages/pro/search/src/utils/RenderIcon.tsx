/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Slot, VNode, VNodeChild } from 'vue'

import { isString } from 'lodash-es'

import { IxIcon } from '@idux/components/icon'

export function renderIcon(icon: string | VNode, slot?: Slot): VNodeChild {
  if (slot) {
    return slot()
  }

  return isString(icon) ? <IxIcon name={icon} /> : icon
}
