<template>
  <IxTransfer v-model:value="selectedKeys" :data-source="dataSource" searchable :search-fn="searchFn" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Data {
  key: number
  value: number
  label: string
}

const selectedKeys = ref<number[]>(Array.from(new Array(10)).map((_, idx) => idx))

const dataSource: Data[] = Array.from(new Array(20)).map((_, idx) => ({
  key: idx,
  value: idx,
  label: 'Option' + idx,
  disabled: [1, 6, 12, 16].includes(idx),
}))

const searchFn = (_: boolean, item: unknown, searchValue: string | undefined) => {
  return !searchValue || (item as Data).label.indexOf(searchValue) > -1
}
</script>
