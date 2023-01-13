/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef } from 'vue'

import { isNil } from 'lodash-es'

import { type MaybeArray, type VKey, callEmit } from '@idux/cdk/utils'
import { GetDisabledFn } from '@idux/components/utils'

import { type MergedData } from '../composables/useDataSource'
import { type CascaderData } from '../types'

export function callChange(
  mergedDataMap: ComputedRef<Map<VKey, MergedData>>,
  newKeys: VKey[],
  onChange?: MaybeArray<(keys: VKey[], datas: CascaderData[]) => void>,
): void {
  if (onChange) {
    const data: CascaderData[] = []
    const dataMap = mergedDataMap.value
    newKeys.forEach(key => {
      const currData = dataMap.get(key)
      currData && data.push(currData.rawData)
    })
    callEmit(onChange, newKeys, data)
  }
}

export function getChildrenKeys(
  currData: MergedData | undefined,
  filterDisabled: boolean,
  getDisabledFn: GetDisabledFn,
): VKey[] {
  if (!currData || !currData.children) {
    return []
  }
  const keys: VKey[] = []
  currData.children.forEach(item => {
    const { key, rawData } = item
    if (!filterDisabled || !getDisabledFn(rawData)) {
      keys.push(key)
      keys.push(...getChildrenKeys(item, filterDisabled, getDisabledFn))
    }
  })
  return keys
}

export function getParentKeys(
  dataMap: Map<VKey, MergedData>,
  currData: MergedData | undefined,
  filterDisabled: boolean,
  getDisabledFn: GetDisabledFn,
): VKey[] {
  const keys: VKey[] = []
  while (currData && !isNil(currData.parentKey)) {
    const { parentKey, rawData } = currData
    if (!filterDisabled || !getDisabledFn(rawData)) {
      // 保证父组件的顺序
      keys.unshift(parentKey)
      currData = dataMap.get(parentKey)
    } else {
      currData = undefined
    }
  }
  return keys
}
