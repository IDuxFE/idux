/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Ref, computed } from 'vue'

import { type VKey, useState } from '@idux/cdk/utils'

import { type MergedData } from './useDataSource'

export interface ActiveStateContext {
  activeKey: Ref<VKey | undefined>
  activeData: ComputedRef<MergedData | undefined>
  setActiveKey: (key: VKey) => void
}

export function useActiveState(mergedDataMap: ComputedRef<Map<VKey, MergedData>>): ActiveStateContext {
  const [activeKey, setActiveKey] = useState<VKey | undefined>(undefined)

  const activeData = computed(() => {
    const currKey = activeKey.value
    return currKey !== undefined ? mergedDataMap.value.get(currKey) : undefined
  })

  return { activeKey, activeData, setActiveKey }
}
