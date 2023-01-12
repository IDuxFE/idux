<template>
  <IxProTransfer
    v-model:value="targetKeys"
    type="table"
    mode="immediate"
    :data-source="dataSource"
    :table-props="tableProps"
    :searchValue="searchValue"
    :pagination="pagination"
    :spin="spin"
    :scroll="{ width: { source: 600 } }"
    :searchable="{ source: true, target: false }"
    :on-search="handleSearchChange"
  >
    <template #targetName="{ record }"> Candidate {{ record.key }} </template>
  </IxProTransfer>
</template>

<script setup lang="ts">
import type { TransferData, TransferPaginationProps } from '@idux/components/transfer'

import { computed, onMounted, ref } from 'vue'

import { TableColumn } from '@idux/components/table'

interface Data extends TransferData {
  key: number
  disabled: boolean
  name: string
  age: number
  address: string
}

const allData = Array.from(new Array(1000)).map((_, idx) => ({
  key: idx,
  disabled: [1, 6, 12, 16].includes(idx),
  name: 'Candidate' + idx,
  age: idx,
  address: 'London No.1 Lake Park',
}))

const sourceColumns: TableColumn<Data>[] = [
  {
    title: 'Name',
    dataKey: 'name',
  },
  {
    title: 'Age',
    dataKey: 'age',
  },
  {
    title: 'Address',
    dataKey: 'address',
  },
]

const targetColumns: TableColumn<Data>[] = [
  {
    title: 'Name',
    dataKey: 'name',
    customCell: 'targetName',
  },
]

const tableProps = {
  sourceColumns,
  targetColumns,
}

const targetKeys = ref<number[]>(Array.from(new Array(50)).map((_, idx) => idx))

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
    filteredData.value = allData.filter(data => !searchValue.value || data.name.indexOf(searchValue.value) > -1)
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
