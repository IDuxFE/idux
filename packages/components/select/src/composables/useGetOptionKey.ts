/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SelectData, SelectPanelProps, SelectProps } from '../types'
import type { SelectConfig } from '@idux/components/config'

import { type ComputedRef, computed } from 'vue'

import { isString } from 'lodash-es'

import { Logger, type VKey } from '@idux/cdk/utils'

export type GetKeyFn = (data: SelectData) => VKey

export function useGetOptionKey(props: SelectProps, config: SelectConfig): ComputedRef<GetKeyFn> {
  return computed(() => genGetKeyFn(props.labelKey, props.valueKey || props.getKey || config.valueKey || config.getKey))
}

export function usePanelGetOptionKey(props: SelectPanelProps, config: SelectConfig): ComputedRef<GetKeyFn> {
  return computed(() => genGetKeyFn(props.labelKey, props.getKey || config.valueKey || config.getKey))
}

/**
 * @deprecated please use `useGetKey` instead
 */
function genGetKeyFn(labelKey: string | undefined, getKeyFn: string | ((data: SelectData) => VKey) | undefined) {
  /* eslint-disable indent */
  return isString(getKeyFn)
    ? (record: SelectData) => {
        // value 是为了兼容之前的版本
        /* eslint-disable @typescript-eslint/no-explicit-any */
        let key = record[getKeyFn]
        if (labelKey !== 'value' && (record as any)['value']) {
          key = (record as any)['value']
        }
        /* eslint-enable @typescript-eslint/no-explicit-any */
        if (__DEV__ && key === undefined) {
          Logger.warn('components/select', 'Each record in dataSource should have a unique `key` prop.')
        }
        return key
      }
    : (record: SelectData) => getKeyFn?.(record)
  /* eslint-enable indent */
}
