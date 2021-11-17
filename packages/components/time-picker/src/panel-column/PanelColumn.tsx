/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject, nextTick, ref, watch, watchEffect } from 'vue'

import { debounce, isNil } from 'lodash-es'

import { getScroll, scrollToTop } from '@idux/cdk/scroll'
import { callEmit } from '@idux/cdk/utils'

import { timePickerToken } from '../tokens'
import { panelColumnProps } from '../types'
import PanelCell from './PanelCell'

export default defineComponent({
  props: panelColumnProps,
  setup(props) {
    const { mergedPrefixCls } = inject(timePickerToken)!
    const listRef = ref<HTMLElement | null>(null)
    let scrollHandlerLocked = false
    let isScrolling = false
    let scrollTargetIndex: number | undefined

    function getCellHeight() {
      return listRef.value?.querySelector<HTMLLIElement>(`li.${mergedPrefixCls.value}-panel-cell`)?.offsetHeight ?? 0
    }

    function adjustPanel(selectedIndex: number, duration = 200) {
      const target = listRef.value
      if (!target) {
        return
      }

      scrollHandlerLocked = true
      const top = Math.max(selectedIndex * getCellHeight(), 0)
      scrollToTop({ top, target, duration, callback: () => (scrollHandlerLocked = false) })
    }

    function onChange(value: string | number) {
      callEmit(props.onChange, value)
      nextTick(scrollToSelected)
    }

    function scrollToSelected(duration?: number) {
      const selectedIndex = props.options.findIndex(item => item.value === props.selectedValue)
      adjustPanel(selectedIndex, duration)
    }

    const handleScrollEnd = debounce((targetIndex: number) => {
      scrollTargetIndex = targetIndex
      const targetItem = props.options[targetIndex]
      if (!targetItem.disabled) {
        callEmit(props.onChange, targetItem.value)
      }
      nextTick(() => {
        isScrolling = false
      })
    }, 100)
    function handleScrollAdjust() {
      if (isScrolling || scrollHandlerLocked) {
        return
      }

      isNil(scrollTargetIndex) || scrollTargetIndex < 0 ? scrollToSelected() : adjustPanel(scrollTargetIndex)
    }

    function handlePanelScroll() {
      const target = listRef.value
      if (!target || scrollHandlerLocked) {
        return
      }

      isScrolling = true

      const { scrollTop } = getScroll(target)
      const targetIndex = Math.min(Math.round(scrollTop / getCellHeight()), props.options.length - 1)
      handleScrollEnd(targetIndex)
    }

    watchEffect(() => {
      if (props.visible) {
        nextTick(() => scrollToSelected(0))
      }
    })
    watch(
      () => props.selectedValue,
      value => {
        scrollTargetIndex = props.options.findIndex(item => item.value === value)
        if (!isScrolling) {
          nextTick(scrollToSelected)
        }
      },
    )

    return () => (
      <ul
        ref={listRef}
        class={`${mergedPrefixCls.value}-panel-column`}
        onScroll={handlePanelScroll}
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
