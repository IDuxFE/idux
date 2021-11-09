/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VirtualScrollProps } from '../types'
import type { ComputedRef, Ref } from 'vue'

import { computed, watchEffect } from 'vue'

import { isFunction } from 'lodash-es'

import { callEmit } from '@idux/cdk/utils'

export type SyncScrollTop = (newTop: number | ((prev: number) => number)) => void

export interface ScrollPlacementContext {
  scrolledTop: ComputedRef<boolean>
  scrolledBottom: ComputedRef<boolean>
  syncScrollTop: SyncScrollTop
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
  changeScrollTop: (value: number) => void,
): ScrollPlacementContext {
  const maxScrollHeight = computed(() => {
    const height = scrollHeight.value
    return height > 0 ? height - props.height : NaN
  })

  const scrolledTop = computed(() => scrollTop.value <= 0)
  const scrolledBottom = computed(() => scrollTop.value >= maxScrollHeight.value)

  watchEffect(() => {
    if (scrolledBottom.value) {
      callEmit(props.onScrolledBottom)
    }
  })

  const syncScrollTop = (newTop: number | ((prev: number) => number)) => {
    const value = isFunction(newTop) ? newTop(scrollTop.value) : newTop
    const alignedTop = keepInRange(maxScrollHeight.value, value)
    const holderElement = holderRef.value
    if (holderElement) {
      holderElement.scrollTop = alignedTop
    }
    changeScrollTop(alignedTop)
  }

  return { scrolledTop, scrolledBottom, syncScrollTop }
}
