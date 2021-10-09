/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VirtualScrollProps } from '../types'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

import { isString } from 'lodash-es'

import { Logger } from '@idux/cdk/utils'

export type GetKey = (item: unknown) => string | number

export function useGetKey(props: VirtualScrollProps): ComputedRef<GetKey> {
  return computed(() => {
    const itemKey = props.itemKey
    if (isString(itemKey)) {
      return (item: unknown) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const key = (item as any)[itemKey]
        if (__DEV__ && key === undefined) {
          Logger.warn('cdk/scroll', 'Each item in data should have a unique `key` prop.')
        }
        return key
      }
    }
    return itemKey
  })
}
