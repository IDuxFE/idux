<template>
  <IxTable v-model:expandedRowKeys="expandedRowKeys" :columns="columns" :dataSource="data" :pagination="false">
    <template #name="{ value }">
      <a>{{ value }}</a>
    </template>
    <template #expand="{ record }">
      <span> {{ record.description }}</span>
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
    disabled: record => !record.description,
    onChange: expendedRowKeys => console.log(expendedRowKeys),
    slots: { expand: 'expand' },
  },
  {
    title: 'Name',
    dataKey: 'name',
    slots: { cell: 'name' },
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
