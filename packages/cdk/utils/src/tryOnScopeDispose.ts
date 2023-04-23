/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { getCurrentScope, onScopeDispose } from 'vue'

/**
 * Call onScopeDispose() if it's inside a effect scope lifecycle, if not, do nothing
 *
 * @param fn
 */
export function tryOnScopeDispose(fn: () => void): boolean {
  // https://github.com/vuejs/core/issues/6538
  // 导致跑 TEST 的时候，内存爆了，先关掉
  if (__TEST__ || !getCurrentScope()) {
    return false
  }

  onScopeDispose(fn)
  return true
}
