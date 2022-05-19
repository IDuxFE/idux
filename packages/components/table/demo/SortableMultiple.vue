<template>
  <IxTable :columns="columns" :dataSource="data" :pagination="false">
    <template #name="{ value }">
      <a>{{ value }}</a>
    </template>
  </IxTable>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

import { TableColumn, TableColumnSortable } from '@idux/components/table'

interface Data {
  key: number
  name: string
  age: number
  grade: number
  address: string
}

const ageSortable = reactive<TableColumnSortable<Data>>({
  orderBy: 'ascend',
  sorter: (curr, next) => curr.age - next.age,
  onChange: currOrderBy => {
    ageSortable.orderBy = currOrderBy
    gradeSortable.orderBy = undefined
  },
})

const gradeSortable = reactive<TableColumnSortable<Data>>({
  orders: ['ascend', 'descend', 'ascend'],
  sorter: (curr, next) => curr.grade - next.grade,
  onChange: currOrderBy => {
    ageSortable.orderBy = undefined
    gradeSortable.orderBy = currOrderBy
  },
})

const columns: TableColumn<Data>[] = [
  {
    title: 'Name',
    dataKey: 'name',
    sortable: {
      multiple: 1,
      orders: ['descend'],
      sorter: (curr, next) => curr.name.charCodeAt(0) - next.name.charCodeAt(0),
    },
    customCell: 'name',
  },
  {
    title: 'Age',
    dataKey: 'age',
    sortable: {
      multiple: 2,
      sorter: (curr, next) => curr.age - next.age,
    },
  },
  {
    title: 'Grade',
    dataKey: 'grade',
    sortable: {
      multiple: 3,
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
  {
    key: 5,
    name: 'John Brown',
    age: 18,
    grade: 2,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: 6,
    name: 'Jim Green',
    age: 20,
    grade: 1,
    address: 'London No. 1 Lake Park',
  },
  {
    key: 7,
    name: 'Joe Black',
    age: 19,
    grade: 1,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: 8,
    name: 'Disabled User',
    age: 21,
    grade: 3,
    address: 'Sidney No. 1 Lake Park',
  },
]
</script>
