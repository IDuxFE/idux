/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { isString } from 'lodash-es'

import { Logger, type VKey } from '@idux/cdk/utils'
import { type TableConfig } from '@idux/components/config'

import { type TableProps } from '../types'

export type GetRowKey = (record: unknown) => VKey
/**
 * @deprecated please use `useGetKey` instead
 */
export function useGetRowKey(props: TableProps, config: TableConfig): ComputedRef<GetRowKey> {
  return computed(() => {
    const getKey = props.rowKey || props.getKey || config.rowKey || config.getKey
    if (isString(getKey)) {
      return (record: unknown) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const key = (record as any)[getKey]
        if (__DEV__ && key === undefined) {
          Logger.warn('components/table', 'Each record in table should have a unique `key` prop.')
        }
        return key
      }
    }
    return getKey
  })
}
