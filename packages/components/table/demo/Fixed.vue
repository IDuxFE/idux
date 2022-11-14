<template>
  <IxTable :columns="columns" :dataSource="data" :scroll="scroll">
    <template #name="{ value }">
      <IxButton mode="link">{{ value }}</IxButton>
    </template>
    <template #action>
      <IxButton mode="link">Action</IxButton>
    </template>
  </IxTable>
</template>

<script lang="ts" setup>
import { TableColumn, TableScroll } from '@idux/components/table'

interface Data {
  key: number
  name: string
  age: number
  address: string
}

const columns: TableColumn<Data>[] = [
  {
    type: 'selectable',
    fixed: 'start',
  },
  {
    title: 'Name',
    dataKey: 'name',
    width: 100,
    fixed: 'start',
    customCell: 'name',
  },
  {
    title: 'Age',
    dataKey: 'age',
    width: 100,
    fixed: 'start',
  },
  {
    title: 'Column 1',
    dataKey: 'address',
    width: '10%',
    key: 'Column 1',
  },
  {
    title: 'Column 2',
    dataKey: 'address',
    width: '10%',
    key: 'Column 2',
  },
  {
    title: 'Column 3',
    dataKey: 'address',
    width: '10%',
    key: 'Column 3',
  },
  {
    title: 'Column 4',
    dataKey: 'address',
    width: '10%',
    key: 'Column 4',
  },
  {
    title: 'Column 5',
    dataKey: 'address',
    key: 'Column 5',
  },
  {
    title: 'Column 6',
    dataKey: 'address',
    key: 'Column 6',
  },
  {
    title: 'Column 7',
    dataKey: 'address',
    key: 'Column 7',
  },
  {
    title: 'Column 8',
    dataKey: 'address',
    key: 'Column 8',
  },
  {
    title: 'Action',
    key: 'action',
    fixed: 'end',
    width: 100,
    customCell: 'action',
  },
]

const data: Data[] = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  })
}

const scroll: TableScroll = { width: 1500, height: 300 }
</script>
