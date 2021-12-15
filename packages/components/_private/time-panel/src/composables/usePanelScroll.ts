/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimePanelColumnProps } from '../types'
import type { ComputedRef, Ref } from 'vue'

import { nextTick, watch, watchEffect } from 'vue'

import { isNil } from 'lodash-es'

import { getScroll, scrollToTop } from '@idux/cdk/scroll'
import { callEmit } from '@idux/cdk/utils'

export interface PanelColumnScroll {
  adjustPanel: (selectedIndex: number, duration?: number) => void
  scrollToSelected: (duration?: number) => void
  handleScrollAdjust: () => void
  handleScroll: () => void
}

export function usePanelScroll(
  props: TimePanelColumnProps,
  listRef: Ref<HTMLElement | null>,
  mergedPrefixCls: ComputedRef<string>,
): PanelColumnScroll {
  let scrollHandlerLocked = false
  let isScrolling = false
  let scrollTargetIndex: number | undefined

  function getCellHeight() {
    return listRef.value?.querySelector<HTMLLIElement>(`li.${mergedPrefixCls.value}-cell`)?.offsetHeight ?? 0
  }

  function adjustPanel(selectedIndex: number, duration = 200) {
    const target = listRef.value
    if (!target || isScrolling || scrollHandlerLocked) {
      return
    }

    const top = Math.max(selectedIndex * getCellHeight(), 0)
    if (top === getScroll(target).scrollTop) {
      return
    }

    scrollHandlerLocked = true
    scrollToTop({ top, target, duration, callback: () => (scrollHandlerLocked = false) })
  }

  function scrollToSelected(duration?: number) {
    const selectedIndex = props.options.findIndex(item => item.value === props.selectedValue)
    adjustPanel(selectedIndex, duration)
  }

  function handleScrollAdjust() {
    isNil(scrollTargetIndex) || scrollTargetIndex < 0 ? scrollToSelected() : adjustPanel(scrollTargetIndex)
  }

  function handleScroll() {
    const target = listRef.value
    if (!target || scrollHandlerLocked) {
      return
    }

    isScrolling = true
    scrollTargetIndex = Math.min(Math.round(getScroll(target).scrollTop / getCellHeight()), props.options.length - 1)
    const targetItem = props.options[scrollTargetIndex]
    if (!targetItem.disabled) {
      callEmit(props.onChange, targetItem.value)
    }
    nextTick(() => {
      isScrolling = false
    })
  }

  watchEffect(() => {
    if (props.visible) {
      nextTick(() => scrollToSelected(0))
    }
  })
  watch(
    () => props.selectedValue,
    value => {
      const newScrollTargetIndex = props.options.findIndex(item => item.value === value)
      if (scrollTargetIndex !== newScrollTargetIndex) {
        scrollTargetIndex = newScrollTargetIndex
        !isScrolling && nextTick(scrollToSelected)
      }
    },
  )

  return {
    adjustPanel,
    scrollToSelected,
    handleScrollAdjust,
    handleScroll,
  }
}
