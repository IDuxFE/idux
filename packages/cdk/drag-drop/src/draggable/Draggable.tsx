/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, h, normalizeClass, onBeforeUnmount, ref, shallowRef, watch } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import { draggableProps } from './types'
import { type DragPosition, useDraggable } from './useDraggable'

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

    return () => {
      if (!draggableResult.value) {
        return null
      }
      const tag = props.is as string
      const { isDragging, position } = draggableResult.value
      const classes = normalizeClass({
        'cdk-draggable': true,
        'cdk-dragging': isDragging.value,
      })
      const { left, top } = position.value
      const style = `left:${left}px;top:${top}px;`
      return h(tag, { ref: elementRef, class: classes, style }, slots)
    }
  },
})
