<template>
  <IxTable :columns="columns" :dataSource="data" :pagination="false">
    <template #name="{ value }">
      <a>{{ value }}</a>
    </template>
  </IxTable>
</template>

<script lang="ts" setup>
import { TableColumn } from '@idux/components/table'

interface Data {
  key: number
  name: string
  age: number
  grade: number
  address: string
}

const columns: TableColumn<Data>[] = [
  {
    title: 'Name',
    dataKey: 'name',
    sortable: {
      orders: ['descend'],
      sorter: (curr, next) => curr.name.length - next.name.length,
    },
    customCell: 'name',
  },
  {
    title: 'Age',
    dataKey: 'age',
    sortable: {
      sorter: (curr, next) => curr.age - next.age,
    },
  },
  {
    title: 'Grade',
    dataKey: 'grade',
    sortable: {
      orders: ['ascend', 'descend', 'ascend'],
      sorter: (curr, next) => curr.grade - next.grade,
    },
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
    age: 18,
    grade: 1,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 20,
    grade: 3,
    address: 'London No. 1 Lake Park',
  },
  {
    key: 3,
    name: 'Joe Black',
    age: 19,
    grade: 2,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: 4,
    name: 'Disabled User',
    age: 21,
    grade: 2,
    address: 'Sidney No. 1 Lake Park',
  },
]
</script>
