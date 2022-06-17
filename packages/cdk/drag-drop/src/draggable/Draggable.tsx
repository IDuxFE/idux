/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DragPosition } from '../types'

import { defineComponent, h, normalizeClass, onBeforeUnmount, ref, shallowRef, watch } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import { useDraggable } from '../composables/useDraggable'
import { draggableProps } from './types'

const classes = () =>
  normalizeClass({
    'cdk-draggable': true,
  })
const style = {
  width: 'fit-content',
  height: 'fit-content',
}

export default defineComponent({
  name: 'CdkDraggable',
  props: draggableProps,
  setup(props, { slots }) {
    const elementRef = ref()

    const onDragStart = (evt: DragEvent, position?: DragPosition) => callEmit(props.onDragStart, evt, position)
    const onDrag = (evt: DragEvent, position?: DragPosition) => callEmit(props.onDrag, evt, position)
    const onDragEnd = (evt: DragEvent, position?: DragPosition) => callEmit(props.onDragEnd, evt, position)

    const draggableResult = shallowRef()

    const cleanup = () => {
      if (draggableResult.value) {
        draggableResult.value = undefined
      }
    }

    watch(
      [() => props.disabled, () => props.free, () => props.boundary],
      ([disabled, free, boundary]) => {
        cleanup()
        if (!disabled) {
          draggableResult.value = useDraggable(elementRef, {
            onDragStart,
            onDrag,
            onDragEnd,
            free,
            boundary,
          })
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
      return h(tag, { ref: elementRef, class: classes(), style }, slots)
    }
  },
})
