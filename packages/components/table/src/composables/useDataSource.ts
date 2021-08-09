import type { ComputedRef, Ref } from 'vue'
import type { TableProps, TableBodyRowProps, TablePagination } from '../types'
import type { GetRowKey } from './useGetRowKey'

import { computed } from 'vue'

export interface DataSourceContext {
  filteredData: ComputedRef<unknown[]>
  flattedDataSource: ComputedRef<Omit<TableBodyRowProps, 'index'>[]>
}

export function useDataSource(
  props: TableProps,
  getRowKey: ComputedRef<GetRowKey>,
  expandedRowKeys: Ref<(string | number)[]>,
  mergedPagination: ComputedRef<TablePagination | null>,
): DataSourceContext {
  // TODO
  const filteredData = computed(() => props.dataSource)
  // TODO
  const sortedData = computed(() => filteredData.value)
  const paginatedData = computed(() => {
    const pagination = mergedPagination.value
    if (pagination === null) {
      return sortedData.value
    } else {
      const pageSize = pagination.pageSize!
      const startIndex = (pagination.pageIndex! - 1) * pageSize
      return sortedData.value.slice(startIndex, startIndex + pageSize)
    }
  })
  const flattedDataSource = computed(() => {
    const getKey = getRowKey.value
    const expandedKeys = expandedRowKeys.value
    if (expandedKeys.length > 0) {
      const records: Omit<TableBodyRowProps, 'index'>[] = []
      paginatedData.value.forEach(record => records.push(...flattenRecord(record, 0, expandedKeys, getKey)))
      return records
    }
    return paginatedData.value.map(record => ({ record, expanded: false, level: 0, rowKey: getKey(record) }))
  })

  return { filteredData, flattedDataSource }
}

// TODO: filter and sort
function flattenRecord(record: unknown, level: number, expandedRowKeys: (string | number)[], getRowKey: GetRowKey) {
  const rowKey = getRowKey(record)
  const expanded = expandedRowKeys.includes(rowKey)
  const result = [{ record, expanded, level, rowKey }]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const children = (record as any).children as any[]
  if (expanded && children) {
    children.forEach(subRecord => result.push(...flattenRecord(subRecord, level + 1, expandedRowKeys, getRowKey)))
  }
  return result
}
