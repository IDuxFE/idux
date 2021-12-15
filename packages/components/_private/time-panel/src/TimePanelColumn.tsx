/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject, nextTick, ref } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import PanelCell from './TimePanelCell'
import { usePanelScroll } from './composables/usePanelScroll'
import { timePanelContext } from './tokens'
import { timePanelColumnProps } from './types'

export default defineComponent({
  props: timePanelColumnProps,
  setup(props) {
    const { mergedPrefixCls } = inject(timePanelContext)!
    const listRef = ref<HTMLElement | null>(null)
    const { scrollToSelected, handleScroll, handleScrollAdjust } = usePanelScroll(props, listRef, mergedPrefixCls)

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
            <PanelCell
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
