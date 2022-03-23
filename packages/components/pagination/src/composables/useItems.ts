/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { type PaginationItemType } from '../types'

export interface PaginationItem {
  type: PaginationItemType
  disabled?: boolean
  index?: number
}

export function useItems(
  activeIndex: ComputedRef<number>,
  lastIndex: ComputedRef<number>,
): ComputedRef<PaginationItem[]> {
  return computed(() => {
    const _activeIndex = activeIndex.value
    const _lastIndex = lastIndex.value
    let items: PaginationItem[]
    if (_lastIndex <= 9) {
      items = generatePage(1, _lastIndex)
    } else {
      items = generateRangeItem(_activeIndex, _lastIndex)
    }
    const prevItem: PaginationItem = { type: 'prev', disabled: _activeIndex === 1 }
    const nextItem: PaginationItem = { type: 'next', disabled: _activeIndex === _lastIndex }
    return [prevItem, ...items, nextItem]
  })
}

const generatePage = (start: number, end: number): PaginationItem[] => {
  const list: PaginationItem[] = []
  for (let index = start; index <= end; index++) {
    list.push({ index, type: 'page' })
  }
  return list
}

const generateRangeItem = (pageIndex: number, lastIndex: number) => {
  let listOfRange: PaginationItem[] = []
  const prevFiveItem: PaginationItem = { type: 'prev5' }
  const nextFiveItem: PaginationItem = { type: 'next5' }
  if (pageIndex < 5) {
    listOfRange = [...generatePage(2, 5), nextFiveItem]
  } else if (pageIndex < lastIndex - 3) {
    listOfRange = [prevFiveItem, ...generatePage(pageIndex - 2, pageIndex + 2), nextFiveItem]
  } else {
    listOfRange = [prevFiveItem, ...generatePage(lastIndex - 4, lastIndex - 1)]
  }
  const firstPageItem = generatePage(1, 1)
  const lastPageItem = generatePage(lastIndex, lastIndex)
  return [...firstPageItem, ...listOfRange, ...lastPageItem]
}
