<template>
  <IxSpace>
    <IxButton @Click="filterByAge19">Filter By Age(over 19)</IxButton>
    <IxButton @Click="filterBySidney">Filter By Address(sidney)</IxButton>
    <IxButton @Click="clear">Clear</IxButton>
  </IxSpace>
  <IxTable :columns="columns" :dataSource="data" :pagination="false">
    <template #name="{ value }">
      <IxButton mode="link">{{ value }}</IxButton>
    </template>
  </IxTable>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

import { TableColumn, TableColumnFilterable } from '@idux/components/table'

interface Data {
  key: number
  name: string
  age: number
  grade: number
  address: string
}

const ageFilterable: TableColumnFilterable<Data> = reactive({
  menus: [
    { key: 'over', label: 'Over 19' },
    { key: 'under', label: 'Under 21' },
  ],
  multiple: false,
  filter: (currentFilterBy, record) => {
    const isOver = currentFilterBy.includes('over')
    return isOver ? record.age > 19 : record.age < 21
  },
  filterBy: [],
  onChange: currentFilterBy => {
    ageFilterable.filterBy = currentFilterBy
  },
})

const addressFilterable: TableColumnFilterable<Data> = reactive({
  menus: [
    { key: 'Sidney', label: 'Sidney' },
    { key: 'New York', label: 'New York' },
  ],
  filter: (currentFilterBy, record) => {
    return currentFilterBy.some(filterBy => record.address.includes(filterBy as string))
  },
  filterBy: [],
  onChange: currentFilterBy => {
    addressFilterable.filterBy = currentFilterBy
  },
})

const filterByAge19 = () => {
  ageFilterable.filterBy = ['over']
  addressFilterable.filterBy = []
}

const filterBySidney = () => {
  ageFilterable.filterBy = []
  addressFilterable.filterBy = ['Sidney']
}

const clear = () => {
  ageFilterable.filterBy = []
  addressFilterable.filterBy = []
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
    filterable: ageFilterable,
  },
  {
    title: 'Grade',
    dataKey: 'grade',
  },
  {
    title: 'Address',
    dataKey: 'address',
    filterable: addressFilterable,
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
