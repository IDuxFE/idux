/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass } from 'vue'

import { resizableToken } from './token'
import { resizableHandleProps } from './types'

export default defineComponent({
  name: 'CdkResizableHandle',
  props: resizableHandleProps,
  setup(props, { slots }) {
    const { handleResizeStart } = inject(resizableToken)!

    const onPointerDown = (evt: PointerEvent) => handleResizeStart(props.placement, evt)

    const classes = computed(() => {
      const prefixCls = 'cdk-resizable-handle'
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-${props.placement}`]: true,
      })
    })

    return () => {
      return (
        <div class={classes.value} onPointerdown={onPointerDown}>
          {slots.default?.()}
        </div>
      )
    }
  },
})
