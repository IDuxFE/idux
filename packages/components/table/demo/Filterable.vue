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
    customCell: 'name',
  },
  {
    title: 'Age',
    dataKey: 'age',
    sortable: {
      sorter: (curr, next) => curr.age - next.age,
    },
    filterable: {
      menus: [
        { key: 'over', label: 'Over 19' },
        { key: 'under', label: 'Under 21' },
      ],
      multiple: false,
      filter: (currentFilterBy, record) => {
        const isOver = currentFilterBy.includes('over')
        return isOver ? record.age > 19 : record.age < 21
      },
    },
  },
  {
    title: 'Grade',
    dataKey: 'grade',
  },
  {
    title: 'Address',
    dataKey: 'address',
    filterable: {
      menus: [
        { key: 'Sidney', label: 'Sidney' },
        { key: 'New York', label: 'New York' },
      ],
      filter: (currentFilterBy, record) => {
        return currentFilterBy.some(filterBy => record.address.includes(filterBy as string))
      },
    },
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
