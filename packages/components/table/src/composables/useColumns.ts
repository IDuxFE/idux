import type { ComputedRef } from 'vue'
import type { Screens } from '@idux/cdk/breakpoint'
import type { TableColumnBaseConfig, TableColumnExpandableConfig, TableConfig } from '@idux/components/config'
import type {
  Key,
  TableColumn,
  TableColumnAlign,
  TableColumnBase,
  TableColumnExpandable,
  TableColumnFixed,
  TableColumnSelectable,
  TableProps,
} from '../types'

import { computed, reactive, ref, watchEffect } from 'vue'
import { isNil } from 'lodash-es'
import { useScreens } from '@idux/cdk/breakpoint'
import { convertArray } from '@idux/cdk/utils'

export function useColumns(
  props: TableProps,
  config: TableConfig,
  scrollBarSizeOnFixedHolder: ComputedRef<number>,
): ColumnsContext {
  const screens = useScreens()
  const mergedColumns = computed(() => mergeColumns(props.columns, screens, config.columnBase, config.columnExpandable))
  const { flattedColumns, scrollBarColumn, flattedColumnsWithScrollBar } = useFlattedColumns(
    mergedColumns,
    scrollBarSizeOnFixedHolder,
  )
  const fixedColumnKeys = useFixedColumnKeys(flattedColumnsWithScrollBar)
  const hasEllipsis = computed(() => flattedColumns.value.some(column => (column as TableColumnBase).ellipsis))
  const hasFixed = computed(() => flattedColumns.value.some(column => column.fixed))

  const { columnWidths, columnWidthsWithScrollBar, changeColumnWidth } = useColumnWidths(
    flattedColumns,
    scrollBarColumn,
  )
  const { columnOffsets, columnOffsetsWithScrollBar } = useColumnOffsets(columnWidths, columnWidthsWithScrollBar)

  const mergedRows = computed(() => mergeRows(mergedColumns.value, scrollBarColumn.value))

  return {
    flattedColumns,
    scrollBarColumn,
    flattedColumnsWithScrollBar,
    fixedColumnKeys,
    hasEllipsis,
    hasFixed,
    columnWidths,
    columnWidthsWithScrollBar,
    changeColumnWidth,
    columnOffsets,
    columnOffsetsWithScrollBar,
    mergedRows,
  }
}

export interface ColumnsContext {
  flattedColumns: ComputedRef<TableColumnMerged[]>
  scrollBarColumn: ComputedRef<TableColumnScrollBar | undefined>
  flattedColumnsWithScrollBar: ComputedRef<(TableColumnMerged | TableColumnScrollBar)[]>
  fixedColumnKeys: ComputedRef<{
    lastStartKey: Key | undefined
    firstEndKey: Key | undefined
  }>
  hasEllipsis: ComputedRef<boolean>
  hasFixed: ComputedRef<boolean>
  columnWidths: ComputedRef<number[]>
  columnWidthsWithScrollBar: ComputedRef<number[]>
  changeColumnWidth: (key: Key, width: number | false) => void
  columnOffsets: ComputedRef<{ starts: number[]; ends: number[] }>
  columnOffsetsWithScrollBar: ComputedRef<{ starts: number[]; ends: number[] }>
  mergedRows: ComputedRef<TableColumnMergedExtra[][]>
}

export type TableColumnMerged = TableColumnMergedBase | TableColumnMergedExpandable | TableColumnMergedSelectable
export type TableColumnMergedExtra =
  | TableColumnMergedBaseExtra
  | TableColumnMergedExpandable
  | TableColumnMergedSelectable
  | TableColumnMergedScrollBar

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
export interface TableColumnMergedExpandable extends TableColumnExpandable, TableColumnMergedBaseExtra {
  align: TableColumnAlign
  key: Key
  icon: [string, string]
  titleColSpan: number
}
export interface TableColumnMergedSelectable extends TableColumnSelectable, TableColumnMergedBaseExtra {
  align: TableColumnAlign
  key: Key
  multiple: boolean
  titleColSpan: number
}

