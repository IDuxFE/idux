/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject, onMounted, onUnmounted, shallowRef } from 'vue'

import { dndSortableItemToken } from '../tokens'

export default defineComponent({
  name: 'DndSortableHandle',
  setup(_, { slots }) {
    const { setDragHandle } = inject(dndSortableItemToken)!

    const dragHandleRef = shallowRef<HTMLElement>()

    onMounted(() => {
      setDragHandle(dragHandleRef.value)
    })
    onUnmounted(() => {
      setDragHandle(undefined)
    })

    return () => (
      <div class="cdk-dnd-sortable-handle" ref={dragHandleRef}>
        {slots.default?.()}
      </div>
    )
  },
})
