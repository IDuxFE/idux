/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GetKey } from './useGetKey'
import type { VirtualScrollProps } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, Ref } from 'vue'

import { ref, watch } from 'vue'

export interface ScrollStateContext {
  scrollHeight: Ref<number>
  scrollOffset: Ref<number | undefined>
  startIndex: Ref<number>
  endIndex: Ref<number>
}

export function useScrollState(
  props: VirtualScrollProps,
  fillerRef: Ref<HTMLElement | undefined>,
  useVirtual: ComputedRef<boolean>,
  getKey: ComputedRef<GetKey>,
  scrollTop: Ref<number>,
  containerHeight: ComputedRef<number>,
  heightUpdatedMark: Ref<number>,
  heights: Map<VKey, number>,
): ScrollStateContext {
  const scrollHeight = ref(0)
  const scrollOffset = ref<number>()
  const startIndex = ref(0)
  const endIndex = ref(0)

  watch(
    [useVirtual, () => props.dataSource, () => props.itemHeight, containerHeight, getKey, scrollTop, heightUpdatedMark],
    ([virtual, dataSource, itemHeight, height, getKey, scrollTop]) => {
      const {
        scrollHeight: totalHeight,
        offset,
        start,
        end,
      } = calcState(fillerRef, virtual, dataSource, itemHeight, height, getKey, scrollTop, heights)
      scrollHeight.value = totalHeight
      scrollOffset.value = offset
      startIndex.value = start
      endIndex.value = end
    },
    { immediate: true },
  )

  return { scrollHeight, scrollOffset, startIndex, endIndex }
}

function calcState(
  fillerRef: Ref<HTMLElement | undefined>,
  virtual: boolean,
  dataSource: unknown[],
  itemHeight: number,
  height: number,
  getKey: GetKey,
  scrollTop: number,
  heights: Map<VKey, number>,
) {
  const dataLength = dataSource.length
  // Always use virtual scroll bar in avoid shaking
  if (!virtual || dataLength === 0 || itemHeight * dataLength <= height) {
    return { scrollHeight: virtual ? fillerRef.value?.offsetHeight ?? 0 : 0, start: 0, end: dataLength - 1 }
  }

  let scrollHeight = 0
  let offset: number | undefined
  let start: number | undefined
  let end: number | undefined

  for (let index = 0; index < dataLength; index += 1) {
    const item = dataSource[index]
    const key = getKey(item)
    const cacheHeight = heights.get(key)
    const currentItemBottom = scrollHeight + (cacheHeight === undefined ? itemHeight : cacheHeight)

    if (currentItemBottom >= scrollTop && start === undefined) {
      start = index
      offset = scrollHeight
    }

    // Check item bottom in the range. We will render additional one item for motion usage
    if (currentItemBottom > scrollTop + height && end === undefined) {
      end = index
    }

    scrollHeight = currentItemBottom
  }

  // Fallback to normal if not match. This code should never reach
  /* istanbul ignore next */
  if (start === undefined) {
    start = 0
    offset = 0
  }
  if (end === undefined) {
    end = dataLength - 1
  }

  // Give cache to improve scroll experience
  end = Math.min(end + 1, dataLength)

  return { scrollHeight, offset, start, end }
}
