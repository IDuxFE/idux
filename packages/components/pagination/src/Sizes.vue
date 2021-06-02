<template>
  <li class="ix-pagination-sizes">
    <ix-select :disabled="disabled" :options="sizeOptions" :size="size" :value="pageSize" @change="onPageSizeChange">
    </ix-select>
  </li>
</template>

<script lang="ts">
import type { PaginationSizesProps } from './types'

import { computed, defineComponent } from 'vue'
import { IxSelect } from '@idux/components/select'
import { paginationSizesDef } from './types'

export default defineComponent({
  name: 'IxPaginationSizes',
  components: { IxSelect },
  props: paginationSizesDef,
  emits: ['pageSizeChange'],
  setup(props: PaginationSizesProps, { emit }) {
    const sizeOptions = computed(() => {
      const { pageSizes, locale } = props
      return pageSizes.map(size => {
        return {
          value: size,
          label: `${size} ${locale.itemsPerPage}`,
        }
      })
    })

    const onPageSizeChange = (pageSize: number) => {
      if (props.pageSize !== pageSize) {
        emit('pageSizeChange', pageSize)
      }
    }

    return { sizeOptions, onPageSizeChange }
  },
})
</script>
