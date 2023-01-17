<template>
  <IxProTransfer v-model:value="targetKeys" type="tree" :disable-data="disableData" :data-source="dataSource" />
</template>

<script setup lang="ts">
import type { TransferData } from '@idux/pro/transfer'

import { ref } from 'vue'

interface Data extends TransferData {
  key: string
  label: string
  children?: Data[]
}

const targetKeys = ref<string[]>(['1-2', '1-2-1', '1-2-2', '1-3-2-1', '2'])

const dataSource: Data[] = [
  {
    key: '1',
    label: 'Selection-1',
    children: [
      {
        key: '1-1',
        label: 'Selection-1-1',
      },
      {
        key: '1-2',
        label: 'Selection-1-2',
        children: [
          {
            key: '1-2-1',
            label: 'Selection-1-2-1',
          },
          {
            key: '1-2-2',
            label: 'Selection-1-2-2',
          },
        ],
      },
      {
        key: '1-3',
        label: 'Selection-1-3',
        children: [
          {
            key: '1-3-1',
            label: 'Selection-1-3-1',
          },
          {
            key: '1-3-2',
            label: 'Selection-1-3-2',
            children: [
              {
                key: '1-3-2-1',
                label: 'Selection-1-3-2-1',
              },
              {
                key: '1-3-2-2',
                label: 'Selection-1-3-2-2',
              },
            ],
          },
        ],
      },
      {
        key: '1-4',
        label: 'Selection-1-4',
      },
    ],
  },
  {
    key: '2',
    label: 'Selection-2',
  },
]

const disableData = (item: Data) => {
  return item.key === '1-3-2-1'
}
</script>
