<template>
  <IxSpace vertical style="width: 100%">
    <IxTable :columns="columns" :dataSource="data">
      <template #name="{ value }">
        <IxButton mode="link">{{ value }}</IxButton>
      </template>
      <template #action="{ record }">
        <IxButtonGroup :gap="16" mode="link">
          <IxButton>Invite {{ record.name }}</IxButton>
          <IxButton>Delete</IxButton>
        </IxButtonGroup>
      </template>
    </IxTable>
    <IxButton @click="toggleEmpty"> ToggleEmpty </IxButton>
  </IxSpace>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'

import { TableColumn } from '@idux/components/table'
import { IxTag } from '@idux/components/tag'

interface Data {
  key: number
  name: string
  age: number
  address: string
  tags: string[]
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
    align: {
      title: 'start',
      cell: 'end',
    },
  },
  {
    title: 'Address',
    dataKey: 'address',
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
    customCell: 'action',
  },
]

const fullData: Data[] = []
for (let index = 0; index < 100; index++) {
  fullData.push({
    key: index,
    name: `Edrward ${index}`,
    age: 18 + index,
    address: `London Park no. ${index}`,
    tags: ['nice', 'developer'],
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
</script>
