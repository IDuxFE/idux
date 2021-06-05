<template>
  <li class="ix-pagination-jumper">
    {{ locale.jumpTo }}
    <ix-input :disabled="disabled" :size="size" @keydown.enter="jumpToIndex" />
    {{ locale.page }}
  </li>
</template>

<script lang="ts">
import type { PaginationJumperProps } from './types'

import { defineComponent } from 'vue'
import { toNumber } from '@idux/cdk/utils'
import { IxInput } from '@idux/components/input'
import { paginationJumperPropsDef } from './types'

export default defineComponent({
  name: 'IxPaginationJumper',
  components: { IxInput },
  props: paginationJumperPropsDef,
  emits: ['pageIndexChange'],
  setup(props: PaginationJumperProps, { emit }) {
    const jumpToIndex = (evt: KeyboardEvent) => {
      const target = evt.target as HTMLInputElement
      const index = Math.floor(toNumber(target.value, props.pageIndex))
      emit('pageIndexChange', index)
      target.value = ''
    }
    return { jumpToIndex }
  },
})
</script>
