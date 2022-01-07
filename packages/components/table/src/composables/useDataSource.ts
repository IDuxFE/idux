/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Ref, computed } from 'vue'

import { type VKey } from '@idux/cdk/utils'

import { type TablePagination, type TableProps } from '../types'
import { type Filterable } from './useFilterable'
import { type GetRowKey } from './useGetRowKey'
import { type ActiveSortable } from './useSortable'

export function useDataSource(
  props: TableProps,
  getRowKey: ComputedRef<GetRowKey>,
  activeSortable: ActiveSortable,
  activeFilterables: ComputedRef<Filterable[]>,
  expandedRowKeys: Ref<VKey[]>,
  mergedPagination: ComputedRef<TablePagination | null>,
): DataSourceContext {
  const mergedData = computed(() => {
    const { dataSource, childrenKey } = props
    const getKey = getRowKey.value
    return dataSource.map(record => covertMergeData(record, getKey, childrenKey))
  })

  const mergedMap = computed(() => {
    const map = new Map<VKey, MergedData>()
    covertDataMap(mergedData.value, map)
    return map
  })

  const filteredData = computed(() => filterData(mergedData.value, activeFilterables.value))
  const sortedData = computed(() => {
    const { sorter, orderBy } = activeSortable
    if (sorter && orderBy) {
      return sortData(filteredData.value, sorter, orderBy)
    }

    return filteredData.value
  })
  const paginatedData = computed(() => {
    const pagination = mergedPagination.value
    const data = sortedData.value
    if (pagination === null || !pagination.pageSize) {
      return data
    } else {
      const { total } = pagination
      if (total && data.length < total) {
        return data
      }
      const pageSize = pagination.pageSize!
      const startIndex = (pagination.pageIndex! - 1) * pageSize
      return data.slice(startIndex, startIndex + pageSize)
    }
  })
  const paginatedMap = computed(() => {
    const map = new Map<VKey, MergedData>()
    covertDataMap(paginatedData.value, map)
    return map
  })

  const flattedData = computed(() => {
    const expandedKeys = expandedRowKeys.value
    if (expandedKeys.length > 0) {
      return flatData(paginatedData.value, expandedKeys, 0)
    }
    return paginatedData.value.map((item, idx) => ({ ...item, expanded: false, level: 0, rowIndex: idx }))
  })

  return { filteredData, flattedData, mergedMap, paginatedMap }
}

export interface DataSourceContext {
  filteredData: ComputedRef<MergedData[]>
  flattedData: ComputedRef<FlattedData[]>
  mergedMap: ComputedRef<Map<VKey, MergedData>>
  paginatedMap: ComputedRef<Map<VKey, MergedData>>
}

export interface MergedData {
  children?: MergedData[]
  parentKey?: VKey
  record: unknown
  rowKey: VKey
}

export interface FlattedData extends MergedData {
  expanded: boolean
  level: number
}

function covertMergeData(record: unknown, getRowKey: GetRowKey, childrenKey: string, parentKey?: VKey) {
  const rowKey = getRowKey(record)
  const result: MergedData = { record, rowKey, parentKey }

  const subData = (record as Record<string, unknown>)[childrenKey] as unknown[]
  if (subData) {
    result.children = subData.map(subRecord => covertMergeData(subRecord, getRowKey, childrenKey, rowKey))
  }
  return result
}

function covertDataMap(mergedData: MergedData[], map: Map<VKey, MergedData>) {
  mergedData.forEach(item => {
    const { rowKey, children } = item
    map.set(rowKey, item)
    if (children) {
      covertDataMap(children, map)
    }
  })
}

function sortData(
  mergedData: MergedData[],
  sorter: (curr: unknown, next: unknown) => number,
  orderBy: 'ascend' | 'descend',
) {
  const tempData = mergedData.slice()
  const orderFlag = orderBy === 'ascend' ? 1 : -1

  tempData.forEach(item => {
    if (item.children?.length && item.children.length > 0) {
      item.children = sortData(item.children, sorter, orderBy)
    }
  })

  return tempData.sort((curr, next) => orderFlag * sorter(curr.record, next.record))
}

function filterData(mergedData: MergedData[], activeFilterables: Filterable[]): MergedData[] {
  return mergedData
    .map(item => {
      const newItem = { ...item }

      const itemValid = activeFilterables.every(filterable => filterable.filter(filterable.filterBy ?? [], item.record))

      if (item.children?.length && item.children.length > 0) {
        newItem.children = filterData(item.children, activeFilterables)
      }

      return (newItem.children && newItem.children.length > 0) || itemValid ? newItem : null
    })
    .filter(item => !!item) as MergedData[]
}

// TODO: performance optimization
// when virtual scrolling is enabled, this do not need to traverse all nodes
function flatData(mergedData: MergedData[], expandedRowKeys: VKey[], level = 0) {
  return mergedData.reduce((result, item) => {
    const { children, parentKey, record, rowKey } = item
    const expanded = expandedRowKeys.includes(rowKey)

    result.push({ children, parentKey, record, rowKey, level, expanded })

    if (expanded && item.children) {
      const childrenFlatData = flatData(item.children, expandedRowKeys, level + 1)
      result.push(...childrenFlatData)
    }

    return result
  }, [] as FlattedData[])
}
