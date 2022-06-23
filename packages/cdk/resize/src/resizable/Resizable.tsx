/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, ref } from 'vue'

import ResizableHandle from './ResizableHandle'
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

    const style = computed(() => {
      if (!props.free) {
        return undefined
      }
      const { width, height } = position.value
      return `width: ${width}px;height: ${height}px`
    })

    return () => {
      const { handlers, is: Tag } = props
      return (
        <Tag ref={elementRef} class={classes.value} style={style.value}>
          {slots.default?.()}
          {handlers.map(placement => (
            <ResizableHandle key={placement} placement={placement} />
          ))}
        </Tag>
      )
    }
  },
})
