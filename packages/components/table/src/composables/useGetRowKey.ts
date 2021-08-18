import type { ComputedRef } from 'vue'
import type { TableConfig } from '@idux/components/config'
import type { TableProps } from '../types'

import { computed } from 'vue'
import { isString } from 'lodash-es'
import { Logger } from '@idux/cdk/utils'

export type GetRowKey = (record: unknown) => string | number

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
