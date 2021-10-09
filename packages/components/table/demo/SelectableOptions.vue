<template>
  <IxTable v-model:selectedRowKeys="selectedRowKeys" :columns="columns" :dataSource="data">
    <template #name="{ value }">
      <a>{{ value }}</a>
    </template>
  </IxTable>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { TableColumn } from '@idux/components/table'

interface Data {
  key: number
  name: string
  age: number
  address: string
}

const selectedRowKeys = ref<(string | number)[]>([])

const columns: TableColumn<Data>[] = [
  {
    type: 'selectable',
    disabled: record => record.key % 10 === 9,
    options: [
      'all',
      'invert',
      'none',
      'pageInvert',
      {
        key: 'odd',
        label: 'Select Odd Row',
        onClick: currentPageRowKeys => {
          selectedRowKeys.value = currentPageRowKeys.filter((_, index) => index % 2 === 0)
        },
      },
      {
        key: 'even',
        label: 'Select Even Row',
        onClick: currentPageRowKeys => {
          selectedRowKeys.value = currentPageRowKeys.filter((_, index) => index % 2 !== 0)
        },
      },
    ],
    onChange: (selectedKeys, selectedRows) => console.log(selectedKeys, selectedRows),
  },
  {
    title: 'Name',
    dataKey: 'name',
    customRender: 'name',
  },
  {
    title: 'Age',
    dataKey: 'age',
  },
  {
    title: 'Address',
    dataKey: 'address',
  },
]

const data: Data[] = []
for (let index = 0; index < 45; index++) {
  data.push({
    key: index,
    name: `Edrward ${index}`,
    age: 18 + index,
    address: `London Park no. ${index}`,
  })
}
</script>
