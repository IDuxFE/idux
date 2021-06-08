<template>
  <ix-pagination-item
    v-for="item in items"
    :key="item.type + '-' + item.index"
    :active="item.index === pageIndex"
    :disabled="disabled || item.disabled"
    :index="item.index"
    :itemRender="itemRender"
    :locale="locale"
    :showTitle="showTitle"
    :size="size"
    :type="item.type"
    @itemClick="onItemClick"
  >
  </ix-pagination-item>
  <ix-pagination-sizes
    v-if="showSizeChanger"
    :disabled="disabled"
    :locale="locale"
    :pageSize="pageSize"
    :pageSizes="pageSizes"
    :size="size"
    @pageSizeChange="onPageSizeChange"
  />
  <ix-pagination-jumper
    v-if="showQuickJumper"
    :disabled="disabled"
    :locale="locale"
    :pageIndex="pageIndex"
    :size="size"
    @pageIndexChange="onPageIndexChange"
  />
</template>

<script lang="ts">
import { PaginationDefaultProps, paginationDefaultProps } from './types'

import { computed, defineComponent } from 'vue'
import { PaginationItemType } from '@idux/components/config'
import IxPaginationSizes from './Sizes.vue'
import IxPaginationJumper from './Jumper.vue'
import IxPaginationItem from './Item'

const indexDiffMap = {
  next: 1,
  prev: -1,
  prev5: -5,
  next5: 5,
} as const

export default defineComponent({
  name: 'IxPaginationDefault',
  components: { IxPaginationItem, IxPaginationSizes, IxPaginationJumper },
  props: paginationDefaultProps,
  emits: ['pageIndexChange', 'pageSizeChange'],
  setup(props, { emit }) {
    const onPageIndexChange = (index: number) => emit('pageIndexChange', index)
    const onPageSizeChange = (size: number) => emit('pageSizeChange', size)
    const onItemClick = ({ type, index }: { type: PaginationItemType; index: number }) => {
      let newIndex: number
      if (type === 'page') {
        newIndex = index
      } else {
        newIndex = props.pageIndex + indexDiffMap[type]
      }
      onPageIndexChange(newIndex)
    }

    const items = useItems(props)
    return { items, onItemClick, onPageIndexChange, onPageSizeChange }
  },
})

interface Item {
  type: PaginationItemType
  disabled?: boolean
  index?: number
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

const useItems = (props: PaginationDefaultProps) => {
  return computed(() => {
    const { pageIndex, pageSize, total } = props
    const lastIndex = Math.ceil(total / pageSize)
    return getItems(pageIndex, lastIndex)
  })
}
</script>
