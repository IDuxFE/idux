/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { isString } from 'lodash-es'

import { Logger, type VKey } from '@idux/cdk/utils'
import { type SelectConfig } from '@idux/components/config'

import { type SelectData, type SelectProps } from '../types'

export type GetKeyFn = (data: SelectData) => VKey
/**
 * @deprecated please use `useGetKey` instead
 */
export function useGetOptionKey(props: SelectProps, config: SelectConfig): ComputedRef<GetKeyFn> {
  return computed(() => {
    const getKey = props.valueKey || props.getKey || config.valueKey || config.getKey
    if (isString(getKey)) {
      return (record: unknown) => {
        // value 是为了兼容之前的版本
        /* eslint-disable @typescript-eslint/no-explicit-any */
        let key = (record as any)[getKey]
        if (props.labelKey !== 'value' && (record as any)['value']) {
          key = (record as any)['value']
        }
        /* eslint-enable @typescript-eslint/no-explicit-any */
        if (__DEV__ && key === undefined) {
          Logger.warn('components/select', 'Each record in dataSource should have a unique `key` prop.')
        }
        return key
      }
    }
    return getKey
  })
}
