/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, reactive, ref, watch } from 'vue'

import { CdkResizableHandle, type ResizableEvent, type ResizableOptions, useResizable } from '@idux/cdk/resize'
import { callEmit } from '@idux/cdk/utils'

export default defineComponent({
  // eslint-disable-next-line vue/require-prop-types
  props: ['column', 'onClick', 'onResizeEnd'],
  setup(props, { slots }) {
    const elementRef = ref<HTMLDivElement>()
    const onResizeEnd: ResizableEvent = position => {
      callEmit(props.onResizeEnd, props.column.key, position.width, position.offsetWidth)
    }
    const resizableOptions = reactive<ResizableOptions>({
      maxWidth: props.column.maxWidth,
      minWidth: props.column.minWidth,
      onResizeEnd,
    })
    const { resizing, position } = useResizable(elementRef, resizableOptions)

    const canTriggerClick = ref(!resizing.value)
    watch(resizing, value => {
      if (value) {
        canTriggerClick.value = false
      } else {
        // 拖拽结束的瞬间会触发 th 的 click 事件, 如果开启了 sortable, 就会触发排序
        // 这里用 setTimeout 做一下延迟
        setTimeout(() => (canTriggerClick.value = true))
      }
    })
    const onClick = (evt: MouseEvent) => {
      if (canTriggerClick.value) {
        callEmit(props.onClick, evt)
      }
    }

    return () => {
      if (!props.column.resizable) {
        return <th onClick={onClick}>{slots.default?.()}</th>
      }

      const children = [<CdkResizableHandle placement="end" />]
      if (resizing.value) {
        const { width, height } = position.value
        children.push(<div class="cdk-resizable-preview" style={`width:${width}px;height:${height}px`}></div>)
      }
      return (
        <th ref={elementRef} onClick={onClick}>
          {slots.default?.()}
          {children}
        </th>
      )
    }
  },
})
