<template>
  <IxProTransfer
    v-model:value="targetKeys"
    type="table"
    :data-source="dataSource"
    :table-props="tableProps"
    :scroll="{ height: 300, width: { source: 600 }, fullHeight: true }"
  >
    <template #nameTitle> Name </template>
    <template #sourceNameCell="{ record }">
      <IxIcon name="user" />
      {{ record.name }}
    </template>
    <template #targetNameCell="{ record }">
      <IxIcon name="user" />
      {{ record.name }} ({{ record.age }})
    </template>
  </IxProTransfer>
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
    dataKey: 'name',
    customTitle: 'nameTitle',
    customCell: 'sourceNameCell',
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
    dataKey: 'name',
    customTitle: 'nameTitle',
    customCell: 'targetNameCell',
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
