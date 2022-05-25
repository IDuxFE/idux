<template>
  <IxTable :columns="columns" :dataSource="data" :borderless="false" :scroll="scroll">
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
  street: string
  building: string
  number: number
  companyAddress: string
  companyName: string
  gender: string
}

const columns: TableColumn<Data>[] = [
  {
    title: 'Name',
    dataKey: 'name',
    width: 100,
    fixed: 'start',
    customCell: 'name',
  },
  {
    key: 'other',
    title: 'Other',
    children: [
      {
        title: 'Age',
        dataKey: 'age',
        width: 150,
      },
      {
        key: 'address',
        title: 'Address',
        children: [
          {
            title: 'Street',
            dataKey: 'street',
            key: 'street',
            width: 150,
          },
          {
            key: 'block',
            title: 'Block',
            children: [
              {
                title: 'Building',
                dataKey: 'building',
                width: 100,
              },
              {
                title: 'Door No.',
                dataKey: 'number',
                width: 100,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 'company',
    title: 'Company',
    children: [
      {
        title: 'Company Address',
        dataKey: 'companyAddress',
        width: 200,
      },
      {
        title: 'Company Name',
        dataKey: 'companyName',
      },
    ],
  },
  {
    title: 'Gender',
    dataKey: 'gender',
    width: 80,
    fixed: 'end',
  },
]

const data: Data[] = []

for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: i + 1,
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: 'M',
  })
}

const scroll = { width: 'calc(700px + 50%)', height: 240 }
</script>
