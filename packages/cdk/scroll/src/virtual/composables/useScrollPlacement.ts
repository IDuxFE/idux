/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VirtualScrollProps } from '../types'
import type { Ref } from 'vue'

import { computed, onActivated } from 'vue'

import { isFunction } from 'lodash-es'

import { callEmit } from '@idux/cdk/utils'

export type Scroll = { top?: number; left?: number }
export type SyncScroll = (newScroll: Scroll | ((prev: Scroll) => Scroll), setHolderScroll?: boolean) => void

export interface ScrollPlacementContext {
  syncScroll: SyncScroll
  handleScroll: (evt: Event) => void
}

export function useScrollPlacement(
  props: VirtualScrollProps,
  holderRef: Ref<HTMLElement | undefined>,
  scroll: Ref<Scroll>,
  scrollHeight: Ref<number>,
  containerSize: Ref<{ width: number; height: number }>,
  changeScroll: (value: Scroll) => void,
  setScroll: (value: Scroll, setContainerScroll: boolean) => Required<Scroll>,
): ScrollPlacementContext {
  const maxScrollHeight = computed(() => {
    const height = scrollHeight.value
    return height > 0 ? Math.max(height - containerSize.value.height, 0) : NaN
  })

  const syncScroll: SyncScroll = (newScroll, setHolderScroll?: boolean) => {
    const resolvedScroll = isFunction(newScroll) ? newScroll(scroll.value) : newScroll
    const { top: alignedTop, left: alignedLeft } = setScroll(resolvedScroll, !!setHolderScroll)

    changeScroll({ top: alignedTop, left: alignedLeft })
  }

  let currentScrolledBottom = false
  const handleScroll = (evt: Event) => {
    const { scrollTop: newScrollTop, scrollLeft: newScrollLeft } = evt.currentTarget as Element
    if (newScrollTop !== scroll.value.top || newScrollLeft !== scroll.value.left) {
      syncScroll({ top: newScrollTop, left: newScrollLeft })
    }
    callEmit(props.onScroll, evt)

    // 某些情况下(例如浏览器缩放), 会导致 scrollTop 出现小数，newScrollTop 始终小于 maxScrollHeight
    // 所以对 newScrollTop 进行了向上取整，避免此种情况的出现。
    const scrolledBottom = Math.ceil(newScrollTop) >= maxScrollHeight.value

    if (!currentScrolledBottom && scrolledBottom) {
      callEmit(props.onScrolledBottom)
    }

    currentScrolledBottom = scrolledBottom
  }

  const initScroll = () => {
    if (holderRef.value) {
      syncScroll(scroll.value, true)
    }
  }
  onActivated(initScroll)

  return { syncScroll, handleScroll }
}
