<template>
  <IxTable
    v-model:expandedRowKeys="expandedRowKeys"
    tableLayout="fixed"
    :columns="columns"
    :dataSource="data"
    :pagination="false"
  >
    <template #name="{ value }">
      <IxButton mode="link">{{ value }}</IxButton>
    </template>
    <template #expand="{ record }">
      <span>{{ record.description }}</span>
    </template>
  </IxTable>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { TableColumn } from '@idux/components/table'

interface Data {
  key: number
  name: string
  age: number
  address: string
  description?: string
}

const expandedRowKeys = ref([1])

const columns: TableColumn<Data>[] = [
  {
    type: 'expandable',
    width: 60,
    fixed: 'start',
    disabled: record => !record.description,
    onChange: expendedRowKeys => console.log(expendedRowKeys),
    customExpand: 'expand',
  },
  {
    width: 400,
    title: 'Name',
    dataKey: 'name',
    customCell: 'name',
  },
  {
    width: 200,
    title: 'Age',
    dataKey: 'age',
  },
  {
    width: 400,
    title: 'Address',
    dataKey: 'address',
  },
  {
    width: 400,
    title: 'data1',
    dataKey: 'data1',
  },
  {
    width: 400,
    title: 'data2',
    dataKey: 'data2',
  },
  {
    width: 400,
    title: 'data3',
    dataKey: 'data3',
  },
  {
    width: 400,
    title: 'data4',
    dataKey: 'data4',
  },
  {
    width: 400,
    title: 'data5',
    dataKey: 'data5',
  },
  {
    width: 400,
    title: 'data6',
    dataKey: 'data6',
  },
  {
    width: 400,
    title: 'data7',
    dataKey: 'data7',
  },
  {
    width: 400,
    title: 'data8',
    dataKey: 'data8',
  },
]

const data: Data[] = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
  {
    key: 4,
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
]
</script>
