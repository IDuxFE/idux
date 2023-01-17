<template>
  <IxProTransfer
    v-model:value="targetKeys"
    searchable
    :search-fn="searchFn"
    type="tree"
    :disable-data="disableData"
    :data-source="dataSource"
    mode="immediate"
  />
</template>

<script setup lang="ts">
import type { TransferData } from '@idux/pro/transfer'

import { ref } from 'vue'

const targetKeys = ref<string[]>(['1-2', '1-2-1', '1-2-2', '1-3-2-1', '2'])

interface Data extends TransferData {
  key: string
  label: string
  children?: Data[]
}

const searchFn = (_: boolean, item: unknown, searchValue: string | undefined) => {
  return !searchValue || (item as Data).label.indexOf(searchValue) > -1
}

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
        label: 'Selection-1-2-parent',
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
