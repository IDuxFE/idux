/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import {
  type CanDragOptions,
  CdkDndSortable,
  type DndSortableOnDragStartArgs,
  type DndSortableOnDropArgs,
  type DndSortableReorderInfo,
  type DndSortableStrategy,
  useDndAutoScroll,
} from '@idux/cdk/dnd'
import { type VKey, callEmit } from '@idux/cdk/utils'
import { TABLE_TOKEN } from '@idux/components/table'

import { proTableToken } from '../token'

export default defineComponent({
  inheritAttrs: false,
  setup(_, { slots }) {
    const { props, mergedDndSortable, mergedGetKey } = inject(proTableToken)!
    const {
      isCheckDisabled,
      expandable,
      mergedChildrenKey,
      scrollBodyRef,
      isTreeData,
      expandedRowKeys,
      setRowExpanded,
    } = inject(TABLE_TOKEN)!

    const mergedCanDrag = computed(() => {
      if (!mergedDndSortable.value) {
        return false
      }

      const { canDrag } = mergedDndSortable.value

      return canDrag ?? (({ sourceKey }: CanDragOptions) => !isCheckDisabled(sourceKey))
    })
    const mergedCanDrop = computed(() => {
      if (!mergedDndSortable.value) {
        return false
      }

      return mergedDndSortable.value.canDrop ?? true
    })
    const mergedIsSticky = computed(() => {
      if (!mergedDndSortable.value) {
        return false
      }

      return mergedDndSortable.value.isSticky ?? true
    })

    const isTreeItemExpanded = (key: VKey) => expandedRowKeys.value.includes(key)

    let currentDragKey: VKey | null = null
    let currentDragItemExpanded = false

    const strategy = computed<DndSortableStrategy>(() => {
      if (!isTreeData.value) {
        return 'list'
      }
      return 'tree'
    })
    const handleDragStart = computed(() => {
      if (!isTreeData.value) {
        return undefined
      }
      return ({ key }: DndSortableOnDragStartArgs) => {
        currentDragKey = key
        currentDragItemExpanded = isTreeItemExpanded(key)

        if (currentDragItemExpanded) {
          setRowExpanded(key, false)
        }
      }
    })
    const handleDrop = computed(() => {
      if (!isTreeData.value) {
        return undefined
      }
      return ({ sourceKey }: DndSortableOnDropArgs) => {
        if (currentDragKey === sourceKey && currentDragItemExpanded) {
          setRowExpanded(sourceKey, true)
          currentDragKey = null
          currentDragItemExpanded = false
        }
      }
    })

    const autoScrollRef = computed(() => {
      if (!mergedDndSortable.value || !mergedDndSortable.value.autoScroll) {
        return
      }

      return scrollBodyRef.value
    })

    useDndAutoScroll(autoScrollRef, {
      canScroll: true,
      allowedAxis: 'vertical',
    })

    const handleSortReorder = (reorderInfo: DndSortableReorderInfo) => {
      callEmit(props.onDndSortReorder, reorderInfo)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSortChange = (newDataSource: any[], oldDataSource: any[]) => {
      callEmit(props.onDndSortChange, newDataSource, oldDataSource)
    }

    return () => {
      return (
        <CdkDndSortable
          tag="tbody"
          dataSource={props.dataSource}
          getKey={mergedGetKey.value}
          childrenKey={mergedChildrenKey.value}
          canDrag={mergedCanDrag.value}
          canDrop={mergedCanDrop.value}
          isSticky={mergedIsSticky.value}
          strategy={strategy.value}
          isTreeItemExpanded={isTreeItemExpanded}
          treeIndent={expandable.value?.indent}
          effect="none"
          onSortReorder={handleSortReorder}
          onSortChange={handleSortChange}
          onDragStart={handleDragStart.value}
          onDrop={handleDrop.value}
        >
          {slots.default?.()}
        </CdkDndSortable>
      )
    }
  },
})
