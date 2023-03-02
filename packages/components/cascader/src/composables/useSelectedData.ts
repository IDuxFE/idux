/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MergedData } from './useDataSource'
import type { VKey } from '@idux/cdk/utils'

import { type ComputedRef, computed } from 'vue'

export function useSelectedData(
  selectedKeys: ComputedRef<VKey[]>,
  mergedDataMap: ComputedRef<Map<VKey, MergedData>>,
): ComputedRef<(MergedData & { label: string })[]> {
  return computed(() => {
    const dataMap = mergedDataMap.value
    return selectedKeys.value.map(key => dataMap.get(key)!).filter(Boolean)
  })
}
