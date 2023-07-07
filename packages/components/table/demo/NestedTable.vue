<template>
  <IxTable v-model:expandedRowKeys="expandedRowKeys" :columns="columns" :dataSource="data" :pagination="false">
    <template #name="{ value }">
      <IxButton mode="link">{{ value }}</IxButton>
    </template>
    <template #action>
      <IxButtonGroup :gap="8" mode="link" separator="|">
        <IxButton>OK</IxButton>
        <IxButton>Canel</IxButton>
      </IxButtonGroup>
    </template>
    <template #expand="{ record }">
      <IxTable :columns="nestedColumns" :dataSource="record.children" :pagination="false">
        <template #action>
          <IxButtonGroup :gap="8" mode="link" separator="|">
            <IxButton>OK</IxButton>
            <IxButton>Canel</IxButton>
          </IxButtonGroup>
        </template>
      </IxTable>
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
  children: Array<{
    name: string
    date: string
    status: string
    grade: number
  }>
}

const expandedRowKeys = ref([1])

const columns: TableColumn<Data>[] = [
  {
    type: 'expandable',
    customExpand: 'expand',
  },
  {
    title: 'Name',
    dataKey: 'name',
    customCell: 'name',
  },
  {
    title: 'Age',
    dataKey: 'age',
  },
  {
    title: 'Address',
    dataKey: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    customCell: 'action',
  },
]

const nestedColumns: TableColumn<{
  name: string
  date: string
  status: string
  grade: number
}>[] = [
  {
    title: 'Name',
    dataKey: 'name',
  },
  {
    title: 'Date',
    dataKey: 'date',
  },
  {
    title: 'Status',
    dataKey: 'status',
  },
  {
    title: 'Grade',
    dataKey: 'grade',
  },
  {
    title: 'Action',
    key: 'action',
    customCell: 'action',
  },
]

const nestedData = [
  {
    key: 1,
    name: 'This is name',
    date: '2023-01-01',
    status: 'Waiting',
    grade: 0,
  },
  {
    key: 2,
    name: 'This is name',
    date: '2023-02-01',
    status: 'Progress',
    grade: 20,
  },
  {
    key: 3,
    name: 'This is name',
    date: '2023-03-01',
    status: 'Progress',
    grade: 80,
  },
  {
    key: 4,
    name: 'This is name',
    date: '2023-04-01',
    status: 'Finished',
    grade: 100,
  },
]

const data: Data[] = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    children: nestedData,
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    children: nestedData,
  },
  {
    key: 3,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    children: nestedData,
  },
  {
    key: 4,
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
    children: nestedData,
  },
]
</script>