export interface TableColumnScrollBar {
  key: string
  type: 'scroll-bar'
  fixed: TableColumnFixed | undefined
  width: number
}

export type TableColumnMergedScrollBar = TableColumnMergedBaseExtra & TableColumnScrollBar

function mergeColumns(
  columns: TableColumn[],
  screens: Screens,
  baseConfig: TableColumnBaseConfig,
  expandableConfig: TableColumnExpandableConfig,
  parentKey?: Key,
): TableColumnMerged[] {
  return columns
    .filter(column => !column.responsive || column.responsive.some(key => screens[key]))
    .map((column, colIndex) =>
      covertColumn(column, screens, baseConfig, expandableConfig, `IDUX_TABLE_KEY_${parentKey}-${colIndex}`),
    )
}

function covertColumn(
  column: TableColumn,
  screens: Screens,
  baseConfig: TableColumnBaseConfig,
  expandableConfig: TableColumnExpandableConfig,
  defaultKey: Key,
): TableColumnMerged {
  const { align = baseConfig.align } = column

  if ('type' in column) {
    const key = `IDUX_TABLE_KEY_${column.type}`
    if (column.type === 'expandable') {
      const { icon = expandableConfig.icon } = column
      return { ...column, key, align, icon }
    } else {
      // The default value for `multiple` is true
      const multiple = column.multiple ?? true
      return { ...column, key, align, multiple }
    }
  } else {
    const { key, dataKey, sortable, children } = column
    const _key = key ?? (convertArray(dataKey).join('-') || defaultKey)
    const newColumn = { ...column, key: _key, align }
    if (sortable) {
      newColumn.sortable = { ...baseConfig.sortable, ...sortable }
    }
    if (children?.length) {
      newColumn.children = mergeColumns(children, screens, baseConfig, expandableConfig, _key)
    }
    return newColumn
  }
}

function useFlattedColumns(
  mergedColumns: ComputedRef<TableColumnMerged[]>,
  scrollBarSizeOnFixedHolder: ComputedRef<number>,
) {
  const flattedColumns = computed(() => flatColumns(mergedColumns.value))

  const scrollBarColumn = computed<TableColumnScrollBar | undefined>(() => {
    const scrollBarSize = scrollBarSizeOnFixedHolder.value
    if (scrollBarSize === 0) {
      return undefined
    }
    const columns = flattedColumns.value
    const lastColumn = columns[columns.length - 1]
    return {
      key: 'IDUX_TABLE_KEY_scroll-bar',
      type: 'scroll-bar',
      fixed: lastColumn && lastColumn.fixed,
      width: scrollBarSize,
    }
  })

  const flattedColumnsWithScrollBar = computed(() => {
    const columns = flattedColumns.value
    if (columns.length === 0) {
      return columns
    }
    const scrollBar = scrollBarColumn.value
    return scrollBar ? [...columns, scrollBar] : columns
  })

  return { flattedColumns, scrollBarColumn, flattedColumnsWithScrollBar }
}

function flatColumns(columns: TableColumnMerged[]) {
  const result: TableColumnMerged[] = []
  columns.forEach(column => {
    const { fixed, children: subColumns } = column as TableColumnBase
    if (subColumns?.length) {
      let subFlattedColumns = flatColumns(subColumns as TableColumnMerged[])
      if (fixed) {
        subFlattedColumns = subFlattedColumns.map(item => ({ fixed, ...item }))
      }
      result.push(...subFlattedColumns)
    } else {
      result.push(column)
    }
  })
  return result
}

function useFixedColumnKeys(flattedColumnsWithScrollBar: ComputedRef<(TableColumnMerged | TableColumnScrollBar)[]>) {
  return computed(() => {
    let lastStartKey: Key | undefined
    let firstEndKey: Key | undefined
    flattedColumnsWithScrollBar.value.forEach(column => {
      const { fixed, key } = column
      if (fixed === 'start') {
        lastStartKey = key
      } else if (fixed === 'end') {
        if (!firstEndKey) {
          firstEndKey = key
        }
      }
    })

    return { lastStartKey, firstEndKey }
  })
}

