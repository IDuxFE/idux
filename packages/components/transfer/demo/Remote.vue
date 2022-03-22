<template>
  <IxTransfer
    v-model:value="selectedKeys"
    :data-source="dataSource"
    :searchValue="searchValue"
    :pagination="pagination"
    :spin="spin"
    :searchable="{ source: true, target: false }"
    mode="immediate"
    :on-search="handleSearchChange"
  >
    <template #label="item">{{ item.label ?? 'Option' + item.key }}</template>
  </IxTransfer>
</template>

<script setup lang="ts">
import type { TransferPaginationProps } from '@idux/components/transfer'

import { computed, onMounted, ref } from 'vue'

interface Data {
  key: number
  value: number
  label: string
}

const allData = Array.from(new Array(1000)).map((_, idx) => ({
  key: idx,
  value: idx,
  label: 'Option' + idx,
}))

const selectedKeys = ref<number[]>(Array.from(new Array(50)).map((_, idx) => idx))

const spin = ref(false)
const searchValue = ref<string | undefined>()

const dataSource = ref<Data[]>([])
const filteredData = ref<Data[]>([])

const sourcePageIndex = ref(1)
const pagination = computed<TransferPaginationProps>(() => ({
  pageIndex: sourcePageIndex.value,
  pageSize: [20, 20],
  total: filteredData.value.length,
  onChange(isSource, pageIndex) {
    if (!isSource) {
      return
    }
    sourcePageIndex.value = pageIndex
    loadSourceData()
  },
}))

const loadSourceData = () => {
  spin.value = true
  setTimeout(() => {
    filteredData.value = allData.filter(data => !searchValue.value || data.label.indexOf(searchValue.value) > -1)
    dataSource.value = filteredData.value.slice((sourcePageIndex.value - 1) * 20, sourcePageIndex.value * 20)
    spin.value = false
  }, 1500)
}

const handleSearchChange = (isSource: boolean, value: string | undefined) => {
  if (!isSource) {
    return
  }

  searchValue.value = value
  loadSourceData()
}

onMounted(() => {
  loadSourceData()
})
</script>
