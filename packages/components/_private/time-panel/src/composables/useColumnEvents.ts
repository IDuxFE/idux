/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Ref } from 'vue'

import { scrollToTop } from '@idux/cdk/scroll'
import { cancelRAF, rAF } from '@idux/cdk/utils'

export interface ColumnEventHandlers {
  handleWheel: (evt: WheelEvent) => void
  handleClick: (evt: MouseEvent) => void
}

export function useColumnEvents(listRef: Ref<HTMLElement | null>): ColumnEventHandlers {
  let preTop = 0
  let wheelOffset = 0
  let rafId: number
  let locked = false

  const handleWheel = (evt: WheelEvent) => {
    if (evt.shiftKey || !listRef.value) {
      return
    }

    evt.preventDefault()

    cancelRAF(rafId)

    const { deltaY } = evt
    wheelOffset += deltaY

    if (locked) {
      return
    }

    rafId = rAF(() => {
      if (!listRef.value) {
        return
      }

      if (!preTop) {
        preTop = listRef.value.scrollTop
      }

      locked = true

      scrollToTop({
        target: listRef.value,
        top: preTop + wheelOffset,
        duration: 100,
        callback() {
          preTop = listRef.value?.scrollTop ?? 0
          wheelOffset = 0
          locked = false
        },
      })
    })
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
  }
}
