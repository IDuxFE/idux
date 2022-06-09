/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type CSSProperties, computed, defineComponent, h, normalizeClass, ref } from 'vue'

import ResizableHandler from './ResizableHandler'
import { resizableProps } from './types'
import { useResizable } from './useResizable'

export default defineComponent({
  name: 'CdkResizable',
  props: resizableProps,
  setup(props, { slots }) {
    const elementRef = ref<HTMLDivElement>()
    const { resizing, position } = useResizable(elementRef, props)

    const classes = computed(() => {
      const prefixCls = 'cdk-resizable'
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-resizing`]: resizing.value,
      })
    })

    const style = computed<CSSProperties>(() => {
      const { width, height } = position.value
      return {
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
      }
    })

    return () => {
      const { disabled, handlers, is: tag } = props
      const children = slots.default ? slots.default() : []

      handlers.forEach(placement => {
        children.push(<ResizableHandler key={placement} placement={placement} disabled={disabled} />)
      })

      return h(tag as string, { ref: elementRef, class: classes.value, style: style.value }, children)
    }
  },
})
