<template>
  <IxProTransfer
    v-model:value="targetKeys"
    type="table"
    mode="immediate"
    :data-source="dataSource"
    :table-props="tableProps"
    :scroll="{ width: { source: 600 } }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { TableColumn } from '@idux/components/table'

interface Data {
  key: number
  disabled: boolean
  name: string
  age: number
  address: string
}

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
  },
]

const tableProps = {
  sourceColumns,
  targetColumns,
}

const targetKeys = ref<number[]>(Array.from(new Array(10)).map((_, idx) => idx))

const dataSource: Data[] = Array.from(new Array(20)).map((_, idx) => ({
  key: idx,
  disabled: [1, 6, 12, 16].includes(idx),
  name: 'Candidate' + idx,
  age: idx,
  address: 'London No.1 Lake Park',
}))
</script>
