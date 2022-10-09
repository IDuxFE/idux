/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { isString } from 'lodash-es'

import { Logger, type VKey } from '@idux/cdk/utils'

import { type VirtualScrollProps } from '../types'

export type GetKey = (item: unknown) => VKey

export function useGetKey(props: VirtualScrollProps): ComputedRef<GetKey> {
  return computed(() => {
    const getKey = props.getKey
    if (isString(getKey)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (item: any) => {
        const key = item[getKey]
        if (__DEV__ && key === undefined) {
          Logger.warn('cdk/scroll', 'Each item in dataSource should have a unique `key` prop.')
        }
        return key
      }
    }
    return getKey!
  })
}
