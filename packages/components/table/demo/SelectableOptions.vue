<template>
  <IxTable v-model:selectedRowKeys="selectedRowKeys" :columns="columns" :dataSource="data">
    <template #name="{ value }">
      <a>{{ value }}</a>
    </template>
  </IxTable>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { VKey } from '@idux/cdk/utils'
import { TableColumn } from '@idux/components/table'

interface Data {
  key: number
  name: string
  age: number
  address: string
}

const selectedRowKeys = ref<VKey[]>([])

const columns: TableColumn<Data>[] = [
  {
    type: 'selectable',
    disabled: record => record.key % 10 === 9,
    menus: [
      'all',
      'invert',
      'none',
      'pageInvert',
      {
        type: 'item',
        key: 'odd',

        label: 'Select Odd Row',
      },
      {
        type: 'item',
        key: 'even',
        label: 'Select Even Row',
      },
    ],
    onChange: (selectedKeys, selectedRows) => console.log(selectedKeys, selectedRows),
    onMenuClick: (options, currentPageRowKeys) => {
      const filterFlag = options.key === 'odd' ? 0 : 1
      selectedRowKeys.value = currentPageRowKeys.filter((_, index) => index % 2 === filterFlag)
    },
  },
  {
    title: 'Name',
    dataKey: 'name',
    slots: { cell: 'name' },
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
