<template>
  <div style="height: 500px">
    <IxProTable
      autoHeight
      :columns="columns"
      :dataSource="dataSource"
      header="Pro Table"
      dndSortable
      virtual
      :pagination="false"
      :layoutTool="{ searchable: true }"
      :toolbar="toolbar"
      :onColumnsChange="onColumnsChange"
      :onDndSortChange="onSortChange"
      :onDndSortReorder="onDndSortReorder"
    >
      <template #name="{ value }">
        <a>{{ value }}</a>
      </template>
      <template #action="{ record }">
        <a style="margin-right: 8px">Invite {{ record.name }}</a>
        <a>Delete</a>
      </template>
    </IxProTable>
  </div>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'

import { IxButton } from '@idux/components/button'
import { ProTableColumn } from '@idux/pro/table'

interface Data {
  key: string
  name: string
  age: number
  address: string
  description: string
  children?: Data[]
}

const toolbar = [
  h(IxButton, { props: { size: 'xs' } }, 'Load'),
  h(IxButton, { props: { icon: 'reload', size: 'xs', title: 'reload', onClick: () => console.log('reload data') } }),
]

const onColumnsChange = console.log

const columns: ProTableColumn<Data>[] = [
  {
    type: 'selectable',
  },
  {
    type: 'indexable',
    layoutable: false,
  },
  {
    type: 'expandable',
    title: 'Name',
    dataKey: 'name',
    changeFixed: false,
    customCell: 'name',
    width: 150,
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
for (let index = 0; index < 100; index++) {
  data.push({
    key: `${index}`,
    name: `Edrward ${index}`,
    age: 18 + (index % 10),
    address: `London Park no. ${index}`,
    description: `My name is Edrward ${index}, I am ${
      18 + (index % 10)
    } years old, living in London Park no. ${index}.`,
    children:
      index % 3 === 0
        ? [
            {
              key: `${index}-0`,
              name: `Edrward ${index}-0`,
              age: 18 + ((index + 1) % 10),
              address: `London Park no. ${index}-0`,
              description: `My name is Edrward ${index}-0, I am ${
                18 + ((index + 1) % 10)
              } years old, living in London Park no. ${index}-0.`,
            },
            {
              key: `${index}-1`,
              name: `Edrward ${index}-1`,
              age: 18 + ((index + 2) % 10),
              address: `London Park no. ${index}-1`,
              description: `My name is Edrward ${index}-1, I am ${
                18 + ((index + 2) % 10)
              } years old, living in London Park no. ${index}-1.`,
            },
          ]
        : undefined,
  })
}

const dataSource = ref(data)

const onSortChange = (newData: Data[]) => {
  console.log('onSortChange', newData)
  dataSource.value = newData
}
const onDndSortReorder = console.log
</script>
