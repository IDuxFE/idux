/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject, nextTick, ref } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import SelectorCell from './TimeSelectorCell'
import { useSelectorScroll } from './composables/useSelectorScroll'
import { timeSelectorContext } from './tokens'
import { timeSelectorColumnProps } from './types'

export default defineComponent({
  props: timeSelectorColumnProps,
  setup(props) {
    const { mergedPrefixCls } = inject(timeSelectorContext)!
    const listRef = ref<HTMLElement | null>(null)
    const { scrollToSelected, handleScroll, handleScrollAdjust } = useSelectorScroll(props, listRef, mergedPrefixCls)

    function onChange(value: string | number) {
      callEmit(props.onChange, value)
      nextTick(scrollToSelected)
    }

    return () => (
      <ul
        ref={listRef}
        class={`${mergedPrefixCls.value}-column`}
        onScroll={handleScroll}
        onMousemove={handleScrollAdjust}
        onMouseenter={handleScrollAdjust}
      >
        {props.options.map((item, index) => {
          const { disabled, value } = item
          return (
            <SelectorCell
              key={index}
              disabled={disabled}
              selected={props.selectedValue === value}
              value={value}
              onChange={onChange}
            />
          )
        })}
      </ul>
    )
  },
})
