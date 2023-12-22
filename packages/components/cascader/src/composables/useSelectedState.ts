/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Ref, computed, toRaw } from 'vue'

import { isNil } from 'lodash-es'

import { NoopArray, type VKey, convertArray } from '@idux/cdk/utils'
import { type GetDisabledFn } from '@idux/components/utils'

import { type MergedData } from './useDataSource'
import { type CascaderStrategy } from '../types'
import { getChildrenKeys, getParentKeys } from '../utils'

export interface SelectedStateContext {
  resolvedSelectedKeys: ComputedRef<VKey[]>
  selectedWithStrategyKeys: ComputedRef<VKey[]>
  strategyEnabled: ComputedRef<boolean>
  handleSelect: (key: VKey) => void
  setValue: (keys: VKey[]) => void
}

export function useSelectedState(
  mergedDataMap: ComputedRef<Map<VKey, MergedData>>,
  mergedFullPath: ComputedRef<boolean>,
  mergedGetDisabled: ComputedRef<GetDisabledFn>,
  multiple: Ref<boolean>,
  strategy: Ref<CascaderStrategy>,
  selectedKeys: Ref<VKey | VKey[] | VKey[][]>,
  setSelectedKeys: (keys: VKey | VKey[] | VKey[][]) => void,
): SelectedStateContext {
  const resolvedSelectedKeys = computed(() => {
    const tempKeys = convertArray<VKey | VKey[]>(selectedKeys.value)
    if (!mergedFullPath.value) {
      return tempKeys as VKey[]
    }
    // 单选直接拿最后一个值最为选中的 key
    if (!multiple.value) {
      const lastKey = tempKeys[tempKeys.length - 1] as VKey
      return isNil(lastKey) ? [] : [lastKey]
    }
    // 多选时 tempKeys 应该是一个二维数组，然后拿第二层的最后一个元素作为 key
    return (tempKeys as VKey[][]).map(keys => keys[keys.length - 1]).filter(key => !isNil(key)) as VKey[]
  })

  const strategyEnabled = computed(() => multiple.value && strategy.value !== 'off')
  const selectedWithStrategyKeys = computed(() => {
    return strategyEnabled.value
      ? getCascadedKeys(mergedDataMap.value, resolvedSelectedKeys.value, mergedGetDisabled.value)
      : resolvedSelectedKeys.value
  })

  const indeterminateKeys = computed(() => {
    if (!strategyEnabled.value) {
      return NoopArray as unknown as VKey[]
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

  const getFullPath = (currKey: VKey) => {
    const getDisabledFn = mergedGetDisabled.value
    const dataMap = mergedDataMap.value
    const fullPath = getParentKeys(dataMap, dataMap.get(currKey), true, getDisabledFn)
    fullPath.push(currKey)
    return fullPath
  }

  const getCurrValue = (keys: VKey[]) => {
    if (!mergedFullPath.value) {
      return multiple.value ? keys : keys[0]
    }
    if (keys.length === 0) {
      return keys
    }
    if (multiple.value) {
      return keys.map(getFullPath)
    } else {
      return getFullPath(keys[0])
    }
  }

  const setValue = (keys: VKey[]) => {
    const currValue = getCurrValue(keys)
    const oldValue = toRaw(selectedKeys.value)
    if (currValue !== oldValue) {
      setSelectedKeys(currValue)
    }
  }

  const handleSelect = (key: VKey) => {
    const cascadedKeys = selectedWithStrategyKeys.value
    const currIndex = cascadedKeys.indexOf(key)
    const isSelected = currIndex > -1

    if (!multiple.value) {
      !isSelected && setValue([key])
      return
    }

    const dataMap = mergedDataMap.value
    const currData = dataMap.get(key)
    const _strategyEnabled = strategyEnabled.value
    const getDisabledFn = mergedGetDisabled.value
    const childrenKeys = _strategyEnabled ? getChildrenKeys(currData, true, getDisabledFn) : []
    const keySet = new Set(cascadedKeys)

    if (
      isSelected ||
      (childrenKeys.length > 0 && childrenKeys.every(key => keySet.has(key) || indeterminateKeys.value.includes(key)))
    ) {
      keySet.delete(key)
      if (_strategyEnabled) {
        getParentKeys(dataMap, currData, true, getDisabledFn).forEach(key => keySet.delete(key))
        childrenKeys.forEach(key => keySet.delete(key))
      }
    } else {
      keySet.add(key)
      if (_strategyEnabled) {
        setParentChecked(dataMap, currData, keySet, getDisabledFn)
        childrenKeys.forEach(key => keySet.add(key))
      }
    }
    setValue([...getCascadedKeysByStrategy(dataMap, keySet, strategy.value)])
  }

  return {
    resolvedSelectedKeys,
    selectedWithStrategyKeys,
    strategyEnabled,
    handleSelect,
    setValue,
  }
}

/**
 * 根据当前选中的 keys 来获取对应级联关系的 keys
 * 只是看是否开启级联
 */
function getCascadedKeys(dataMap: Map<VKey, MergedData>, checkedKys: VKey[], getDisabledFn: GetDisabledFn) {
  const keySet = new Set(checkedKys)
  let lastParentKey: VKey

  checkedKys.forEach(checkedKey => {
    const currData = dataMap.get(checkedKey)
    if (!currData) {
      return
    }
    const { parentKey } = currData
    const childrenKeys = getChildrenKeys(currData, true, getDisabledFn)
    childrenKeys.forEach(key => keySet.add(key))
    if (parentKey && lastParentKey !== parentKey) {
      setParentChecked(dataMap, currData, keySet, getDisabledFn)
      lastParentKey = parentKey
    }
  })

  return [...keySet]
}

function setParentChecked(
  dataMap: Map<VKey, MergedData>,
  currData: MergedData | undefined,
  keySet: Set<VKey>,
  getDisabledFn: GetDisabledFn,
) {
  let parentSelected = true
  while (parentSelected && currData && !isNil(currData.parentKey)) {
    const parentKey = currData.parentKey
    const parent = dataMap.get(parentKey)
    if (parent && !getDisabledFn(currData.rawData)) {
      parentSelected = parent.children!.every(item => getDisabledFn(item.rawData) || keySet.has(item.key))
      parentSelected && keySet.add(currData.parentKey)
    }
    currData = parent
  }
}

/**
 * 根据当前选中的 keys 来获取对应级联关系的 keys
 * 需要根据不同的级联策略，做不同的处理
 */
function getCascadedKeysByStrategy(dataMap: Map<VKey, MergedData>, ketSet: Set<VKey>, strategy: CascaderStrategy) {
  if (strategy === 'parent') {
    const newSet = new Set<VKey>()
    ketSet.forEach(checkedKey => {
      const currData = dataMap.get(checkedKey)
      if (currData) {
        const { key: selfKey, parentKey } = currData
        if (!parentKey || !ketSet.has(parentKey)) {
          newSet.add(selfKey)
        }
      }
    })
    return newSet
  }

  if (strategy === 'child') {
    const newSet = new Set<VKey>()
    ketSet.forEach(checkedKey => {
      const currData = dataMap.get(checkedKey)
      if (currData && currData.isLeaf) {
        newSet.add(currData.key)
      }
    })
    return newSet
  }

  return ketSet
}
