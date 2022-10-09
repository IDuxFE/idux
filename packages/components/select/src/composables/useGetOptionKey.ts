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

import { type SelectData, type SelectPanelProps, type SelectProps } from '../types'

export type GetKeyFn = (data: SelectData) => VKey

export function useGetOptionKey(props: SelectProps, config: SelectConfig): ComputedRef<GetKeyFn> {
  return computed(() => genGetKeyFn(props.labelKey || config.labelKey, props.getKey || config.getKey))
}

export function usePanelGetOptionKey(props: SelectPanelProps, config: SelectConfig): ComputedRef<GetKeyFn> {
  return computed(() => genGetKeyFn(props.labelKey || config.labelKey, props.getKey || config.getKey))
}

/**
 * @deprecated please use `useGetKey` instead
 */
function genGetKeyFn(labelKey: string, getKeyFn: string | ((data: SelectData) => VKey)) {
  /* eslint-disable indent */
  return isString(getKeyFn)
    ? (record: SelectData) => {
        let key = record[getKeyFn]
        // TODO: remove value, 为了兼容之前的版本,
        if (key === undefined && labelKey !== 'value') {
          key = record['value']
        }
        if (__DEV__ && key === undefined) {
          Logger.warn('components/select', 'Each record in dataSource should have a unique `key` prop.')
        }
        return key
      }
    : getKeyFn
}
