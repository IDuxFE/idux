<template>
  <IxInputNumber
    v-model:value="containerHeight"
    style="width: 120px; margin-bottom: 8px"
    :min="200"
    :max="800"
    :step="100"
  ></IxInputNumber>

  <div :style="{ height: `${containerHeight}px`, marginTop: '8px' }">
    <IxTable :columns="columns" :dataSource="data" autoHeight :scroll="scroll">
      <template #name="{ value }">
        <IxButton mode="link">{{ value }}</IxButton>
      </template>
      <template #action>
        <IxButton>Action</IxButton>
      </template>
    </IxTable>
  </div>
  <br />
  <IxButton @click="toggleEmpty">ToggleEmpty</IxButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { TableColumn, TableScroll } from '@idux/components/table'

const containerHeight = ref(400)

interface Data {
  key: number
  name: string
  age: number
  address: string
}

const columns: TableColumn<Data>[] = [
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
    title: 'Column 1',
    dataKey: 'address',
    width: 150,
    key: 'Column 1',
  },
  {
    title: 'Column 2',
    dataKey: 'address',
    width: 150,
    key: 'Column 2',
  },
  {
    title: 'Column 3',
    dataKey: 'address',
    width: 150,
    key: 'Column 3',
  },
  {
    title: 'Column 4',
    dataKey: 'address',
    width: 150,
    key: 'Column 4',
  },
  {
    title: 'Column 5',
    dataKey: 'address',
    width: 150,
    key: 'Column 5',
  },
  {
    title: 'Column 6',
    dataKey: 'address',
    width: 150,
    key: 'Column 6',
  },
  {
    title: 'Column 7',
    dataKey: 'address',
    width: 150,
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
    width: 100,
    customCell: 'action',
  },
]

const fullData: Data[] = []
for (let i = 0; i < 100; i++) {
  fullData.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  })
}

const data = ref<Data[]>(fullData)

const toggleEmpty = () => {
  if (data.value.length > 0) {
    data.value = []
  } else {
    data.value = fullData
  }
}

const scroll: TableScroll = { width: 1500 }
</script>
