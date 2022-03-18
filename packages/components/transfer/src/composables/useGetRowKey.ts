/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TransferData, TransferProps } from '../types'
import type { TransferConfig } from '@idux/components/config'

import { computed } from 'vue'

import { isString } from 'lodash-es'

import { Logger, type VKey } from '@idux/cdk/utils'

export type GetRowKey = (record: TransferData) => VKey

export function useGetRowKey(props: TransferProps, config: TransferConfig): GetRowKey {
  const getKey = computed(() => {
    const getKey = props.getKey ?? config.getKey
    if (isString(getKey)) {
      return (record: TransferData) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const key = (record as any)[getKey]
        if (__DEV__ && key === undefined) {
          Logger.warn('components/transfer', 'Each record in transfer should have a unique `key` prop.')
        }
        return key
      }
    }
    return getKey
  })

  return (record: TransferData) => getKey.value(record)
}
