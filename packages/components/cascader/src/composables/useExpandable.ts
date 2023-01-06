/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Ref, ref } from 'vue'

import { isNil } from 'lodash-es'

import { type VKey, callEmit, useControlledProp } from '@idux/cdk/utils'
import { type GetKeyFn } from '@idux/components/utils'

import { type CascaderData, type CascaderProps } from '../types'
import { callChange, getParentKeys } from '../utils'
import { type MergedData, convertMergedData, convertMergedDataMap } from './useDataSource'

export interface ExpandableContext {
  expandedKeys: ComputedRef<VKey[]>
  setExpandedKeys: (value: VKey[]) => void
  handleExpand: (key: VKey) => void
  loadingKeys: Ref<VKey[]>
}

export function useExpandable(
  props: CascaderProps,
  mergedGetKey: ComputedRef<GetKeyFn>,
  mergedChildrenKey: ComputedRef<string>,
  mergedLabelKey: ComputedRef<string>,
  mergedFullPath: ComputedRef<boolean>,
  mergedDataMap: ComputedRef<Map<VKey, MergedData>>,
  selectedKeys: ComputedRef<VKey[]>,
): ExpandableContext {
  const getDefaultExpandedKeys = (firstSelectedKey: VKey) => {
    if (isNil(firstSelectedKey)) {
      return []
    }
    const dataMap = mergedDataMap.value
    const currData = dataMap.get(firstSelectedKey)
    return getParentKeys(dataMap, currData, false)
  }
  const [expandedKeys, setExpandedKeys] = useControlledProp(props, 'expandedKeys', () =>
    getDefaultExpandedKeys(selectedKeys.value[0]),
  )
  const [loadedKeys, setLoadedKeys] = useControlledProp(props, 'loadedKeys', () => [])
  const loadingKeys = ref<VKey[]>([])

  const handleExpand = async (key: VKey) => {
    const { loadChildren } = props
    if (loadingKeys.value.includes(key)) {
      return
    }
    const dataMap = mergedDataMap.value
    const currData = dataMap.get(key)
    if (currData && (!currData.children || currData.children.length === 0)) {
      if (!loadChildren || loadedKeys.value.includes(key)) {
        return
      }

      loadingKeys.value.push(key)
      const rawData = currData.rawData
      const rawChildren = await loadChildren(rawData)
      loadingKeys.value.splice(loadingKeys.value.indexOf(key), 1)
      const dataMap = mergedDataMap.value
      if (rawChildren.length) {
        const childrenKey = mergedChildrenKey.value
        const mergedChildren = convertMergedData(
          props,
          mergedGetKey.value,
          childrenKey,
          mergedLabelKey.value,
          mergedFullPath.value,
          rawChildren,
          key,
          currData.label,
        )
        convertMergedDataMap(dataMap, mergedChildren)
        currData.rawData[childrenKey] = rawChildren
        currData.children = mergedChildren
        const newLoadedKeys = [...loadedKeys.value, key]
        setLoadedKeys(newLoadedKeys)
        callEmit(props.onLoaded, newLoadedKeys, rawData)
      } else {
        return
      }
    }

    const currIndex = expandedKeys.value.indexOf(key)
    const currExpanded = currIndex >= 0

    if (!currExpanded) {
      const dataMap = mergedDataMap.value
      const newKeys = getParentKeys(dataMap, dataMap.get(key), false)
      newKeys.push(key)
      handleChange(newKeys, !currExpanded, currData!.rawData)
    }
  }

  const handleChange = (newKeys: VKey[], newExpanded: boolean, rawData: CascaderData) => {
    setExpandedKeys(newKeys)

    const { onExpand, onExpandedChange } = props
    callEmit(onExpand, newExpanded, rawData)
    callChange(mergedDataMap, newKeys, onExpandedChange)
  }

  return { expandedKeys, setExpandedKeys, handleExpand, loadingKeys }
}