function useColumnWidths(
  flattedColumns: ComputedRef<TableColumnMerged[]>,
  scrollBarColumn: ComputedRef<TableColumnScrollBar | undefined>,
) {
  const widthMap = reactive<Record<Key, number>>({})
  const widthString = ref<string>()

  watchEffect(() => {
    const keys = Object.keys(widthMap)
    const columns = flattedColumns.value
    if (keys.length !== columns.length) {
      widthString.value = undefined
      return
    }
    widthString.value = columns.map(column => widthMap[column.key]).join('-')
  })

  const columnWidths = computed(() => {
    const _widthString = widthString.value
    return _widthString ? _widthString.split('-').map(Number) : []
  })

  const columnWidthsWithScrollBar = computed(() => {
    const widths = columnWidths.value
    if (widths.length === 0) {
      return widths
    }
    const scrollBar = scrollBarColumn.value
    return scrollBar ? [...widths, scrollBar.width] : widths
  })

  const changeColumnWidth = (key: Key, width: number | false) => {
    if (width === false) {
      delete widthMap[key]
    } else {
      widthMap[key] = width
    }
  }

  return { columnWidths, columnWidthsWithScrollBar, changeColumnWidth }
}

function useColumnOffsets(columnWidths: ComputedRef<number[]>, columnWidthsWithScrollBar: ComputedRef<number[]>) {
  const columnOffsets = computed(() => calculateOffsets(columnWidths.value))
  const columnOffsetsWithScrollBar = computed(() => calculateOffsets(columnWidthsWithScrollBar.value))
  return { columnOffsets, columnOffsetsWithScrollBar }
}

function calculateOffsets(widths: number[]) {
  const count = widths.length
  const startOffsets: number[] = []
  const endOffsets: number[] = []

  let startOffset = 0
  let endOffset = 0

  for (let start = 0; start < count; start++) {
    // Start offset
    startOffsets[start] = startOffset
    startOffset += widths[start] || 0

    // End offset
    const end = count - start - 1
    endOffsets[end] = endOffset
    endOffset += widths[end] || 0
  }

  return {
    starts: startOffsets,
    ends: endOffsets,
  }
}

function mergeRows(mergedColumns: TableColumnMerged[], scrollBarColumn: TableColumnScrollBar | undefined) {
  const rows: TableColumnMergedExtra[][] = []

  function calculateColSpans(columns: TableColumnMerged[], colIndex: number, rowIndex: number) {
    rows[rowIndex] ??= []

    let colStart = colIndex
    const titleColSpans = columns.map(column => {
      let titleColSpan = (column as TableColumnMergedBase).titleColSpan ?? 1

      let hasChildren = false
      const subColumns = (column as TableColumnMergedBase).children as TableColumnMerged[] | undefined
      if (subColumns?.length) {
        hasChildren = true
        const subColumnSpans = calculateColSpans(subColumns, colStart, rowIndex + 1)
        if (isNil((column as TableColumnMergedBase).titleColSpan)) {
          titleColSpan = subColumnSpans.reduce((total, count) => total + count)
        }
      }

      const colEnd = colStart + titleColSpan - 1
      rows[rowIndex].push({ ...column, titleColSpan, colStart, colEnd, hasChildren } as TableColumnMergedExtra)

      colStart += titleColSpan

      return titleColSpan
    })

    return titleColSpans
  }

  const rootColumns = scrollBarColumn
    ? [...mergedColumns, scrollBarColumn as unknown as TableColumnMerged]
    : mergedColumns
  calculateColSpans(rootColumns, 0, 0)

  const rowCount = rows.length
  rows.forEach((columns, rowIndex) => {
    columns.forEach(col => {
      if (!col.hasChildren) {
        col.titleRowSpan = rowCount - rowIndex
      }
    })
  })

  return rows
}
