<template>
  <li class="ix-pagination-jumper">
    {{ locale.jumpTo }}
    <ix-input :disabled="disabled" :size="size" @keydown.enter="jumpToIndex" />
    {{ locale.page }}
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { toNumber } from '@idux/cdk/utils'
import { IxInput } from '@idux/components/input'
import { paginationJumperProps } from './types'

export default defineComponent({
  name: 'IxPaginationJumper',
  components: { IxInput },
  props: paginationJumperProps,
  emits: ['pageIndexChange'],
  setup(props, { emit }) {
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
