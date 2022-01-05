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

type AgeFilter = (age: number) => boolean

const columns: TableColumn<Data>[] = [
  {
    title: 'Name',
    dataKey: 'name',
    customRender: 'name',
  },
  {
    title: 'Age',
    dataKey: 'age',
    sortable: {
      sorter: (curr, next) => curr.age - next.age,
    },
    filterable: {
      filters: [
        {
          text: 'over 19',
          value: (age: number) => age > 19,
        },
        {
          text: 'below 21',
          value: (age: number) => age < 21,
        },
      ],
      filter(currentFilterBy, record) {
        return currentFilterBy.every(filterBy => filterBy(record.age))
      },
    },
  } as TableColumn<Data, AgeFilter>,
  {
    title: 'Grade',
    dataKey: 'grade',
  },
  {
    title: 'Address',
    dataKey: 'address',
    filterable: {
      filters: [
        {
          text: 'Sidney',
          value: 'Sidney',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      handleFilter(currentFilterBy, record) {
        return currentFilterBy.every(filterBy => record.address.includes(filterBy))
      },
    },
  } as TableColumn<Data, string>,
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
