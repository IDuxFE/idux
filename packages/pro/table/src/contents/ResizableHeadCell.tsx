/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, h, reactive, ref } from 'vue'

import { CdkResizableHandler, type ResizableEvent, type ResizableOptions, useResizable } from '@idux/cdk/resize'
import { callEmit } from '@idux/cdk/utils'

export default defineComponent({
  // eslint-disable-next-line vue/require-prop-types
  props: ['column', 'onResizeEnd'],
  setup(props, { slots }) {
    const elementRef = ref<HTMLDivElement>()
    const onEnd: ResizableEvent = position => {
      callEmit(props.onResizeEnd, props.column.key, position.width)
    }

    const resizableOptions = reactive<ResizableOptions>({
      maxWidth: props.column.maxWidth,
      minWidth: props.column.minWidth,
      onEnd,
    })

    const { resizing, position } = useResizable(elementRef, resizableOptions)

    return () => {
      const children = slots.default ? slots.default() : []
      if (!props.column.resizable) {
        return h('th', null, children)
      }

      children.push(<CdkResizableHandler placement="end" />)

      if (resizing.value) {
        const { width, height } = position.value
        children.push(<div class="cdk-resizable-preview" style={`width:${width}px;height:${height}px`}></div>)
      }

      return h('th', { ref: elementRef }, children)
    }
  },
})
