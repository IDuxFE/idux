/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { isNil } from 'lodash-es'

import { NoopArray, type VKey } from '@idux/cdk/utils'
import { type GetDisabledFn } from '@idux/components/utils'

import { type MergedData } from './useDataSource'

export function useIndeterminateKeys(
  mergedDataMap: ComputedRef<Map<VKey, MergedData>>,
  selectedWithStrategyKeys: ComputedRef<VKey[]>,
  mergedGetDisabled: ComputedRef<GetDisabledFn>,
  strategyEnabled: ComputedRef<boolean>,
): ComputedRef<VKey[]> {
  return computed(() => {
    if (!strategyEnabled.value) {
      return NoopArray as VKey[]
    }
    const indeterminateKeySet = new Set<VKey>()
    const cascadedKeys = selectedWithStrategyKeys.value
    const dataMap = mergedDataMap.value
    const getDisabledFn = mergedGetDisabled.value
    cascadedKeys.forEach(key => {
      let currData = dataMap.get(key)
      while (currData && !isNil(currData.parentKey)) {
        const parentKey = currData.parentKey
        const parent = dataMap.get(parentKey)
        if (parent && !getDisabledFn(parent.rawData) && !cascadedKeys.includes(parentKey)) {
          indeterminateKeySet.add(parentKey)
        }
        currData = parent
      }
    })
    return [...indeterminateKeySet]
  })
}
