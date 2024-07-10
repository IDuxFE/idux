/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GetKey } from '../types'

import { type ComputedRef, type Ref, computed } from 'vue'

import { isString } from 'lodash-es'

import { Logger } from '@idux/cdk/utils'

export function useGetKey(getKey: Ref<GetKey | string | undefined> | undefined): ComputedRef<GetKey> {
  return computed(() => {
    const _getKey = getKey?.value
    if (isString(_getKey)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (item: any) => {
        const key = item[_getKey]
        if (__DEV__ && key === undefined) {
          Logger.warn('cdk/dnd', 'Each item in dataSource should have a unique `key` prop.')
        }
        return key
      }
    }
    return _getKey!
  })
}
