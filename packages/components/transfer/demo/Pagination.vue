<template>
  <IxTransfer v-model:value="selectedKeys" :data-source="dataSource" :pagination="pagination" />
</template>

<script setup lang="ts">
import type { TransferPaginationProps } from '@idux/components/transfer'

import { computed, ref } from 'vue'

interface Data {
  key: number
  value: number
  label: string
}

const selectedKeys = ref<number[]>(Array.from(new Array(50)).map((_, idx) => idx))

const dataSource: Data[] = Array.from(new Array(100)).map((_, idx) => ({
  key: idx,
  value: idx,
  label: 'Option' + idx,
  disabled: [1, 6, 12, 16].includes(idx),
}))

const sourcePageIndex = ref(1)
const targetPageIndex = ref(1)
const pagination = computed<TransferPaginationProps>(() => ({
  pageIndex: [sourcePageIndex.value, targetPageIndex.value],
  pageSize: [10, 10],
  onChange(isSource, pageIndex) {
    isSource ? (sourcePageIndex.value = pageIndex) : (targetPageIndex.value = pageIndex)
  },
}))
</script>
