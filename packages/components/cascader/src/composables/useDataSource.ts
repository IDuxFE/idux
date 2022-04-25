/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { isNil } from 'lodash-es'

import { type VKey } from '@idux/cdk/utils'
import { type GetKeyFn } from '@idux/components/utils'

import { type CascaderData, type CascaderProps } from '../types'

export interface MergedData {
  children?: MergedData[]
  key: VKey
  isLeaf: boolean
  label: string
  parentKey?: VKey
  rawData: CascaderData
}

export interface DataSourceContext {
  mergedData: ComputedRef<MergedData[]>
  mergedDataMap: ComputedRef<Map<VKey, MergedData>>
}

export function useDataSource(
  props: CascaderProps,
  mergedGetKey: ComputedRef<GetKeyFn>,
  mergedChildrenKey: ComputedRef<string>,
  mergedLabelKey: ComputedRef<string>,
  mergedFullPath: ComputedRef<boolean>,
): DataSourceContext {
  const mergedData = computed(() => {
    return convertMergedData(
      props,
      mergedGetKey.value,
      mergedChildrenKey.value,
      mergedLabelKey.value,
      mergedFullPath.value,
      props.dataSource,
    )
  })

  const mergedDataMap = computed(() => {
    const map = new Map<VKey, MergedData>()
    convertMergedDataMap(map, mergedData.value)
    return map
  })

  return { mergedData, mergedDataMap }
}

export function convertMergedData(
  props: CascaderProps,
  getKey: GetKeyFn,
  childrenKey: string,
  labelKey: string,
  fullPath: boolean,
  data: CascaderData[],
  parentKey?: VKey,
  parentLabel?: string,
): MergedData[] {
  const { loadChildren } = props
  return data.map(item =>
    convertMergedItem(item, getKey, childrenKey, labelKey, fullPath, !!loadChildren, parentKey, parentLabel),
  )
}

function convertMergedItem(
  rawData: CascaderData,
  getKey: GetKeyFn,
  childrenKey: string,
  labelKey: string,
  fullPath: boolean,
  hasLoad: boolean,
  parentKey?: VKey,
  parentLabel?: string,
): MergedData {
  const key = getKey(rawData)
  const label = (fullPath && !isNil(parentLabel) ? `${parentLabel}/${rawData[labelKey]}` : rawData[labelKey]) as string
  const subData = rawData[childrenKey] as CascaderData[] | undefined
  const children = subData?.map(item =>
    convertMergedItem(item, getKey, childrenKey, labelKey, fullPath, hasLoad, key, label),
  )
  return {
    children,
    key,
    isLeaf: rawData.isLeaf ?? !(children?.length || hasLoad),
    label,
    parentKey,
    rawData,
  }
}

export function convertMergedDataMap(map: Map<VKey, MergedData>, data: MergedData[]): void {
  data.forEach(item => {
    const { key, children } = item
    map.set(key, item)
    if (children) {
      convertMergedDataMap(map, children)
    }
  })
}
