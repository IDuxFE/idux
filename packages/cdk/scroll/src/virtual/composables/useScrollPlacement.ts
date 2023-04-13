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

export type SyncScrollTop = (newTop: number | ((prev: number) => number), setHolderScrollTop?: boolean) => void

export interface ScrollPlacementContext {
  syncScrollTop: SyncScrollTop
  handleScroll: (evt: Event) => void
}

const keepInRange = (maxScrollHeight: number, newScrollTop: number) => {
  let newTop = Math.max(newScrollTop, 0)
  if (!Number.isNaN(maxScrollHeight)) {
    newTop = Math.min(newTop, maxScrollHeight)
  }
  return newTop
}

export function useScrollPlacement(
  props: VirtualScrollProps,
  holderRef: Ref<HTMLElement | undefined>,
  scrollTop: Ref<number>,
  scrollHeight: Ref<number>,
  containerHeight: Ref<number>,
  changeScrollTop: (value: number) => void,
): ScrollPlacementContext {
  const maxScrollHeight = computed(() => {
    const height = scrollHeight.value
    return height > 0 ? Math.max(height - containerHeight.value, 0) : NaN
  })

  const syncScrollTop = (newTop: number | ((prev: number) => number), setHolderScrollTop?: boolean) => {
    const value = isFunction(newTop) ? newTop(scrollTop.value) : newTop
    const alignedTop = keepInRange(maxScrollHeight.value, value)
    const holderElement = holderRef.value
    if (holderElement && setHolderScrollTop) {
      holderElement.scrollTop = alignedTop
    }
    changeScrollTop(alignedTop)
  }

  const handleScroll = (evt: Event) => {
    const { scrollTop: newScrollTop } = evt.currentTarget as Element
    if (newScrollTop !== scrollTop.value) {
      syncScrollTop(newScrollTop)
    }
    callEmit(props.onScroll, evt)

    // 某些情况下(例如浏览器缩放), 会导致 scrollTop 出现小数，newScrollTop 始终小于 maxScrollHeight
    // 所以对 newScrollTop 进行了向上取整，避免此种情况的出现。
    if (Math.ceil(newScrollTop) >= maxScrollHeight.value) {
      callEmit(props.onScrolledBottom)
    }
  }

  const initScrollTop = () => {
    if (holderRef.value) {
      syncScrollTop(scrollTop.value, true)
    }
  }
  onActivated(initScrollTop)

  return { syncScrollTop, handleScroll }
}
