<template>
  <IxProTable :columns="columns" :dataSource="data" header="Pro Table" :borderless="false" :scroll="scroll">
    <template #name="{ value }">
      <a>{{ value }}</a>
    </template>
    <template #action="{ record }">
      <a style="margin-right: 8px">Invite {{ record.name }}</a>
      <a>Delete</a>
    </template>
  </IxProTable>
</template>

<script lang="ts" setup>
import { ProTableColumn } from '@idux/pro/table'

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
  description: string
}

const columns: ProTableColumn<Data>[] = [
  {
    type: 'indexable',
    fixed: 'start',
    changeVisible: false,
  },
  {
    title: 'Name',
    dataKey: 'name',
    width: 100,
    customCell: 'name',
  },
  {
    title: 'Age',
    dataKey: 'age',
    width: 100,
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
        width: 200,
      },
    ],
  },
  {
    title: 'Gender',
    dataKey: 'gender',
    width: 80,
    fixed: 'end',
  },
  {
    key: 'action',
    title: 'Action',
    width: 200,
    fixed: 'end',
    customCell: 'action',
  },
]

const data: Data[] = []

for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: 18 + (i % 10),
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: 'M',
    description: `My name is John Brown, I am ${18 + (i % 10)} years old.`,
  })
}

const scroll = { width: 'calc(700px + 50%)', height: 240 }
</script>
