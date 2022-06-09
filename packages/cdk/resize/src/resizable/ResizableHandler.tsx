/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed } from '@vue/reactivity'
import { defineComponent, inject, normalizeClass, ref } from 'vue'

import { type DragPosition, useDraggable } from '@idux/cdk/drag-drop'

import { resizableToken } from './token'
import { resizableHandlerProps } from './types'

export default defineComponent({
  name: 'CdkResizableHandler',
  props: resizableHandlerProps,
  setup(props, { slots }) {
    const { handleStart, handleMove, handleEnd } = inject(resizableToken)!

    const elementRef = ref()

    const onStart = (position: DragPosition, evt: PointerEvent) => handleStart(props.placement, position, evt)
    const onMove = (position: DragPosition, evt: PointerEvent) => handleMove(props.placement, position, evt)
    const onEnd = (position: DragPosition, evt: PointerEvent) => handleEnd(props.placement, position, evt)

    useDraggable(elementRef, { onStart, onMove, onEnd })

    const classes = computed(() => {
      const prefixCls = 'cdk-resizable-handler'
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-${props.placement}`]: true,
      })
    })

    return () => {
      return (
        <div ref={elementRef} class={classes.value}>
          {slots.default?.()}
        </div>
      )
    }
  },
})
