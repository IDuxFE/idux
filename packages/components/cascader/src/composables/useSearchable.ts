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
import { type CascaderData, type CascaderPanelProps, type CascaderSearchFn } from '../types'

export interface SearchableContext {
  searchedData: ComputedRef<MergedData[]>
}

export function useSearchable(
  props: CascaderPanelProps,
  mergedData: ComputedRef<MergedData[]>,
  mergedDataMap: ComputedRef<Map<VKey, MergedData>>,
  mergedLabelKey: ComputedRef<string>,
  mergedGetDisabled: ComputedRef<GetDisabledFn>,
): SearchableContext {
  const mergedSearchFn = useSearchFn(props, mergedLabelKey)
  const parentEnabled = computed(() => props.multiple || props.strategy === 'off')

  const searchedKeys = computed(() => {
    const searchValue = props.searchValue
    const searchFn = mergedSearchFn.value
    if (!searchValue) {
      return NoopArray as VKey[]
    }
    const _parentEnabled = parentEnabled.value
    const getDisabledFn = mergedGetDisabled.value
    const keySet = new Set<VKey>()
    mergedData.value.forEach(data => doSearch(keySet, data, searchFn, searchValue, _parentEnabled, getDisabledFn))
    return [...keySet]
  })

  const searchedData = computed(() => {
    const dataMap = mergedDataMap.value
    return searchedKeys.value.map(key => dataMap.get(key)!).filter(Boolean)
  })

  return { searchedData }
}

function useSearchFn(props: CascaderPanelProps, mergedLabelKey: ComputedRef<string>) {
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

function doSearch(
  keySet: Set<VKey>,
  data: MergedData,
  searchFn: CascaderSearchFn | false,
  searchValue: string,
  _parentEnabled: boolean,
  getDisabledFn: GetDisabledFn,
) {
  const { key, rawData } = data
  if (keySet.has(key) || getDisabledFn(rawData)) {
    return
  }
  if (searchFn === false || searchFn(rawData, searchValue)) {
    if (_parentEnabled || data.isLeaf) {
      keySet.add(key)
    }
    processChildren(keySet, data, _parentEnabled, getDisabledFn)
  } else if (data.children) {
    data.children.forEach(child => doSearch(keySet, child, searchFn, searchValue, _parentEnabled, getDisabledFn))
  }
}

function processChildren(keySet: Set<VKey>, data: MergedData, parentEnabled: boolean, getDisabledFn: GetDisabledFn) {
  if (!data || !data.children) {
    return
  }

  data.children.forEach(child => {
    if (keySet.has(child.key) || getDisabledFn(child.rawData)) {
      return
    }

    if (parentEnabled || child.isLeaf) {
      keySet.add(child.key)
    }

    processChildren(keySet, child, parentEnabled, getDisabledFn)
  })
}
