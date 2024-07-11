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
      @columnsChange="onColumnsChange"
      @dndSortChange="onSortChange"
      @dndSortReorder="console.log"
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
  key: number
  name: string
  age: number
  address: string
  description: string
}

const toolbar = [
  h(IxButton, { size: 'xs' }, () => 'Load'),
  h(IxButton, { icon: 'reload', size: 'xs', title: 'reload', onClick: () => console.log('reload data') }),
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
for (let index = 0; index < 100; index++) {
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

const dataSource = ref(data)

const onSortChange = (newData: Data[]) => {
  console.log('onSortChange', newData)
  dataSource.value = newData
}
</script>
