/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { type CanDragOptions, CdkDndSortable, type DndSortableReorderInfo, useDndAutoScroll } from '@idux/cdk/dnd'
import { callEmit } from '@idux/cdk/utils'
import { TABLE_TOKEN } from '@idux/components/table'

import { proTableToken } from '../token'

export default defineComponent({
  inheritAttrs: false,
  setup(_, { slots }) {
    const { props, mergedDndSortable, mergedGetKey } = inject(proTableToken)!
    const { isCheckDisabled, scrollBodyRef } = inject(TABLE_TOKEN)!

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
          canDrag={mergedCanDrag.value}
          canDrop={mergedCanDrop.value}
          isSticky={mergedIsSticky.value}
          effect="none"
          onSortReorder={handleSortReorder}
          onSortChange={handleSortChange}
        >
          {slots.default?.()}
        </CdkDndSortable>
      )
    }
  },
})
