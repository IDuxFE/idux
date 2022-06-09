/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed } from '@vue/reactivity'
import { defineComponent, h, normalizeClass, onBeforeUnmount, ref, shallowRef, watch } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import { type DragPosition, draggableProps } from './types'
import { useDraggable } from './useDraggable'

export default defineComponent({
  name: 'CdkDraggable',
  props: draggableProps,
  setup(props, { slots }) {
    const elementRef = ref()
    const onStart = (position: DragPosition, evt: PointerEvent) => callEmit(props.onStart, position, evt)
    const onMove = (position: DragPosition, evt: PointerEvent) => callEmit(props.onMove, position, evt)
    const onEnd = (position: DragPosition, evt: PointerEvent) => callEmit(props.onEnd, position, evt)

    const draggableResult = shallowRef()

    const cleanup = () => {
      if (draggableResult.value) {
        draggableResult.value.stop()
        draggableResult.value = undefined
      }
    }

    watch(
      [() => props.disabled],
      ([disabled]) => {
        cleanup()
        if (!disabled) {
          draggableResult.value = useDraggable(elementRef, { onStart, onMove, onEnd })
        }
      },
      {
        immediate: true,
        flush: 'post',
      },
    )

    onBeforeUnmount(cleanup)

    const classed = computed(() => {
      const { dragging } = draggableResult.value
      return normalizeClass({
        'cdk-draggable': true,
        'cdk-dragging': dragging.value,
      })
    })

    return () => {
      if (!draggableResult.value) {
        return null
      }
      const tag = props.is as string
      const { position } = draggableResult.value
      const { left, top } = position.value
      const style = `left:${left}px;top:${top}px;`
      return h(tag, { ref: elementRef, class: classed.value, style }, slots)
    }
  },
})
