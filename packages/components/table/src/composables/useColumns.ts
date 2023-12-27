/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type ComputedRef,
  type Ref,
  type Slots,
  type VNode,
  type VNodeChild,
  computed,
  ref,
  watch,
  watchEffect,
} from 'vue'

import { debounce, isNil } from 'lodash-es'

import { type VKey, flattenNode } from '@idux/cdk/utils'
import { type TableConfig } from '@idux/components/config'

import { tableColumnKey } from '../column'
import {
  type TableColumn,
  type TableColumnAlign,
  type TableColumnBase,
  type TableColumnExpandable,
  type TableColumnFixed,
  type TableColumnSelectable,
  type TableProps,
} from '../types'
import { getColumnKey } from '../utils'

export function useColumns(
  props: TableProps,
  slots: Slots,
  config: TableConfig,
  scrollBarSizeOnFixedHolder: ComputedRef<number>,
): ColumnsContext {
  const mergedColumns = computed(() => {
    const { columns } = props
    return mergeColumns(columns && columns.length > 0 ? columns : convertColumns(slots.default?.()), config)
  })
  const { flattedColumns, scrollBarColumn, flattedColumnsWithScrollBar } = useFlattedColumns(
    mergedColumns,
    scrollBarSizeOnFixedHolder,
  )
  const { fixedColumns, fixedColumnKeys } = useFixedColumns(flattedColumnsWithScrollBar)
  const hasEllipsis = computed(
    () => !!props.ellipsis || flattedColumns.value.some(column => (column as TableColumnBase).ellipsis),
  )
  const hasFixed = computed(() => flattedColumns.value.some(column => column.fixed))

  const columnCount = computed(() => flattedColumnsWithScrollBar.value.length)

  const { columnWidthMap, columnWidths, changeColumnWidth, clearColumnWidth } = useColumnWidths(flattedColumns)
  const { columnOffsets, columnOffsetsWithScrollBar } = useColumnOffsets(fixedColumns, columnWidthMap, columnCount)

  const mergedRows = computed(() => mergeRows(mergedColumns.value, scrollBarColumn.value))

  return {
    flattedColumns,
    scrollBarColumn,
    flattedColumnsWithScrollBar,
    fixedColumns,
    fixedColumnKeys,
    hasEllipsis,
    hasFixed,
    columnWidthMap,
    columnWidths,
    changeColumnWidth,
    clearColumnWidth,
    columnOffsets,
    columnOffsetsWithScrollBar,
    mergedRows,
  }
}

export interface ColumnsContext {
  flattedColumns: ComputedRef<TableColumnMerged[]>
  scrollBarColumn: ComputedRef<TableColumnScrollBar | undefined>
  flattedColumnsWithScrollBar: ComputedRef<(TableColumnMerged | TableColumnScrollBar)[]>
  fixedColumns: ComputedRef<{
    fixedStartColumns: (TableColumnMerged | TableColumnScrollBar)[]
    fixedEndColumns: (TableColumnMerged | TableColumnScrollBar)[]
  }>
  fixedColumnKeys: ComputedRef<{
    lastStartKey: VKey | undefined
    firstEndKey: VKey | undefined
  }>
  hasEllipsis: ComputedRef<boolean>
  hasFixed: ComputedRef<boolean>
  columnWidthMap: Ref<Record<VKey, number>>
  columnWidths: Ref<number[]>
  changeColumnWidth: (key: VKey, width: number | false) => void
  clearColumnWidth: () => void
  columnOffsets: ComputedRef<{
    starts: Record<VKey, { index: number; offset: number }>
    ends: Record<VKey, { index: number; offset: number }>
  }>
  columnOffsetsWithScrollBar: ComputedRef<{
    starts: Record<VKey, { index: number; offset: number }>
    ends: Record<VKey, { index: number; offset: number }>
  }>
  mergedRows: ComputedRef<{
    rows: TableColumnMergedExtra[][]
    offsetIndexMap: Record<VKey, { colStart: number; colEnd: number }>
  }>
}

export type TableColumnMerged = (TableColumnMergedBase | TableColumnMergedExpandable | TableColumnMergedSelectable) & {
  type?: 'selectable' | 'expandable' | 'scroll-bar' | 'indexable'
}
export type TableColumnMergedExtra =
  | TableColumnMergedBaseExtra
  | TableColumnMergedExpandable
  | TableColumnMergedSelectable
  | TableColumnMergedScrollBar

