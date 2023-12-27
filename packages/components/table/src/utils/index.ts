/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { TableColumnMerged, TableColumnScrollBar } from '../composables/useColumns'

import { Text, type VNodeChild } from 'vue'

import { isNumber, isObject, isString } from 'lodash-es'

import { Logger, type VKey, convertArray, flattenNode, uniqueId } from '@idux/cdk/utils'

import { type FlattedData } from '../composables/useDataSource'
import { type TableColumn } from '../types'

export function getColTitle(
  ellipsis: boolean | { title?: boolean } | undefined,
  children: VNodeChild,
  title: string | undefined,
): string | undefined {
  if (!ellipsis || (isObject(ellipsis) && ellipsis.title === false)) {
    return undefined
  }

  if (isString(children) || isNumber(children)) {
    return children as string
  }

  const textNode = flattenNode(children).find(node => node.type === Text)
  if (textNode) {
    return textNode.children as string
  }

  return title
}

export function getColumnKey(column: TableColumn): VKey {
  if ('key' in column) {
    return column.key!
  }
  if ('dataKey' in column) {
    return convertArray(column.dataKey).join('-')
  }
  if ('type' in column) {
    return `__IDUX_table_column_key_${column.type}`
  }

  __DEV__ &&
    Logger.warn(
      'components/table',
      'Each column in table should have a unique `key`, `dataKey` or `type` prop.',
      column,
    )

  return uniqueId('__IDUX_table_column_key_')
}

interface ModifiedData {
  data: TableColumnMerged | TableColumnScrollBar
  index: number
  poolKey: string
}

export function modifyVirtualData(
  renderedRow: FlattedData,
  renderedCols: TableColumnMerged[],
  flattedColumns: TableColumnMerged[],
  flattedData: FlattedData[],
  fixedStartColumns: (TableColumnMerged | TableColumnScrollBar)[],
  fixedEndColumns: (TableColumnMerged | TableColumnScrollBar)[],
  includeScrollBar = false,
):
  | {
      start?: ModifiedData[]
      end?: ModifiedData[]
    }
  | undefined {
  const filterColumns = (columns: (TableColumnMerged | TableColumnScrollBar)[]) =>
    columns.filter(column => column.type !== 'scroll-bar')

  const startColumns = includeScrollBar ? fixedStartColumns : filterColumns(fixedStartColumns)
  const endColumns = includeScrollBar ? fixedEndColumns : filterColumns(fixedEndColumns)

  if (!startColumns.length && !endColumns.length) {
    return
  }

  const rowIndex = flattedData.findIndex(data => data.rowKey === renderedRow.rowKey)

  const getAppendedColumn = (column: TableColumnMerged | TableColumnScrollBar) => {
    if (renderedCols.findIndex(col => col.key === column.key) > -1) {
      return
    }

    const index = flattedColumns.findIndex(col => col.key === column.key)

    return {
      data: column,
      index,
      poolKey: `fix-${rowIndex}-${index}`,
    }
  }

  return {
    start: startColumns.map(getAppendedColumn).filter(Boolean) as ModifiedData[],
    end: endColumns.map(getAppendedColumn).filter(Boolean) as ModifiedData[],
  }
}
