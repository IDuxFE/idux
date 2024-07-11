/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Slots, computed, h, watch } from 'vue'

import { isString } from 'lodash-es'

import { CdkDndSortableHandle } from '@idux/cdk/dnd'
import { type VKey, callEmit, filterTree, useState } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'
import { ɵGetColumnKey } from '@idux/components/table'
import { type ProTableConfig } from '@idux/pro/config'

import { type ProTableColumn, type ProTableProps, type ResolvedProTableDataDndSortable } from '../types'

export interface ColumnsContext {
  checkedColumnKeys: ComputedRef<{
    start: VKey[]
    center: VKey[]
    end: VKey[]
  }>
  mergedColumns: ComputedRef<ProTableColumn[]>
  setMergedColumns: (columns: ProTableColumn[]) => void
  mergedColumnMap: ComputedRef<Map<VKey, ProTableColumn>>
  displayColumns: ComputedRef<ProTableColumn[]>
  resetColumns: () => void
}

export function useColumns(
  props: ProTableProps,
  config: ProTableConfig,
  slots: Slots,
  mergedPrefixCls: ComputedRef<string>,
  dndSortable: ComputedRef<ResolvedProTableDataDndSortable | false>,
): ColumnsContext {
  const originalColumns = computed(() => props.columns)
  const [mergedColumns, setMergedColumns] = useState(
    mergeColumns(mergedPrefixCls.value, originalColumns.value, config, slots, dndSortable.value),
  )

  const mergedContext = computed(() => {
    const map = new Map<VKey, ProTableColumn>()
    const checkedKeys = {
      start: [] as VKey[],
      center: [] as VKey[],
      end: [] as VKey[],
    }

    const displayColumns = filterTree(
      mergedColumns.value as (ProTableColumn & { children?: ProTableColumn[] })[],
      'children',
      (column, parents) => {
        const key = column.key!
        map.set(key, column)

        if (column.visible === false || parents.some(parent => parent.visible === false)) {
          return false
        }

        if (
          !column.children?.length &&
          column.layoutable !== false &&
          parents.every(parent => parent.layoutable !== false)
        ) {
          if (isFixed('start', column, parents)) {
            checkedKeys.start.push(key)
          } else if (isFixed('end', column, parents)) {
            checkedKeys.end.push(key)
          } else {
            checkedKeys.center.push(key)
          }
        }

        return true
      },
      'and',
    ) as ProTableColumn[]

    return { map, checkedKeys, displayColumns }
  })

  const mergedColumnMap = computed(() => mergedContext.value.map)
  const checkedColumnKeys = computed(() => mergedContext.value.checkedKeys)
  const displayColumns = computed(() => mergedContext.value.displayColumns)

  watch(originalColumns, columns =>
    setMergedColumns(mergeColumns(mergedPrefixCls.value, columns, config, slots, dndSortable.value)),
  )
  watch(mergedColumns, newColumns => {
    const pickedColumns = pickOutInsertedHandleColumn(newColumns, originalColumns.value, dndSortable.value)
    callEmit(props.onColumnsChange, pickedColumns)
  })

  const resetColumns = () =>
    setMergedColumns(mergeColumns(mergedPrefixCls.value, originalColumns.value, config, slots, dndSortable.value))

  return { checkedColumnKeys, mergedColumns, setMergedColumns, mergedColumnMap, displayColumns, resetColumns }
}

const defaultDndSortableHandleColumnKey = '__idux-pro-table-dnd-handle__'

function convertDragHandleColumn(
  mergedPrefixCls: string,
  slots: Slots,
  dragHandleIcon: string,
  column: ProTableColumn,
): ProTableColumn {
  const { key, customCell, ...rest } = column

  const cellRender = isString(customCell) ? slots[customCell] : customCell

  return {
    key,
    width: 40,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customCell: (data: any) => {
      if (cellRender) {
        return h(CdkDndSortableHandle, { class: `${mergedPrefixCls}-dnd-sortable-drag-handle` }, () => cellRender(data))
      }

      return h(CdkDndSortableHandle, { class: `${mergedPrefixCls}-dnd-sortable-drag-handle` }, () =>
        h(IxIcon, { name: dragHandleIcon }),
      )
    },
    ...rest,
    visible: true,
    align: { cell: 'center' },
    changeVisible: false,
  } as ProTableColumn
}

function insertDragHandleColumn(
  mergedPrefixCls: string,
  slots: Slots,
  columns: ProTableColumn[],
  dndSortable: ResolvedProTableDataDndSortable | false,
) {
  if (!dndSortable) {
    return columns
  }

  const { dragHandleColumn, dragHandleIcon } = dndSortable

  if (dragHandleColumn === false) {
    return columns
  }

  const dragHandleColumnKey = (
    dragHandleColumn === true ? defaultDndSortableHandleColumnKey : dragHandleColumn
  ) as string

  const existedColumnIndex = columns.findIndex(column => column.key === dragHandleColumnKey)

  if (existedColumnIndex < 0) {
    return [
      convertDragHandleColumn(mergedPrefixCls, slots, dragHandleIcon, { key: defaultDndSortableHandleColumnKey }),
      ...columns,
    ] as ProTableColumn[]
  }

  const newColumns = [...columns]
  newColumns.splice(
    existedColumnIndex,
    1,
    convertDragHandleColumn(mergedPrefixCls, slots, dragHandleIcon, columns[existedColumnIndex]),
  )

  return columns
}

function pickOutInsertedHandleColumn(
  columns: ProTableColumn[],
  originalColumns: ProTableColumn[],
  dndSortable: ResolvedProTableDataDndSortable | false,
) {
  if (!dndSortable) {
    return columns
  }

  const { dragHandleColumn } = dndSortable

  if (dragHandleColumn === false) {
    return columns
  }

  const dragHandleColumnKey = (
    dragHandleColumn === true ? defaultDndSortableHandleColumnKey : dragHandleColumn
  ) as string

  const dragHandleColumnIndex = columns.findIndex(column => column.key === dragHandleColumnKey)
  const originalDragHandleColumnIndex = originalColumns.findIndex(column => column.key === dragHandleColumnKey)

  const pickedColumns = [...columns]
  pickedColumns.splice(dragHandleColumnIndex, 1, originalColumns[originalDragHandleColumnIndex])

  return pickedColumns
}

function mergeColumns(
  mergedPrefixCls: string,
  columns: ProTableColumn[],
  config: ProTableConfig,
  slots: Slots,
  dndSortable: ResolvedProTableDataDndSortable | false,
  parentKey?: VKey,
) {
  return insertDragHandleColumn(
    mergedPrefixCls,
    slots,
    columns.map(column => convertMergeColumn(mergedPrefixCls, column, config, slots, dndSortable, parentKey)),
    dndSortable,
  )
}

function convertMergeColumn(
  mergedPrefixCls: string,
  column: ProTableColumn,
  config: ProTableConfig,
  slots: Slots,
  dndSortable: ResolvedProTableDataDndSortable | false,
  parentKey?: VKey,
) {
  const key = ɵGetColumnKey(column)
  const defaultColumn = column.type === 'indexable' ? config.columnIndexable : undefined
  const mergeColumn = { ...defaultColumn, ...column, key, parentKey } as ProTableColumn
  if (column.children?.length) {
    mergeColumn.children = mergeColumns(mergedPrefixCls, column.children, config, slots, dndSortable, key)
  }
  return mergeColumn
}

function isFixed(fixed: 'start' | 'end', column: ProTableColumn, parents: ProTableColumn[]) {
  return column.fixed === fixed || parents.some(parent => parent.fixed === fixed)
}