export interface TableColumnMergedBase extends TableColumnBase {
  align: TableColumnAlign
  key: VKey
}
export interface TableColumnMergedBaseExtra extends TableColumnMergedBase {
  colStart: number
  colEnd: number
  hasChildren: boolean
  titleColSpan: number
  titleRowSpan?: number
}
export interface TableColumnMergedExpandable extends TableColumnMergedBaseExtra, TableColumnExpandable {
  align: TableColumnAlign
  key: VKey
  icon: string | VNodeChild | ((options: { expanded: boolean; record: unknown }) => string | VNodeChild)
  titleColSpan: number
}
export interface TableColumnMergedSelectable extends TableColumnMergedBaseExtra, TableColumnSelectable {
  align: TableColumnAlign
  key: VKey
  multiple: boolean
  titleColSpan: number

  customCell?: (data: unknown) => VNodeChild
}

export interface TableColumnScrollBar {
  key: string
  type: 'scroll-bar'
  fixed: TableColumnFixed | undefined
  width: number
}

export type TableColumnMergedScrollBar = TableColumnMergedBaseExtra & TableColumnScrollBar

function mergeColumns(columns: TableColumn[], config: TableConfig): TableColumnMerged[] {
  return columns.map(column => convertColumn(column, config))
}

export function convertColumns(nodes: VNode[] | undefined): TableColumn[] {
  const columns: Array<TableColumn> = []

  flattenNode(nodes, { key: tableColumnKey }).forEach((node, index) => {
    const { props, children } = node
    const { key = index, editable, ellipsis, ...newColumn } = props || {}
    newColumn.key = key
    newColumn.editable = editable || editable === ''
    newColumn.ellipsis = ellipsis || ellipsis === ''
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { default: defaultSlot, cell, title, expand, icon } = (children || {}) as any
    if (defaultSlot) {
      newColumn.children = convertColumns(defaultSlot())
    }
    if (cell) {
      newColumn.customCell = cell
    }
    if (title) {
      newColumn.customTitle = title
    }
    if (expand) {
      newColumn.customExpand = expand
    }
    if (icon) {
      newColumn.customIcon = icon
    }
    columns.push(newColumn as TableColumn)
  })

  return columns
}

function convertColumn(column: TableColumn, config: TableConfig): TableColumnMerged {
  const { columnBase, columnExpandable, columnSelectable, columnIndexable } = config
  const { align = columnBase.align } = column
  const key = getColumnKey(column)

  if ('type' in column) {
    const { type } = column
    if (type === 'expandable') {
      const { showLine = columnExpandable.showLine, icon = columnExpandable.icon } = column
      return { ...column, key, align, icon, showLine }
    }
    if (type === 'selectable') {
      // The default value for `multiple` is true
      const { multiple = true, showIndex = columnSelectable.showIndex } = column
      return { ...column, key, align, multiple, showIndex } as TableColumnMerged
    }
    if (type === 'indexable') {
      const align = column.align ?? columnIndexable.align ?? columnBase.align
      return { ...columnIndexable, ...column, align, key } as TableColumnMerged
    }
    // for ProTable to support more type
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return { ...column, key, align }
  } else {
    const { sortable, filterable, children } = column
    const newColumn = { ...column, key, align }
    if (sortable) {
      newColumn.sortable = { ...columnBase.sortable, ...sortable }
    }
    if (filterable) {
      newColumn.filterable = { ...columnBase.filterable, ...filterable }
    }
    if (children?.length) {
      newColumn.children = mergeColumns(children, config)
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
    const columns = flattedColumns.value
    if (scrollBarSize === 0 || columns.length === 0) {
      return undefined
    }
    const lastColumn = columns[columns.length - 1]
    return {
      key: '__IDUX_table_column_key_scroll-bar',
      type: 'scroll-bar',
      fixed: lastColumn && lastColumn.fixed,
      width: scrollBarSize,
    }
  })

  const flattedColumnsWithScrollBar = computed(() => {
    const columns = flattedColumns.value
    const scrollBar = scrollBarColumn.value
    return scrollBar ? [...columns, scrollBar] : columns
  })

  return { flattedColumns, scrollBarColumn, flattedColumnsWithScrollBar }
}

