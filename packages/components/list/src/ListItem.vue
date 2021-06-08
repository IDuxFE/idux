<template>
  <list-item-wrap :grid="gird">
    <div class="ix-list-item-title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="ix-list-item-content">
      <slot>{{ content }}</slot>
    </div>
    <div class="ix-list-item-extra">
      <slot name="extra">{{ extra }}</slot>
    </div>
  </list-item-wrap>
</template>
<script lang="ts">
import type { ListGridProps } from './types'

import { defineComponent, inject } from 'vue'
import ListItemWrap from './ListItemWrap.vue'
import { listToken } from './token'
import { listItemProps } from './types'

export default defineComponent({
  name: 'IxListItem',
  components: { ListItemWrap },
  props: listItemProps,
  setup() {
    const listGrid = inject(listToken, null)
    const gird = listGrid?.value && useGrid(listGrid?.value)
    return { gird }
  },
})

const getGrid = <T, K extends keyof T>(grid: T, dim: K) => {
  const v = grid[dim]
  if (typeof v === 'number') {
    return Math.floor(24 / v)
  }

  return undefined
}

const useGrid = (grid: ListGridProps) => {
  const defaultSpan = getGrid(grid, 'column')
  const xsSpan = getGrid(grid, 'xs')
  const smSpan = getGrid(grid, 'sm')
  const mdSpan = getGrid(grid, 'md')
  const lgSpan = getGrid(grid, 'lg')
  const xlSpan = getGrid(grid, 'xl')
  return {
    xs: xsSpan || defaultSpan,
    sm: smSpan || defaultSpan,
    md: mdSpan || defaultSpan,
    ld: lgSpan || defaultSpan,
    xl: xlSpan || defaultSpan,
  }
}
</script>
