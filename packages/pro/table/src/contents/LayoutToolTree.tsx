/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type PropType, computed, defineComponent, inject } from 'vue'

import { type VKey, useKey } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'
import { IxTree, type TreeDragDropOptions, type TreeProps } from '@idux/components/tree'

import { proTableToken } from '../token'
import { type ProTableColumn, type ProTableColumnBase } from '../types'
import { getColumnTitle, loopColumns } from '../utils'

export default defineComponent({
  props: {
    columns: { type: Array as PropType<ProTableColumn[]>, required: true },
    searchValue: { type: String, default: undefined },
    title: { type: String, default: undefined },
    onDrop: { type: Function, required: true },
    onFixedChange: { type: Function, required: true },
    onVisibleChange: { type: Function, required: true },
  },
  setup(props) {
    const key = useKey()
    const { locale, mergedPrefixCls } = inject(proTableToken)!

    const checkedKeys = computed(() => getCheckedKeys(props.columns))

    const onCheck = (checked: boolean, column: ProTableColumn) => {
      if (!column.children) {
        column.visible = checked
      } else {
        loopColumns(column.children, child => {
          if (!child.children && child.changeVisible !== false) {
            child.visible = checked
          }
        })
      }
      props.onVisibleChange()
    }

    const onDrop = (options: TreeDragDropOptions) => {
      const { dragNode, dropNode, dropType } = options

      const dragKey = dragNode?.key
      const dropKey = dropNode?.key
      if (!dragKey || !dropKey) {
        return
      }

      const columns = getDropColumns(props.columns, dragKey, dropKey, dropType)
      props.onDrop!(key, columns)
    }

    const onFixedChange = (fixed: 'start' | 'end' | undefined, column: ProTableColumn) => {
      column.fixed = fixed
      loopColumns(column.children, child => {
        child.fixed = fixed
      })
      props.onFixedChange()
    }

    return () => {
      const dataSource = props.columns.filter(column => column.layoutable !== false)
      // 不要显示空状态
      if (dataSource.length === 0) {
        return
      }

      const { searchValue, title } = props
      const { startPin, endPin, noPin } = locale.table.layout

      const treeProps: TreeProps = {
        blocked: true,
        cascaderStrategy: 'all',
        checkable: true,
        checkedKeys: checkedKeys.value,
        draggable: true,
        dataSource,
        disabled: disableColumn,
        empty: '',
        childrenKey: 'children',
        getKey: 'key',
        labelKey: 'title',
        searchValue,
        onCheck,
        onDrop,
      }

      const treeSlots = {
        label: ({ node }: { node: ProTableColumn }) => getColumnTitle(node, locale.table),
        suffix: ({ node }: { node: ProTableColumn }) => {
          if (node.changeFixed === false || node.parentKey != null) {
            return null
          }

          const { fixed } = node
          if (fixed === 'start') {
            return [
              <IxIcon name="vertical-align-center" title={noPin} onClick={() => onFixedChange(undefined, node)} />,
              <IxIcon
                name="vertical-align-top"
                rotate={180}
                title={endPin}
                onClick={() => onFixedChange('end', node)}
              />,
            ]
          }
          if (fixed === 'end') {
            return [
              <IxIcon name="vertical-align-top" title={startPin} onClick={() => onFixedChange('start', node)} />,
              <IxIcon name="vertical-align-center" title={noPin} onClick={() => onFixedChange(undefined, node)} />,
            ]
          }
          return [
            <IxIcon name="vertical-align-top" title={startPin} onClick={() => onFixedChange('start', node)} />,
            <IxIcon name="vertical-align-top" rotate={180} title={endPin} onClick={() => onFixedChange('end', node)} />,
          ]
        },
      }

      const prefixCls = `${mergedPrefixCls.value}-layout-tool-tree`

      return (
        <div class={prefixCls}>
          {title && <div class={`${prefixCls}-title`}>{title}</div>}
          <IxTree {...treeProps} v-slots={treeSlots} />
        </div>
      )
    }
  },
})

function disableColumn(column: ProTableColumn) {
  const { changeIndex, changeVisible } = column
  if (changeIndex !== false && changeVisible !== false) {
    return false
  }
  return { check: changeVisible === false, drag: changeIndex === false }
}

function getCheckedKeys(columns: ProTableColumn[]) {
  const keys: VKey[] = []
  findDisplayKeys(columns, keys)
  return keys
}

function findDisplayKeys(columns: ProTableColumn[], keys: VKey[]) {
  for (let index = 0; index < columns.length; index++) {
    const column = columns[index]
    if (column.visible === false) {
      continue
    }
    if ('children' in column && column.children) {
      findDisplayKeys(column.children, keys)
    } else {
      keys.push(column.key!)
    }
  }
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
