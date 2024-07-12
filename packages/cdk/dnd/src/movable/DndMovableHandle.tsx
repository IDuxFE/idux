/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject, onMounted, onUnmounted, shallowRef } from 'vue'

import { dndMovableToken } from '../tokens'

export default defineComponent({
  name: 'DndMovableHandle',
  setup(_, { slots }) {
    const { setDragHandle } = inject(dndMovableToken)!

    const dragHandleRef = shallowRef<HTMLElement>()

    onMounted(() => {
      setDragHandle(dragHandleRef.value)
    })
    onUnmounted(() => {
      setDragHandle(undefined)
    })

    return () => (
      <div class="cdk-dnd-movable-handle" ref={dragHandleRef}>
        {slots.default?.()}
      </div>
    )
  },
})
