/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { getCurrentInstance } from 'vue'

import { isSymbol } from 'lodash-es'

import { Logger } from '@idux/cdk/utils'

export function useKey(): string | number {
  const { vnode, uid } = getCurrentInstance()!
  let key = vnode.key ?? uid
  if (isSymbol(key)) {
    key = String(key)
    __DEV__ && Logger.warn('components/utils', `useKey not support Symbol`)
  }
  return key
}
