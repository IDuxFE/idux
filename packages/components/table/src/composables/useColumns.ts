import type { ComputedRef } from 'vue'
import type { Screens } from '@idux/cdk/breakpoint'
import type { TableColumnBaseConfig, TableColumnExpandableConfig, TableConfig } from '@idux/components/config'
import type {
  Key,
  TableColumn,
  TableColumnAlign,
  TableColumnBase,
  TableColumnExpandable,
  TableColumnSelectable,
  TableProps,
} from '../types'

import { computed } from 'vue'
import { isNil } from 'lodash-es'
import { useScreens } from '@idux/cdk/breakpoint'
import { convertArray } from '@idux/cdk/utils'

export function useColumns(props: TableProps, config: TableConfig): ColumnsContext {
  const screens = useScreens()
  const baseColumns = computed(() =>
    filterAndCovertColumns(props.columns, screens, config.columnBase, config.columnExpandable),
  )

  const flattedColumns = computed(() =>
    flattenColumns(baseColumns.value, screens, config.columnBase, config.columnExpandable),
  )

  const mergedRows = computed(() =>
    mergeColumns(baseColumns.value, screens, config.columnBase, config.columnExpandable),
  )

  return { flattedColumns, mergedRows }
}

export interface ColumnsContext {
  flattedColumns: ComputedRef<TableColumnMerged[]>
  mergedRows: ComputedRef<TableColumnMergedExtra[][]>
}

export type TableColumnMerged = TableColumnMergedBase | TableColumnMergedExpandable | TableColumnMergedSelectable
export type TableColumnMergedExtra =
  | TableColumnMergedBaseExtra
  | TableColumnMergedExpandable
  | TableColumnMergedSelectable
export interface TableColumnMergedBase extends TableColumnBase {
  align: TableColumnAlign
  key: Key
}
export interface TableColumnMergedBaseExtra extends TableColumnMergedBase {
  colStart: number
  colEnd: number
  hasChildren: boolean
  titleColSpan: number
  titleRowSpan?: number
}
export interface TableColumnMergedExpandable extends TableColumnExpandable {
  align: TableColumnAlign
  key: Key
  icon: [string, string]
  titleColSpan: number
}
export interface TableColumnMergedSelectable extends TableColumnSelectable {
  align: TableColumnAlign
  key: Key
  multiple: boolean
  titleColSpan: number
}

function mergeColumns(
  rootColumns: TableColumn[],
  screens: Screens,
  baseConfig: TableColumnBaseConfig,
  expandableConfig: TableColumnExpandableConfig,
) {
  const rows: TableColumnMergedExtra[][] = []

  function calculateColSpans(columns: TableColumn[], colIndex: number, rowIndex: number) {
    rows[rowIndex] ??= []

    let colStart = colIndex
    const titleColSpans = columns.map(column => {
      let titleColSpan = column.titleColSpan ?? 1
      if ('type' in column) {
        rows[rowIndex].push(column as TableColumnMergedExpandable | TableColumnMergedSelectable)
        return titleColSpan
      }

      let hasChildren = false
      if ('children' in column) {
        hasChildren = true
        const children = filterAndCovertColumns(column.children!, screens, baseConfig, expandableConfig)
        const childrenSpans = calculateColSpans(children, colStart, rowIndex + 1)
        if (isNil(column.colSpan)) {
          titleColSpan = childrenSpans.reduce((total, count) => total + count)
        }
      }

      const colEnd = colStart + titleColSpan - 1
      rows[rowIndex].push(
        Object.assign(column, { titleColSpan, colStart, colEnd, hasChildren }) as TableColumnMergedBaseExtra,
      )

      colStart += titleColSpan

      return titleColSpan
    })

    return titleColSpans
  }

  calculateColSpans(rootColumns, 0, 0)

  const rowCount = rows.length
  rows.forEach((columns, rowIndex) => {
    columns.forEach(col => {
      if ('hasChildren' in col && col.hasChildren) {
        col.titleRowSpan = rowCount - rowIndex
      }
    })
  })

  return rows
}

function flattenColumns(
  columns: TableColumnMerged[],
  screens: Screens,
  baseConfig: TableColumnBaseConfig,
  expandableConfig: TableColumnExpandableConfig,
) {
  const result: TableColumnMerged[] = []
  columns.forEach(column => {
    if ('children' in column) {
      const children = filterAndCovertColumns(column.children!, screens, baseConfig, expandableConfig)
      result.push(...flattenColumns(children, screens, baseConfig, expandableConfig))
    }
    result.push(column)
  })
  return result
}

function filterAndCovertColumns(
  columns: TableColumn[],
  screens: Screens,
  baseConfig: TableColumnBaseConfig,
  expandableConfig: TableColumnExpandableConfig,
): TableColumnMerged[] {
  return columns
    .filter(column => !column.responsive || column.responsive.some(key => screens[key]))
    .map(column => covertColumn(column, baseConfig, expandableConfig))
}

function covertColumn(
  column: TableColumn,
  baseConfig: TableColumnBaseConfig,
  expandableConfig: TableColumnExpandableConfig,
): TableColumnMerged {
  const { align = baseConfig.align } = column

  if ('type' in column) {
    if (column.type === 'expandable') {
      const icon = column.icon ?? expandableConfig.icon
      return { ...column, key: column.type, icon, align }
    } else {
      // The default value for `multiple` is true
      const multiple = column.multiple ?? true
      return { ...column, key: column.type, align, multiple }
    }
  } else {
    let { key, dataKey, sortable } = column
    key ??= convertArray(dataKey).join('-')
    if (sortable) {
      sortable = { ...baseConfig.sortable, ...sortable }
    }
    return { ...column, key, sortable, align }
  }
}
