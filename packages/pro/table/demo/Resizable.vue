<template>
  <IxProTable
    :columns="columns"
    :dataSource="data"
    header="Pro Table"
    :scroll="scroll"
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
import { ProTableColumn } from '@idux/pro/table'

interface Data {
  key: number
  name: string
  age: number
  address: string
  tags: string[]
  description: string
}

const toolbar = [
  h(IxButton, { size: 'xs' }, () => 'Load'),
  h(IxButton, { icon: 'reload', size: 'xs', title: 'reload', onClick: () => console.log('reload data') }),
]

const onColumnsChange = console.log

const columns: ProTableColumn<Data>[] = [
  {
    type: 'indexable',
    changeVisible: false,
    width: 60,
  },
  {
    title: 'Name',
    dataKey: 'name',
    changeFixed: false,
    customCell: 'name',
    width: 100,
    minWidth: 100,
    maxWidth: 300,
    resizable: true,
  },
  {
    title: 'Age',
    dataKey: 'age',
    changeFixed: false,
    width: 100,
    resizable: true,
    sortable: {
      sorter: (curr, next) => curr.age - next.age,
    },
  },
  {
    title: 'Address',
    dataKey: 'address',
    changeFixed: false,
    width: 200,
    minWidth: 100,
    resizable: true,
  },
  {
    title: 'Tags',
    dataKey: 'tags',
    width: 200,
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
    width: 200,
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

const scroll = { width: 1200 }
</script>
