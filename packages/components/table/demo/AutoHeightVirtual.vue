<template>
  <IxSpace vertical block>
    <IxInputNumber
      v-model:value="containerHeight"
      style="width: 200px"
      :min="200"
      :max="600"
      :step="100"
    ></IxInputNumber>
    <div :style="{ height: `${containerHeight}px`, marginTop: '8px' }">
      <IxTable :columns="columns" :dataSource="data" :pagination="false" autoHeight virtual>
        <template #name="{ value }">
          <IxButton mode="link">{{ value }}</IxButton>
        </template>
      </IxTable>
    </div>
  </IxSpace>
</template>

<script lang="ts" setup>
import type { TableColumn } from '@idux/components/table'

import { ref } from 'vue'

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
    customCell: 'name',
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
for (let index = 0; index < 10000; index++) {
  data.push({
    key: index,
    name: `Edrward ${index}`,
    age: 18 + index,
    address: `London Park no. ${index}`,
  })
}

const containerHeight = ref(300)
</script>