export function flatColumns<Col extends TableColumnMerged>(columns: Col[]): Col[] {
  const result: Col[] = []
  columns.forEach(column => {
    const { fixed, children: subColumns } = column as TableColumnBase
    if (subColumns?.length) {
      let subFlattedColumns = flatColumns(subColumns as Col[])
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

function useFixedColumns(flattedColumnsWithScrollBar: ComputedRef<(TableColumnMerged | TableColumnScrollBar)[]>) {
  const fixedColumns = computed(() => {
    const fixedStartColumns: (TableColumnMerged | TableColumnScrollBar)[] = []
    const fixedEndColumns: (TableColumnMerged | TableColumnScrollBar)[] = []

    flattedColumnsWithScrollBar.value.forEach(column => {
      const { fixed } = column
      if (fixed === 'start') {
        fixedStartColumns.push(column)
      } else if (fixed === 'end') {
        fixedEndColumns.push(column)
      }
    })

    return { fixedStartColumns, fixedEndColumns }
  })
  const fixedColumnKeys = computed(() => {
    const { fixedStartColumns, fixedEndColumns } = fixedColumns.value

    return { lastStartKey: fixedStartColumns[fixedStartColumns.length - 1]?.key, firstEndKey: fixedEndColumns[0]?.key }
  })

  return { fixedColumns, fixedColumnKeys }
}

function useColumnWidths(flattedColumns: ComputedRef<TableColumnMerged[]>) {
  const widthMap = ref<Record<VKey, number>>({})
  const widthString = ref<string>()
  const columnWidths = ref<number[]>([])
  watch(
    widthString,
    // resizable: 列宽设置百分比的情况下，拖拽会改变多列的宽度，用 debounce 来减少重复渲染次数。
    debounce(widths => {
      columnWidths.value = widths ? widths.split('-').filter(Boolean).map(Number) : []
    }, 16),
  )

  watchEffect(() => {
    const columns = flattedColumns.value
    widthString.value = columns.map(column => widthMap.value[column.key]).join('-')
  })

  const changeColumnWidth = (key: VKey, width: number | false) => {
    if (width === false) {
      delete widthMap.value[key]
    } else {
      widthMap.value[key] = width
    }
  }

  const clearColumnWidth = () => {
    widthMap.value = {}
  }

  return { columnWidthMap: widthMap, columnWidths, changeColumnWidth, clearColumnWidth }
}

function useColumnOffsets(
  fixedColumns: ComputedRef<{
    fixedStartColumns: (TableColumnMerged | TableColumnScrollBar)[]
    fixedEndColumns: (TableColumnMerged | TableColumnScrollBar)[]
  }>,
  columnWidthsMap: Ref<Record<VKey, number>>,
  columnCount: Ref<number>,
) {
  const columnOffsets = computed(() =>
    calculateOffsets(
      fixedColumns.value.fixedStartColumns,
      fixedColumns.value.fixedEndColumns.filter(column => column.type !== 'scroll-bar'),
      columnWidthsMap.value,
      columnCount.value - 1,
    ),
  )
  const columnOffsetsWithScrollBar = computed(() =>
    calculateOffsets(
      fixedColumns.value.fixedStartColumns,
      fixedColumns.value.fixedEndColumns,
      columnWidthsMap.value,
      columnCount.value,
    ),
  )
  return { columnOffsets, columnOffsetsWithScrollBar }
}

function calculateOffsets(
  startColumns: (TableColumnMerged | TableColumnScrollBar)[],
  endColumns: (TableColumnMerged | TableColumnScrollBar)[],
  columnWidthsMap: Record<VKey, number>,
  columnCount: number,
) {
  const startOffsets: Record<VKey, { index: number; offset: number }> = {}
  const endOffsets: Record<VKey, { index: number; offset: number }> = {}

  let startOffset = 0
  let endOffset = 0

  for (let index = 0; index < startColumns.length; index++) {
    const column = startColumns[index]
    const width = columnWidthsMap[column.key] ?? column.width ?? 0

    startOffsets[column.key] = { index, offset: startOffset }
    startOffset += width
  }

  for (let index = 0; index < endColumns.length; index++) {
    const column = endColumns[endColumns.length - index - 1]
    const width = columnWidthsMap[column.key] ?? column.width ?? 0

    endOffsets[column.key] = { index: columnCount - index - 1, offset: endOffset }
    endOffset += width
  }

  return {
    starts: startOffsets,
    ends: endOffsets,
  }
}

function mergeRows(mergedColumns: TableColumnMerged[], scrollBarColumn: TableColumnScrollBar | undefined) {
  const rows: TableColumnMergedExtra[][] = []
  const offsetIndexMap: Record<VKey, { colStart: number; colEnd: number }> = {}

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
      offsetIndexMap[column.key] = { colStart, colEnd }

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

  return { rows, offsetIndexMap }
}
