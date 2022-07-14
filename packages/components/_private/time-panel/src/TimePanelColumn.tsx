/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject, nextTick, ref, watch, watchEffect } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import PanelCell from './TimePanelCell'
import { useColumnEvents } from './composables/useColumnEvents'
import { usePanelScroll } from './composables/usePanelScroll'
import { timePanelContext } from './tokens'
import { type TimePanelCell, type TimePanelColumnProps, timePanelColumnProps } from './types'

export default defineComponent({
  props: timePanelColumnProps,
  setup(props: TimePanelColumnProps) {
    const { mergedPrefixCls } = inject(timePanelContext)!
    const listRef = ref<HTMLElement | undefined>(undefined)
    const { scrollToActive, getTargetByScrollTop, frameRunning } = usePanelScroll(props, listRef, mergedPrefixCls)

    function onActive(cell: TimePanelCell) {
      callEmit(props.onActiveChange, cell)
    }
    function handleScrollAdjust() {
      scrollToActive()
    }

    const {
      handleWheel,
      handleClick,
      handleScroll: _handleScroll,
    } = useColumnEvents(props, listRef, getTargetByScrollTop, frameRunning)
    const handleListWheel = (evt: WheelEvent) => {
      evt.preventDefault()
    }

    let isScrolling = false
    const handleScroll = () => {
      isScrolling = true
      _handleScroll()
      nextTick(() => {
        isScrolling = false
      })
    }

    watchEffect(() => {
      if (props.visible) {
        nextTick(() => scrollToActive(0))
      }
    })
    watch(
      () => props.activeValue,
      () => {
        !isScrolling && nextTick(scrollToActive)
      },
    )

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
                onActive={onActive}
              />
            )
          })}
        </ul>
      </div>
    )
  },
})
