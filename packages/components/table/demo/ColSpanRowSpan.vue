<template>
  <IxTable :columns="columns" :dataSource="data" :borderless="false">
    <template #name="{ value }">
      <a>{{ value }}</a>
    </template>
  </IxTable>
</template>

<script lang="ts" setup>
import { TableColumn } from '@idux/components/table'

interface Data {
  key: string
  name: string
  age: number
  tel: string
  phone: number
  address: string
}

const getOtherColSpan = (record: Data) => (record.name === 'Jake White' ? 0 : 1)

const columns: TableColumn<Data>[] = [
  {
    title: 'Name',
    dataKey: 'name',
    colSpan: record => (record.name === 'Jake White' ? 5 : 1),
    customCell: 'name',
  },
  {
    title: 'Age',
    dataKey: 'age',
    colSpan: getOtherColSpan,
  },
  {
    title: 'Home phone',
    dataKey: 'tel',
    titleColSpan: 2,
    colSpan: getOtherColSpan,
    rowSpan: (_, index) => {
      if (index === 2) {
        return 2
      } else if (index === 3) {
        return 0
      } else {
        return 1
      }
    },
  },
  {
    title: 'Phone',
    dataKey: 'phone',
    titleColSpan: 0,
    colSpan: getOtherColSpan,
  },
  {
    title: 'Address',
    dataKey: 'address',
    colSpan: getOtherColSpan,
  },
]

const data: Data[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '5',
    name: 'Jake White',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Dublin No. 2 Lake Park',
  },
]
</script>
