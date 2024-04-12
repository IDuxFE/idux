/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TreeDragDropOptions } from '@idux/components/tree'

import { computed, defineComponent, inject, normalizeClass } from 'vue'

import { type VKey, callEmit, filterTree, mapTree, useControlledProp } from '@idux/cdk/utils'
import { ɵInput } from '@idux/components/_private/input'
import { IxButton } from '@idux/components/button'
import { IxCheckbox } from '@idux/components/checkbox'
import { IxEmpty } from '@idux/components/empty'

import LayoutToolTree from './LayoutToolTree'
import { proTableToken } from '../token'
import { type ProTableColumn, type ProTableColumnBase, proTableLayoutToolContentProps } from '../types'

enum ToolTreeKey {
  start,
  center,
  end,
}

export default defineComponent({
  props: proTableLayoutToolContentProps,
  setup(props) {
    const {
      locale,
      mergedPrefixCls,
      mergedColumns,
      checkedColumnKeys,
      setMergedColumns,
      mergedColumnMap,
      resetColumns,
    } = inject(proTableToken)!

    // 判断是否有子节点，处理tree展开节点样式
    const hasChildren = computed(() => mergedColumns.value.length !== mergedColumnMap.value.size)

    // 只需要判断第一层的即可
    const hiddenColumns = computed(() => mergedColumns.value.filter(column => column.visible === false))

    const [searchValue, setSearchValue] = useControlledProp(props, 'searchValue')

    const filteredColumns = computed(() => {
      const lowerCasedSearchValue = searchValue.value?.toLowerCase()

      return filterTree(
        mergedColumns.value as (ProTableColumn & { children?: ProTableColumn[] })[],
        'children',
        column => {
          if (column.layoutable === false) {
            return false
          }

          if (!lowerCasedSearchValue) {
            return true
          }

          const { title } = column as ProTableColumnBase

          return title ? title.toLowerCase().includes(lowerCasedSearchValue) : false
        },
      ) as ProTableColumn[]
    })
    const groupedColumns = computed(() => groupColumns(filteredColumns.value))

    const handleInput = (evt: Event) => {
      const inputValue = (evt.target as HTMLInputElement).value
      setSearchValue(inputValue)
    }

    const handleReset = (evt: MouseEvent) => {
      const result = callEmit(props.onReset, evt)
      result !== false && resetColumns()
    }

    const handleCheckAll = (checked: boolean) => {
      const newColumns = mapTree(
        mergedColumns.value as (ProTableColumn & { children?: ProTableColumn[] })[],
        'children',
        (column, parents) => {
          const newColumn = { ...column } as ProTableColumn

          if (
            !column.children?.length &&
            column.changeVisible !== false &&
            column.layoutable !== false &&
            parents.every(parent => parent.layoutable !== false)
          ) {
            newColumn.visible = checked
          }

          return newColumn
        },
      )

      setMergedColumns(newColumns)
    }

    const handleFixedChange = (changedColumn: ProTableColumn, fixed: 'start' | 'end' | undefined) => {
      const newColumns = mapTree(
        mergedColumns.value as (ProTableColumn & { children?: ProTableColumn[] })[],
        'children',
        (column, parents) => {
          const newColumn = { ...column } as ProTableColumn

          if (column.key === changedColumn.key || parents.some(parent => parent.key === changedColumn.key)) {
            newColumn.fixed = fixed
          }

          return newColumn
        },
      )

      setMergedColumns(newColumns)
    }

    const handleVisibleChange = (showedKeySet: Set<VKey>, hiddenKeys: Set<VKey>) => {
      const newColumns = mapTree(
        mergedColumns.value as (ProTableColumn & { children?: ProTableColumn[] })[],
        'children',
        column => {
          const newColumn = { ...column } as ProTableColumn
          if (showedKeySet.has(column.key!)) {
            newColumn.visible = true
          }

          if (hiddenKeys.has(column.key!)) {
            newColumn.visible = false
          }

          return newColumn
        },
      )

      setMergedColumns(newColumns)
    }

    const handleDrop = (key: ToolTreeKey, options: TreeDragDropOptions) => {
      const { dragNode, dropNode, dropType } = options

      const dragKey = dragNode?.key
      const dropKey = dropNode?.key
      if (!dragKey || !dropKey) {
        return
      }

      const { startColumns, centerColumns, endColumns } = groupColumns(mergedColumns.value)

      const processedColumns = [startColumns, centerColumns, endColumns].reduce((res, columns, index) => {
        if (index === key) {
          return res.concat(getDropColumns(columns, dragKey, dropKey, dropType))
        }

        return res.concat(columns)
      }, [] as ProTableColumn[])

      setMergedColumns(processedColumns)
    }

    return () => {
      const { startColumns, centerColumns, endColumns } = groupedColumns.value

      const hasStartFixed = startColumns.length > 0
      const hasEndFixed = endColumns.length > 0
      const withFixed = hasStartFixed || hasEndFixed

      const prefixCls = `${mergedPrefixCls.value}-layout-tool`
      const classes = normalizeClass({
        [`${prefixCls}-content`]: true,
        [`${prefixCls}-with-fixed`]: withFixed,
        [`${prefixCls}-with-children`]: hasChildren.value,
      })

      const { placeholder, all, reset, startPinTitle, noPinTitle, endPinTitle } = locale.table.layout

      const settingLength = mergedColumns.value.length
      const hiddenLength = hiddenColumns.value.length
      const checked = hiddenLength === 0 && settingLength !== 0
      const indeterminate = hiddenLength > 0 && hiddenLength !== settingLength
      const _searchValue = searchValue.value
      return (
        <div class={classes}>
          {props.searchable && (
            <div class={`${prefixCls}-search-wrapper`}>
              <ɵInput
                placeholder={props.placeholder ?? placeholder}
                size="sm"
                suffix="search"
                value={_searchValue}
                onInput={handleInput}
              />
            </div>
          )}
          <div class={`${prefixCls}-select-wrapper`}>
            <IxCheckbox checked={checked} indeterminate={indeterminate} label={all} onChange={handleCheckAll} />
            {props.resetable && (
              <IxButton size="sm" mode="link" onClick={handleReset}>
                {reset}
              </IxButton>
            )}
          </div>
          {filteredColumns.value.length ? (
            <div class={`${prefixCls}-tree-wrapper`}>
              {hasStartFixed && (
                <LayoutToolTree
                  key="start"
                  columns={startColumns}
                  checkedKeys={checkedColumnKeys.value.start}
                  searchValue={_searchValue}
                  title={startPinTitle}
                  onDrop={(options: TreeDragDropOptions) => handleDrop(ToolTreeKey.start, options)}
                  onFixedChange={handleFixedChange}
                  onVisibleChange={handleVisibleChange}
                />
              )}
              {(!withFixed || centerColumns.length > 0) && (
                <LayoutToolTree
                  key="center"
                  columns={centerColumns}
                  checkedKeys={checkedColumnKeys.value.center}
                  searchValue={_searchValue}
                  title={withFixed ? noPinTitle : undefined}
                  onDrop={(options: TreeDragDropOptions) => handleDrop(ToolTreeKey.center, options)}
                  onFixedChange={handleFixedChange}
                  onVisibleChange={handleVisibleChange}
                />
              )}
              {hasEndFixed && (
                <LayoutToolTree
                  key="end"
                  columns={endColumns}
                  checkedKeys={checkedColumnKeys.value.end}
                  searchValue={_searchValue}
                  title={endPinTitle}
                  onDrop={(options: TreeDragDropOptions) => handleDrop(ToolTreeKey.end, options)}
                  onFixedChange={handleFixedChange}
                  onVisibleChange={handleVisibleChange}
                />
              )}
            </div>
          ) : (
            <IxEmpty simple />
          )}
        </div>
      )
    }
  },
})

