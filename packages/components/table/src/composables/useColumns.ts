import type { ComputedRef } from 'vue'
import type { Screens } from '@idux/cdk/breakpoint'
import type { TableColumnBaseConfig, TableColumnExpandableConfig, TableConfig } from '@idux/components/config'
import type {
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
  const mergedColumns = computed(() =>
    mergeColumns(baseColumns.value, screens, config.columnBase, config.columnExpandable),
  )
  const flattedColumns = computed(() =>
    flattenColumns(baseColumns.value, screens, config.columnBase, config.columnExpandable),
  )

  return { mergedColumns, flattedColumns }
}

export interface ColumnsContext {
  mergedColumns: ComputedRef<TableColumnMerged[][]>
  flattedColumns: ComputedRef<TableColumnFlatted[]>
}
export interface TableColumnBaseFlatted extends TableColumnBase {
  align: TableColumnAlign
}
export interface TableColumnBaseMerged extends TableColumnBaseFlatted {
  colStart: number
  colEnd: number
  hasChildren: boolean
  titleColSpan: number
  titleRowSpan?: number
}
export interface TableColumnExpandableMerged extends TableColumnExpandable {
  align: TableColumnAlign
  key: string | number
  icon: [string, string]
  titleColSpan: number
}
export interface TableColumnSelectableMerged extends TableColumnSelectable {
  align: TableColumnAlign
  key: string | number
  titleColSpan: number
}
export type TableColumnMerged = TableColumnBaseMerged | TableColumnExpandableMerged | TableColumnSelectableMerged
export type TableColumnFlatted = TableColumnBaseFlatted | TableColumnExpandableMerged | TableColumnSelectableMerged

function mergeColumns(
  rootColumns: TableColumn[],
  screens: Screens,
  baseConfig: TableColumnBaseConfig,
  expandableConfig: TableColumnExpandableConfig,
) {
  const rows: TableColumnMerged[][] = []

  function calculateColSpans(columns: TableColumn[], colIndex: number, rowIndex: number) {
    rows[rowIndex] ??= []

    let colStart = colIndex
    const titleColSpans = columns.map(column => {
      let titleColSpan = column.titleColSpan ?? 1
      if ('type' in column) {
        rows[rowIndex].push(column as TableColumnExpandableMerged | TableColumnSelectableMerged)
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
        Object.assign(column, { titleColSpan, colStart, colEnd, hasChildren }) as TableColumnBaseMerged,
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
  columns: TableColumnFlatted[],
  screens: Screens,
  baseConfig: TableColumnBaseConfig,
  expandableConfig: TableColumnExpandableConfig,
) {
  const result: TableColumnFlatted[] = []
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
): TableColumnFlatted[] {
  return columns
    .filter(column => !column.responsive || column.responsive.some(key => screens[key]))
    .map(column => covertColumn(column, baseConfig, expandableConfig))
}

function covertColumn(
  column: TableColumn,
  baseConfig: TableColumnBaseConfig,
  expandableConfig: TableColumnExpandableConfig,
): TableColumnFlatted {
  const { align = baseConfig.align } = column

  if ('type' in column) {
    if (column.type === 'expandable') {
      const icon = column.icon ?? expandableConfig.icon
      return { ...column, key: column.type, icon, align }
    } else {
      return { ...column, key: column.type, align }
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
