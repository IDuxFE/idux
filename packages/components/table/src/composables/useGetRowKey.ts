/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Key, TableProps } from '../types'
import type { TableConfig } from '@idux/components/config'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

import { isString } from 'lodash-es'

import { Logger } from '@idux/cdk/utils'

export type GetRowKey = (record: unknown) => Key

export function useGetRowKey(props: TableProps, config: TableConfig): ComputedRef<GetRowKey> {
  return computed(() => {
    const rowKey = props.rowKey ?? config.rowKey
    if (isString(rowKey)) {
      return (record: unknown) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const key = (record as any)[rowKey]
        if (__DEV__ && key === undefined) {
          Logger.warn('components/table', 'Each record in table should have a unique `key` prop.')
        }
        return key
      }
    }
    return rowKey
  })
}