function groupColumns(mergedColumns: ProTableColumn[]) {
  const startColumns: ProTableColumn[] = []
  const endColumns: ProTableColumn[] = []
  const centerColumns: ProTableColumn[] = []

  mergedColumns.forEach(column => {
    const { fixed } = column
    if (fixed === 'start') {
      startColumns.push(column)
    } else if (fixed === 'end') {
      endColumns.push(column)
    } else {
      centerColumns.push(column)
    }
  })

  return { startColumns, endColumns, centerColumns }
}

function getDropColumns(columns: ProTableColumn[], dragKey: VKey, dropKey: VKey, dropType: string | undefined) {
  const newColumns = [...columns]
  // 原数据中移除被拖拽的节点
  let dragColumn: ProTableColumn
  findTargetColumn(newColumns, dragKey, (column, index, columns) => {
    dragColumn = column
    columns.splice(index, 1)
  })

  if (dropType === 'inside') {
    findTargetColumn(newColumns, dropKey, item => {
      // 添加到头部
      ;(item as ProTableColumnBase).children!.unshift(dragColumn)
    })
  } else {
    let targetIndex: number
    let targetColumns: ProTableColumn[] = []

    findTargetColumn(newColumns, dropKey, (_, index, columns) => {
      targetIndex = index
      targetColumns = columns
    })

    if (dropType === 'before') {
      targetColumns.splice(targetIndex!, 0, dragColumn!)
    } else {
      targetColumns.splice(targetIndex! + 1, 0, dragColumn!)
    }
  }
  return newColumns
}

function findTargetColumn(
  columns: ProTableColumn[],
  key: VKey,
  callback: (column: ProTableColumn, index: number, columns: ProTableColumn[]) => void,
) {
  for (let index = 0; index < columns.length; index++) {
    const column = columns[index]
    if (column.key! === key) {
      return callback(column, index, columns)
    }
    if ('children' in column && column.children) {
      findTargetColumn(column.children, key, callback)
    }
  }
}
