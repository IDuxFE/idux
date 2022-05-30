<template>
  <IxProTable :columns="columns" :dataSource="data" :pagination="false">
    <template #header>
      <IxHeader title="Custom header">
        <template #suffix>
          <IxSpace align="center">
            <IxButton>Load</IxButton>
            <IxIcon name="reload"></IxIcon>
            <IxProTableLayoutTool></IxProTableLayoutTool>
          </IxSpace>
        </template>
      </IxHeader>
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
  address: string
  description: string
}

const columns: ProTableColumn<Data>[] = [
  {
    type: 'indexable',
  },
  {
    title: 'Name',
    dataKey: 'name',
    changeFixed: false,
    customCell: 'name',
  },
  {
    title: 'Age',
    dataKey: 'age',
    changeFixed: false,
  },
  {
    title: 'Address',
    dataKey: 'address',
    changeFixed: false,
  },
  {
    title: 'Action',
    key: 'action',
    changeIndex: false,
    customCell: 'action',
  },
]

const data: Data[] = []
for (let index = 0; index < 4; index++) {
  data.push({
    key: index,
    name: `Edrward ${index}`,
    age: 18 + (index % 10),
    address: `London Park no. ${index}`,
    description: `My name is Edrward ${index}, I am ${
      18 + (index % 10)
    } years old, living in London Park no. ${index}.`,
  })
}
</script>
