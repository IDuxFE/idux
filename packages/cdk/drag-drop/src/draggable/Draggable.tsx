/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DnDEventType, DnDPosition } from '../types'

import { computed, defineComponent, normalizeClass, reactive, ref } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import { draggableProps } from './types'
import { useDraggable } from '../composables/useDraggable'

const style = {
  width: 'fit-content',
  height: 'fit-content',
}

export default defineComponent({
  name: 'CdkDraggable',
  props: draggableProps,
  setup(props, { slots }) {
    const elementRef = ref()

    const onDragStart = (evt: DnDEventType, position?: DnDPosition) => callEmit(props.onDragStart, evt, position)
    const onDrag = (evt: DnDEventType, position?: DnDPosition) => callEmit(props.onDrag, evt, position)
    const onDragEnd = (evt: DnDEventType, position?: DnDPosition) => callEmit(props.onDragEnd, evt, position)

    const draggableOptions = reactive({
      boundary: props.boundary,
      free: props.free,
      backend: props.backend,
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
