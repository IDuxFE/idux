/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimePanelCell, TimePanelColumnProps } from '../types'

import { type Ref, computed } from 'vue'

import { callEmit } from '@idux/cdk/utils'

export interface ColumnEventHandlers {
  handleWheel: (evt: WheelEvent) => void
  handleClick: (evt: MouseEvent) => void
  handleScroll: () => void
}

export function useColumnEvents(
  props: TimePanelColumnProps,
  listRef: Ref<HTMLElement | undefined>,
  getTargetByScrollTop: () => TimePanelCell | undefined,
  frameRunning: Ref<boolean>,
): ColumnEventHandlers {
  const activeIndex = computed(() => props.options?.findIndex(option => option.value === props.activeValue) ?? -1)

  const handleWheel = (evt: WheelEvent) => {
    evt.preventDefault()
    if (evt.shiftKey || !listRef.value || !props.options || activeIndex.value >= props.options.length) {
      return
    }

    const target = props.options?.[activeIndex.value + (evt.deltaY > 0 ? 1 : -1)]
    if (target) {
      callEmit(props.onActiveChange, target)
    }
  }

  const handleScroll = () => {
    if (frameRunning.value) {
      return
    }

    const target = getTargetByScrollTop()
    if (target) {
      callEmit(props.onActiveChange, target)
    }
  }

  const handleClick = (evt: MouseEvent) => {
    const children = listRef.value?.children
    if (!children) {
      return
    }

    evt.preventDefault()

    for (let i = 0; i < children.length; i++) {
      const currentLiY = (children[i] as HTMLLIElement).getBoundingClientRect().y
      const nextLiY = (children[i + 1] as HTMLLIElement | undefined)?.getBoundingClientRect().y

      if (currentLiY < evt.clientY && (!nextLiY || nextLiY > evt.clientY)) {
        children[i].dispatchEvent(new Event('click'))
        return
      }
    }
  }

  return {
    handleWheel,
    handleClick,
    handleScroll,
  }
}
