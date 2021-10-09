/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PaginationItemType, PaginationProps } from './types'
import type { Ref } from 'vue'

import { computed, defineComponent, inject } from 'vue'

import Item from './Item'
import Jumper from './Jumper'
import Sizes from './Sizes'
import { paginationToken } from './token'

export default defineComponent({
  setup() {
    const { props, config, activeIndex, activeSize } = inject(paginationToken)!
    const items = useItems(props, activeIndex, activeSize)
    const showQuickJumper = computed(() => props.showQuickJumper ?? config.showQuickJumper)
    const showSizeChanger = computed(() => props.showSizeChanger ?? config.showSizeChanger)

    return () => {
      return (
        <>
          {items.value.map(item => (
            <Item key={item.type + '-' + item.index} {...item} />
          ))}
          {showSizeChanger.value ? <Sizes /> : null}
          {showQuickJumper.value ? <Jumper /> : null}
        </>
      )
    }
  },
})

interface Item {
  type: PaginationItemType
  disabled?: boolean
  index?: number
}

const useItems = (props: PaginationProps, activeIndex: Ref<number>, activeSize: Ref<number>) => {
  return computed(() => {
    const lastIndex = Math.ceil(props.total / activeSize.value)
    return getItems(activeIndex.value, lastIndex)
  })
}

const getItems = (pageIndex: number, lastIndex: number) => {
  let items: Item[]
  if (lastIndex <= 9) {
    items = generatePage(1, lastIndex)
  } else {
    items = generateRangeItem(pageIndex, lastIndex)
  }

  const prevItem: Item = { type: 'prev', disabled: pageIndex === 1 }
  const nextItem: Item = { type: 'next', disabled: pageIndex === lastIndex }

  return [prevItem, ...items, nextItem]
}

const generatePage = (start: number, end: number): Item[] => {
  const list: Item[] = []
  for (let index = start; index <= end; index++) {
    list.push({ index, type: 'page' })
  }
  return list
}

const generateRangeItem = (pageIndex: number, lastIndex: number) => {
  let listOfRange: Item[] = []
  const prevFiveItem: Item = { type: 'prev5' }
  const nextFiveItem: Item = { type: 'next5' }
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
