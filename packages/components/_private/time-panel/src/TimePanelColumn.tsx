/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject, ref } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import PanelCell from './TimePanelCell'
import { useColumnEvents } from './composables/useColumnEvents'
import { usePanelScroll } from './composables/usePanelScroll'
import { timePanelContext } from './tokens'
import { timePanelColumnProps } from './types'

export default defineComponent({
  props: timePanelColumnProps,
  setup(props) {
    const { mergedPrefixCls } = inject(timePanelContext)!
    const listRef = ref<HTMLElement | null>(null)
    const { handleScroll, handleScrollAdjust } = usePanelScroll(props, listRef, mergedPrefixCls)

    function onChange(value: string | number) {
      callEmit(props.onChange, value)
    }

    const { handleWheel, handleClick } = useColumnEvents(listRef)
    const handleListWheel = (evt: WheelEvent) => {
      evt.preventDefault()
    }

    return () => (
      <div
        class={`${mergedPrefixCls.value}-column`}
        onMouseleave={handleScrollAdjust}
        onMouseenter={handleScrollAdjust}
        onWheel={handleWheel}
        onClick={handleClick}
      >
        <ul
          ref={listRef}
          class={`${mergedPrefixCls.value}-column-inner`}
          onScroll={handleScroll}
          onWheel={handleListWheel}
        >
          {props.options!.map((item, index) => {
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
      </div>
    )
  },
})
