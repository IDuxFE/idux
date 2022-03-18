/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'

import { offResize, onResize } from '@idux/cdk/utils'

import { overflowItemProps } from './itemTypes'

export default defineComponent({
  name: 'IxOverflowItem',
  props: overflowItemProps,
  setup(props, { slots }) {
    const itemElRef = ref<HTMLElement | undefined>()
    const handleResize = (entry: ResizeObserverEntry) => {
      props.onSizeChange?.(entry.target, props.itemKey ?? '')
    }

    onMounted(() => onResize(itemElRef.value, handleResize))
    onBeforeUnmount(() => {
      offResize(itemElRef.value, handleResize)
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
