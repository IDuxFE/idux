/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, reactive, ref } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import { useDraggable } from '../composables/useDraggable'
import { type DragPosition } from '../types'
import { draggableProps } from './types'

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

    const draggableOptions = reactive({
      boundary: props.boundary,
      free: props.free,
      onDragStart,
      onDrag,
      onDragEnd,
    })

    const { dragging } = useDraggable(elementRef, draggableOptions)

    const classes = computed(() => {
      return normalizeClass({
        'cdk-draggable': true,
        'cdk-draggable-disabled': props.disabled,
        'cdk-draggable-dragging': dragging.value,
      })
    })

    return () => {
      const Tag = props.is as string
      return <Tag ref={elementRef} class={classes.value} style={style} v-slots={slots}></Tag>
    }
  },
})
