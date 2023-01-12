/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, toRaw } from 'vue'

import { isNil } from 'lodash-es'

import { type FormAccessor } from '@idux/cdk/forms'
import { NoopArray, type VKey, callEmit, convertArray } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import { type MergedData } from './useDataSource'
import { type CascaderProps, type CascaderStrategy } from '../types'
import { getChildrenKeys, getParentKeys } from '../utils'

export interface SelectedStateContext {
  selectedKeys: ComputedRef<VKey[]>
  selectedLimit: ComputedRef<boolean>
  selectedLimitTitle: ComputedRef<string>
  selectedData: ComputedRef<MergedData[]>
  selectedWithStrategyKeys: ComputedRef<VKey[]>
  indeterminateKeys: ComputedRef<VKey[]>
  handleSelect: (key: VKey) => void
  handleClear: (evt: MouseEvent) => void
}

export function useSelectedState(
  props: CascaderProps,
  accessor: FormAccessor,
  mergedDataMap: ComputedRef<Map<VKey, MergedData>>,
  mergedFullPath: ComputedRef<boolean>,
): SelectedStateContext {
  const locale = useGlobalConfig('locale')
  const selectedKeys = computed(() => {
    const tempKeys = convertArray(accessor.value)
    if (!mergedFullPath.value) {
      return tempKeys
    }
    // 单选直接拿最后一个值最为选中的 key
    if (!props.multiple) {
      const lastKey = tempKeys[tempKeys.length - 1]
      return isNil(lastKey) ? [] : [lastKey]
    }
    // 多选时 tempKeys 应该是一个二维数组，然后拿第二层的最后一个元素作为 key
    return tempKeys.map(keys => keys[keys.length - 1]).filter(key => !isNil(key))
  })
  const selectedLimit = computed(() => selectedKeys.value.length >= props.multipleLimit)
  const selectedLimitTitle = computed(() => {
    if (!selectedLimit.value) {
      return ''
    }
    return locale.select.limitMessage.replace('${0}', `${props.multipleLimit}`)
  })

  const selectedData = computed(() => {
    const dataMap = mergedDataMap.value
    return selectedKeys.value.map(key => dataMap.get(key)!).filter(Boolean)
  })
  const strategyEnabled = computed(() => props.multiple && props.strategy !== 'off')
  const selectedWithStrategyKeys = computed(() => {
    return strategyEnabled.value ? getCascadedKeys(mergedDataMap.value, selectedKeys.value) : selectedKeys.value
  })

  const indeterminateKeys = computed(() => {
    if (!strategyEnabled.value) {
      return NoopArray as unknown as VKey[]
    }
    const indeterminateKeySet = new Set<VKey>()
    const cascadedKeys = selectedWithStrategyKeys.value
    const dataMap = mergedDataMap.value
    cascadedKeys.forEach(key => {
      let currData = dataMap.get(key)
      while (currData && !isNil(currData.parentKey)) {
        const parentKey = currData.parentKey
        const parent = dataMap.get(parentKey)
        if (parent && !parent.rawData.disabled && !cascadedKeys.includes(parentKey)) {
          indeterminateKeySet.add(parentKey)
        }
        currData = parent
      }
    })
    return [...indeterminateKeySet]
  })

  const setValue = (keys: VKey[]) => {
    let currValue: VKey | VKey[] | VKey[][]

    if (!mergedFullPath.value) {
      currValue = props.multiple ? keys : keys[0]
    } else {
      if (!props.multiple) {
        const currKey = keys[0]
        const dataMap = mergedDataMap.value
        currValue = getParentKeys(dataMap, dataMap.get(currKey), true)
        currValue.push(currKey)
      } else {
        const dataMap = mergedDataMap.value
        currValue = keys.map(currKey => {
          const parentKeys = getParentKeys(dataMap, dataMap.get(currKey), true)
          parentKeys.push(currKey)
          return parentKeys
        })
      }
    }

    const oldValue = toRaw(accessor.value)
    if (currValue !== oldValue) {
      accessor.setValue(currValue)
      callEmit(props.onChange, currValue, oldValue)
    }
  }

  const handleSelect = (key: VKey) => {
    const { multiple } = props
    const cascadedKeys = selectedWithStrategyKeys.value
    const currIndex = cascadedKeys.indexOf(key)
    const isSelected = currIndex > -1

    if (!multiple) {
      !isSelected && setValue([key])
      return
    }

    const dataMap = mergedDataMap.value
    const currData = dataMap.get(key)
    const _strategyEnabled = strategyEnabled.value
    const childrenKeys = _strategyEnabled ? getChildrenKeys(currData, true) : []
    const keySet = new Set(cascadedKeys)

    if (
      isSelected ||
      (childrenKeys.length > 0 && childrenKeys.every(key => keySet.has(key) || indeterminateKeys.value.includes(key)))
    ) {
      keySet.delete(key)
      if (_strategyEnabled) {
        getParentKeys(dataMap, currData, true).forEach(key => keySet.delete(key))
        childrenKeys.forEach(key => keySet.delete(key))
      }
    } else {
      keySet.add(key)
      if (_strategyEnabled) {
        setParentChecked(dataMap, currData, keySet)
        childrenKeys.forEach(key => keySet.add(key))
      }
    }
    setValue([...getCascadedKeysByStrategy(dataMap, keySet, props.strategy)])
  }

  const handleClear = (evt: MouseEvent) => {
    evt.stopPropagation()
    setValue([])
    callEmit(props.onClear, evt)
  }

  return {
    selectedKeys,
    selectedLimit,
    selectedLimitTitle,
    selectedData,
    selectedWithStrategyKeys,
    indeterminateKeys,
    handleSelect,

    handleClear,
  }
}

/**
 * 根据当前选中的 keys 来获取对应级联关系的 keys
 * 只是看是否开启级联
 */
function getCascadedKeys(dataMap: Map<VKey, MergedData>, checkedKys: VKey[]) {
  const keySet = new Set(checkedKys)
  let lastParentKey: VKey

  checkedKys.forEach(checkedKey => {
    const currData = dataMap.get(checkedKey)
    if (!currData) {
      return
    }
    const { parentKey } = currData
    const childrenKeys = getChildrenKeys(currData, true)
    childrenKeys.forEach(key => keySet.add(key))
    if (parentKey && lastParentKey !== parentKey) {
      setParentChecked(dataMap, currData, keySet)
      lastParentKey = parentKey
    }
  })

  return [...keySet]
}

function setParentChecked(dataMap: Map<VKey, MergedData>, currData: MergedData | undefined, keySet: Set<VKey>) {
  let parentSelected = true
  while (parentSelected && currData && !isNil(currData.parentKey)) {
    const parentKey = currData.parentKey
    const parent = dataMap.get(parentKey)
    if (parent && !currData.rawData.disabled) {
      parentSelected = parent.children!.every(item => item.rawData.disabled || keySet.has(item.key))
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
