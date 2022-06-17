/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass, ref } from 'vue'

import { useEventListener } from '@idux/cdk'

import { resizableToken } from './token'
import { resizableHandlerProps } from './types'

export default defineComponent({
  name: 'CdkResizableHandler',
  props: resizableHandlerProps,
  setup(props, { slots }) {
    const { handleResizeStart, handleResizing, handleResizeEnd } = inject(resizableToken)!

    const elementRef = ref()

    const onDragStart = (evt: PointerEvent) => handleResizeStart(props.placement, evt)
    const onDrag = (evt: PointerEvent) => handleResizing(props.placement, evt)
    const onDragEnd = (evt: PointerEvent) => handleResizeEnd(props.placement, evt)

    const classes = computed(() => {
      const prefixCls = 'cdk-resizable-handler'
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-${props.placement}`]: true,
      })
    })

    useEventListener(elementRef, 'pointerdown', onDragStart, true)
    useEventListener(document, 'pointermove', onDrag, true)
    useEventListener(document, 'pointerup', onDragEnd, true)

    return () => {
      return (
        <div ref={elementRef} class={classes.value}>
          {slots.default?.()}
        </div>
      )
    }
  },
})
