<template>
  <IxProTable
    :columns="columns"
    :dataSource="data"
    header="Pro Table"
    :toolbar="toolbar"
    @columnsChange="onColumnsChange"
  >
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
import { h } from 'vue'

import { IxButton } from '@idux/components/button'
import { IxTag } from '@idux/components/tag'
import { ProTableColumn, ProTableToolbar } from '@idux/pro/table'

interface Data {
  key: number
  name: string
  age: number
  address: string
  tags: string[]
  description: string
}

const toolbar: ProTableToolbar[] = [
  { key: 'load', trigger: h(IxButton, null, () => 'Load') },
  { key: 'reload', trigger: 'reload', onClick: () => console.log('reload data'), title: 'reload' },
  'layout',
]

const onColumnsChange = console.log

const columns: ProTableColumn<Data>[] = [
  {
    type: 'indexable',
    changeVisible: false,
  },
  {
    title: 'Name',
    dataKey: 'name',
    changeFixed: false,
    customCell: 'name',
    resizable: true,
    minWidth: 100,
  },
  {
    title: 'Age',
    dataKey: 'age',
    changeFixed: false,
    resizable: true,
    maxWidth: 120,
  },
  {
    title: 'Address',
    dataKey: 'address',
    changeFixed: false,
    resizable: true,
    maxWidth: 300,
    minWidth: 150,
  },
  {
    title: 'Tags',
    dataKey: 'tags',
    customCell: ({ value }) =>
      value.map((tag: string) => {
        let color = tag.length > 5 ? 'warning' : 'success'
        if (tag === 'loser') {
          color = 'error'
        }
        return h(IxTag, { color }, { default: () => tag.toUpperCase() })
      }),
  },
  {
    title: 'Action',
    key: 'action',
    changeIndex: false,
    customCell: 'action',
  },
]

const data: Data[] = []
for (let index = 0; index < 100; index++) {
  data.push({
    key: index,
    name: `Edrward ${index}`,
    age: 18 + (index % 10),
    address: `London Park no. ${index}`,
    tags: ['nice', 'developer'],
    description: `My name is Edrward ${index}, I am ${
      18 + (index % 10)
    } years old, living in London Park no. ${index}.`,
  })
}
</script>
