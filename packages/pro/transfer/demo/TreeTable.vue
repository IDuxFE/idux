<template>
  <IxSpace vertical>
    <IxRadioGroup v-model:value="cascaderStrategy">
      <IxRadio value="all">All</IxRadio>
      <IxRadio value="parent">Parent</IxRadio>
      <IxRadio value="child">Child</IxRadio>
      <IxRadio value="off">Off</IxRadio>
    </IxRadioGroup>
    <IxProTransfer
      v-model:value="targetKeys"
      type="tree-table"
      mode="immediate"
      :scroll="{ width: { source: 500, target: 300 } }"
      :data-source="dataSource"
      :table-props="tableProps"
    />
    <span>{{ targetKeys }}</span>
  </IxSpace>
</template>

<script setup lang="ts">
import type { CascaderStrategy } from '@idux/components/cascader'
import type { TransferData } from '@idux/pro/transfer'

import { computed, ref, watch } from 'vue'

import { TableColumn } from '@idux/components/table'

interface Data extends TransferData {
  key: string
  disabled: boolean
  name: string
  age: number
  address: string
}

const sourceColumns: TableColumn<Data>[] = [
  {
    type: 'expandable',
    title: 'Name',
    dataKey: 'name',
    width: 'auto',
    indent: 16,
  },
  {
    title: 'Age',
    dataKey: 'age',
    width: 60,
  },
  {
    title: 'Address',
    dataKey: 'address',
    width: 150,
  },
]

const targetColumns: TableColumn<Data>[] = [
  {
    type: 'expandable',
    title: 'Name',
    dataKey: 'name',
    width: 'auto',
    indent: 16,
  },
]

const cascaderStrategy = ref<CascaderStrategy>('all')
const targetKeys = ref<string[]>([])

const tableProps = computed(() => ({
  sourceColumns,
  targetColumns,
  cascaderStrategy: cascaderStrategy.value,
}))

watch(cascaderStrategy, () => {
  targetKeys.value = []
})

const getData = (key: string) => {
  return {
    key,
    name: 'Candidate' + key,
    age: 18,
    address: 'London No.1 Lake Park',
  }
}

const dataSource: Data[] = [
  {
    ...getData('1'),
    disabled: false,
    children: [
      {
        ...getData('1-1'),
        disabled: false,
      },
      {
        ...getData('1-2'),
        disabled: false,
        children: [
          {
            ...getData('1-2-1'),
            disabled: false,
          },
          {
            ...getData('1-2-2'),
            disabled: false,
          },
        ],
      },
      {
        ...getData('1-3'),
        disabled: false,
        children: [
          {
            ...getData('1-3-1'),
            disabled: false,
          },
          {
            ...getData('1-3-2'),
            disabled: false,
            children: [
              {
                ...getData('1-3-2-1'),
                disabled: true,
              },
              {
                ...getData('1-3-2-2'),
                disabled: false,
              },
            ],
          },
        ],
      },
      {
        ...getData('1-4'),
        disabled: false,
      },
    ],
  },
  {
    ...getData('2'),
    disabled: false,
  },
]
</script>
