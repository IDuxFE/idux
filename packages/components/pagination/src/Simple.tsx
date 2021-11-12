/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, ref, watch, watchEffect } from 'vue'

import { IxInput } from '@idux/components/input'

import Item from './Item'
import { paginationToken } from './token'
import { useJumpToIndex } from './utils'

export default defineComponent({
  setup() {
    const { props, config, activeIndex, activeSize } = inject(paginationToken)!
    const size = computed(() => props.size ?? config.size)
    const lastIndex = ref(0)
    const isFirstIndex = ref(false)
    const isLastIndex = ref(false)

    watchEffect(() => {
      const _lastIndex = Math.ceil(props.total / activeSize.value)
      lastIndex.value = _lastIndex
      isFirstIndex.value = activeIndex.value === 1
      isLastIndex.value = activeIndex.value === _lastIndex
    })

    const inputValue = ref(activeIndex.value.toString())
    watch(activeIndex, value => {
      inputValue.value = value.toString()
    })

    const jumpToIndex = useJumpToIndex(false)

    return () => {
      return (
        <>
          <Item disabled={isFirstIndex.value} type="prev" />
          <li class="ix-pagination-item">
            <IxInput
              v-model={[inputValue.value, 'value']}
              disabled={props.disabled}
              size={size.value}
              onKeydown={jumpToIndex}
            />
            <span class="ix-pagination-item-slash">/</span>
            <span>{lastIndex.value}</span>
          </li>
          <Item disabled={isLastIndex.value} type="next" />
        </>
      )
    }
  },
})
