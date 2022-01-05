<template>
  <IxSpace>
    <IxButton @Click="filterByAge19">Filter By Age(over 19)</IxButton>
    <IxButton @Click="filterBySidney">Filter By Address(sidney)</IxButton>
    <IxButton @Click="clear">Clear</IxButton>
  </IxSpace>
  <IxTable :columns="columns" :dataSource="data" :pagination="false">
    <template #name="{ value }">
      <a>{{ value }}</a>
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

type AgeFilter = (age: number) => boolean

const ageFilterable: TableColumnFilterable<Data, AgeFilter> = reactive({
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
  filterBy: [],
  onChange(currentFilterBy) {
    ageFilterable.filterBy = currentFilterBy
  },
})

const addressFilterable: TableColumnFilterable<Data, string> = reactive({
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
  filter(currentFilterBy, record) {
    return currentFilterBy.every(filterBy => record.address.includes(filterBy))
  },
  filterBy: [],
  onChange(currentFilterBy) {
    addressFilterable.filterBy = currentFilterBy
  },
})

const filterByAge19 = () => {
  ageFilterable.filterBy = [ageFilterable.filters[0].value]
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
    customRender: 'name',
  },
  {
    title: 'Age',
    dataKey: 'age',
    sortable: {
      sorter: (curr, next) => curr.age - next.age,
    },
    filterable: ageFilterable,
  } as TableColumn<Data, AgeFilter>,
  {
    title: 'Grade',
    dataKey: 'grade',
  },
  {
    title: 'Address',
    dataKey: 'address',
    filterable: addressFilterable,
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
