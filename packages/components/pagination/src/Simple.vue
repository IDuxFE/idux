<template>
  <ix-pagination-item
    :disabled="disabled || isFirstIndex"
    :itemRender="itemRender"
    :locale="locale"
    :showTitle="showTitle"
    :size="size"
    type="prev"
    @itemClick="onItemClick"
  ></ix-pagination-item>
  <li class="ix-pagination-item">
    <ix-input :disabled="disabled" :size="size" :value="pageIndex.toString()" @keydown.enter="jumpToIndex" />
    <span class="ix-pagination-item-slash">/</span>
    <span>{{ lastIndex }}</span>
  </li>
  <ix-pagination-item
    :disabled="disabled || isLastIndex"
    :itemRender="itemRender"
    :locale="locale"
    :showTitle="showTitle"
    :size="size"
    type="next"
    @itemClick="onItemClick"
  ></ix-pagination-item>
</template>

<script lang="ts">
import type { PaginationItemType } from './types'

import { defineComponent, ref, watchEffect } from 'vue'
import { toNumber } from '@idux/cdk/utils'
import { IxInput } from '@idux/components/input'
import IxPaginationItem from './Item'
import { paginationSimpleProps } from './types'

export default defineComponent({
  name: 'IxPaginationSimple',
  components: { IxPaginationItem, IxInput },
  props: paginationSimpleProps,
  emits: ['pageIndexChange'],
  setup(props, { emit }) {
    const lastIndex = ref(0)
    const isFirstIndex = ref(false)
    const isLastIndex = ref(false)

    watchEffect(() => {
      const { pageIndex, pageSize, total } = props
      const _lastIndex = Math.ceil(total / pageSize)
      lastIndex.value = _lastIndex
      isFirstIndex.value = pageIndex === 1
      isLastIndex.value = pageIndex === _lastIndex
    })

    const onPageIndexChange = (index: number) => emit('pageIndexChange', index)

    const onItemClick = ({ type }: { type: PaginationItemType }) => {
      if (type === 'prev') {
        onPageIndexChange(props.pageIndex - 1)
      } else {
        onPageIndexChange(props.pageIndex + 1)
      }
    }

    const jumpToIndex = (evt: KeyboardEvent) => {
      const target = evt.target as HTMLInputElement
      const index = Math.floor(toNumber(target.value, props.pageIndex))
      onPageIndexChange(index)
      target.value = ''
    }

    return { lastIndex, isFirstIndex, isLastIndex, onItemClick, jumpToIndex }
  },
})
</script>
