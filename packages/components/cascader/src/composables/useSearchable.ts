/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { isFunction } from 'lodash-es'

import { NoopArray, type VKey } from '@idux/cdk/utils'
import { type GetDisabledFn } from '@idux/components/utils'

import { type MergedData } from './useDataSource'
import { type CascaderData, type CascaderProps, type CascaderSearchFn } from '../types'

export interface SearchableContext {
  searchedData: ComputedRef<MergedData[]>
}

export function useSearchable(
  props: CascaderProps,
  mergedLabelKey: ComputedRef<string>,
  mergedDataMap: ComputedRef<Map<VKey, MergedData>>,
  inputValue: ComputedRef<string>,
  mergedGetDisabled: ComputedRef<GetDisabledFn>,
): SearchableContext {
  const mergedSearchFn = useSearchFn(props, mergedLabelKey)
  const parentEnabled = computed(() => props.multiple || props.strategy === 'off')

  const searchedKeys = computed(() => {
    const searchValue = inputValue.value
    const searchFn = mergedSearchFn.value
    if (!searchValue || !searchFn) {
      return NoopArray as unknown as VKey[]
    }
    const _parentEnabled = parentEnabled.value
    const getDisabledFn = mergedGetDisabled.value
    const keySet = new Set<VKey>()
    mergedDataMap.value.forEach(data => {
      const { key, rawData } = data
      if (keySet.has(key)) {
        return
      }
      if (searchFn(rawData, searchValue)) {
        if (_parentEnabled || data.isLeaf) {
          keySet.add(key)
        }
        processChildren(keySet, data, _parentEnabled, getDisabledFn)
      }
    })
    return [...keySet]
  })

  const searchedData = computed(() => {
    const dataMap = mergedDataMap.value
    return searchedKeys.value.map(key => dataMap.get(key)!).filter(Boolean)
  })

  return { searchedData }
}

function useSearchFn(props: CascaderProps, mergedLabelKey: ComputedRef<string>) {
  return computed(() => {
    const searchFn = props.searchFn
    if (isFunction(searchFn)) {
      return searchFn
    }
    return searchFn ? getDefaultSearchFn(mergedLabelKey.value) : false
  })
}

function getDefaultSearchFn(labelKey: string): CascaderSearchFn {
  return (data: CascaderData, searchValue: string) => {
    const label = data[labelKey] as string | undefined
    return label ? label.toLowerCase().includes(searchValue.toLowerCase()) : false
  }
}

function processChildren(keySet: Set<VKey>, data: MergedData, parentEnabled: boolean, getDisabledFn: GetDisabledFn) {
  if (!data || !data.children) {
    return
  }

  data.children.forEach(child => {
    if (getDisabledFn(child.rawData) || keySet.has(child.key)) {
      return
    }

    if (parentEnabled || child.isLeaf) {
      keySet.add(child.key)
    }

    processChildren(keySet, child, parentEnabled, getDisabledFn)
  })
}
