/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProTableColumn } from '../types'
import type { VKey } from '@idux/cdk/utils'

import { type PropType, defineComponent, inject } from 'vue'

import { IxIcon } from '@idux/components/icon'
import { IxTree, type TreeDragDropOptions, type TreeProps } from '@idux/components/tree'

import { proTableToken } from '../token'
import { getColumnTitle } from '../utils'

export default defineComponent({
  props: {
    columns: { type: Array as PropType<ProTableColumn[]>, required: true },
    checkedKeys: { type: Array as PropType<VKey[]>, required: true },
    searchValue: { type: String, default: undefined },
    title: { type: String, default: undefined },
    onDrop: { type: Function as PropType<(options: TreeDragDropOptions) => void>, required: true },
    onFixedChange: {
      type: Function as PropType<(column: ProTableColumn, fixed: 'start' | 'end' | undefined) => void>,
      required: true,
    },
    onVisibleChange: {
      type: Function as PropType<(showedKeys: Set<VKey>, hiddenKeys: Set<VKey>) => void>,
      required: true,
    },
  },
  setup(props) {
    const { locale, mergedPrefixCls } = inject(proTableToken)!

    const onCheckedChange = (checkedKeys: VKey[]) => {
      const visibleKeySet = new Set(checkedKeys)
      const oldVisibleKeys = new Set(props.checkedKeys)

      checkedKeys.forEach(key => {
        if (oldVisibleKeys.has(key)) {
          visibleKeySet.delete(key)
          oldVisibleKeys.delete(key)
        }
      })

      props.onVisibleChange(visibleKeySet, oldVisibleKeys)
    }

    const onDrop = (options: TreeDragDropOptions) => {
      const { dragNode, dropNode } = options

      const dragKey = dragNode?.key
      const dropKey = dropNode?.key
      if (!dragKey || !dropKey) {
        return
      }

      props.onDrop!(options)
    }

    const onFixedChange = (fixed: 'start' | 'end' | undefined, column: ProTableColumn, evt: MouseEvent) => {
      evt.preventDefault()
      evt.stopImmediatePropagation()
      props.onFixedChange(column, fixed)
    }

    return () => {
      // 不要显示空状态
      if (props.columns.length === 0) {
        return
      }

      const prefixCls = `${mergedPrefixCls.value}-layout-tool-tree`
      const { columns, searchValue, title } = props
      const { startPin, endPin, noPin } = locale.table.layout

      const treeProps: TreeProps = {
        blocked: true,
        cascaderStrategy: 'child',
        checkable: true,
        checkedKeys: props.checkedKeys,
        checkOnClick: true,
        draggable: true,
        dataSource: columns,
        disabled: disableColumn,
        empty: '',
        childrenKey: 'children',
        getKey: 'key',
        labelKey: 'title',
        searchValue,
        searchFn: () => true,
        onCheckedChange,
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
              <IxIcon
                name="vertical-align-center"
                title={noPin}
                onClick={evt => onFixedChange(undefined, node, evt)}
              />,
              <IxIcon
                name="vertical-align-top"
                rotate={180}
                title={endPin}
                onClick={evt => onFixedChange('end', node, evt)}
              />,
            ]
          }
          if (fixed === 'end') {
            return [
              <IxIcon name="vertical-align-top" title={startPin} onClick={evt => onFixedChange('start', node, evt)} />,
              <IxIcon
                name="vertical-align-center"
                title={noPin}
                onClick={evt => onFixedChange(undefined, node, evt)}
              />,
            ]
          }
          return [
            <IxIcon name="vertical-align-top" title={startPin} onClick={evt => onFixedChange('start', node, evt)} />,
            <IxIcon
              name="vertical-align-top"
              rotate={180}
              title={endPin}
              onClick={evt => onFixedChange('end', node, evt)}
            />,
          ]
        },
      }

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
  return {
    check: changeVisible === false,
    select: changeVisible === false,
    drag: changeIndex === false,
  }
}
