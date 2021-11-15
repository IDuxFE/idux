/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VKey } from '@idux/cdk/utils'

import { getCurrentInstance } from 'vue'

export function useKey(): VKey {
  const { vnode, uid } = getCurrentInstance()!
  return vnode.key ?? uid
}
