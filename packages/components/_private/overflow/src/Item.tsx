/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, onUnmounted, ref } from 'vue'

import { useResizeObserver } from '@idux/cdk/resize'
import { callEmit } from '@idux/cdk/utils'

import { overflowItemProps } from './types'

export default defineComponent({
  name: 'IxOverflowItem',
  props: overflowItemProps,
  setup(props, { slots }) {
    const itemElRef = ref<HTMLElement | undefined>()
    const handleResize = (entry: ResizeObserverEntry) => callEmit(props.onSizeChange, entry, props.itemKey ?? '')
    useResizeObserver(itemElRef, handleResize)
    onUnmounted(() => {
      callEmit(props.onSizeChange, undefined, props.itemKey ?? '')
    })

    return () => {
      return (
        <div v-show={props.display} class={`${props.prefixCls}-item`} ref={itemElRef}>
          {slots.default?.()}
        </div>
      )
    }
  },
})
