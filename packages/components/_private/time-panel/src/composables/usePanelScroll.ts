/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimePanelCell, TimePanelColumnProps } from '../types'

import { type ComputedRef, type Ref, ref } from 'vue'

import { getScroll } from '@idux/cdk/scroll'
import { cancelRAF, easeInOutCubic, rAF } from '@idux/cdk/utils'

export interface PanelColumnScroll {
  adjustPanel: (selectedIndex: number, duration?: number) => void
  scrollToActive: (duration?: number) => void
  getTargetByScrollTop: () => TimePanelCell | undefined
  frameRunning: Ref<boolean>
}

export function usePanelScroll(
  props: TimePanelColumnProps,
  listRef: Ref<HTMLElement | undefined>,
  mergedPrefixCls: ComputedRef<string>,
): PanelColumnScroll {
  const { frameRunning, scrollTo } = useScrollTo(listRef)

  const getCellHeight = () => {
    return listRef.value?.querySelector<HTMLLIElement>(`li.${mergedPrefixCls.value}-cell`)?.offsetHeight ?? 0
  }

  const adjustPanel = (selectedIndex: number, duration = 200) => {
    const target = listRef.value
    if (!target) {
      return
    }

    const top = Math.max(selectedIndex * getCellHeight(), 0)
    if (top === getScroll(target).scrollTop) {
      return
    }

    scrollTo(top, duration)
  }

  const scrollToActive = (duration?: number) => {
    const activeIndex = props.options!.findIndex(item => item.value === props.activeValue)
    adjustPanel(activeIndex, duration)
  }

  const getTargetByScrollTop = () => {
    const target = listRef.value
    if (!target) {
      return
    }

    const scrollTargetIndex = Math.min(
      Math.round(getScroll(target).scrollTop / getCellHeight()),
      props.options!.length - 1,
    )
    return props.options![scrollTargetIndex]
  }

  return {
    adjustPanel,
    scrollToActive,
    getTargetByScrollTop,
    frameRunning,
  }
}

interface ScrollToContext {
  frameRunning: Ref<boolean>
  scrollTo: (top: number, duration?: number) => void
}

function useScrollTo(target: Ref<HTMLElement | undefined>): ScrollToContext {
  const frameRunning = ref(false)
  let rafId: number

  let currentTop: number
  let currentScrollTop: number
  let currentDuration: number
  let currentStartTime: number

  const frameFunc = (time: number) => {
    if (!target.value) {
      return
    }

    const elapsed = time > currentDuration ? currentDuration : time
    const amountOfChange = currentTop! - currentScrollTop
    const nextScrollTop = easeInOutCubic(elapsed, currentScrollTop, amountOfChange, currentDuration)

    target.value.scrollTop = nextScrollTop
  }

  const execFrame = () => {
    cancelRAF(rafId)
    rafId = rAF(() => {
      frameRunning.value = true
      const time = Date.now() - currentStartTime
      frameFunc(time)

      if (time < currentDuration) {
        execFrame()
      } else {
        currentTop = 0
        currentDuration = 0
        currentStartTime = 0

        rAF(() => {
          frameRunning.value = false
        })
      }
    })
  }

  const scrollTo = (top: number, duration = 100) => {
    if (!target.value) {
      return
    }

    currentDuration = duration
    currentTop = top
    currentScrollTop = getScroll(target.value).scrollTop

    if (!frameRunning.value) {
      currentStartTime = Date.now()
    }

    execFrame()
  }

  return {
    frameRunning,
    scrollTo,
  }
}
