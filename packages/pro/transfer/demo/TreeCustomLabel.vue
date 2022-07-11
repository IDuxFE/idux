<template>
  <IxProTransfer
    v-model:value="targetKeys"
    type="tree"
    :data-source="dataSource"
    :scroll="{ height: 300, fullHeight: true }"
  >
    <template #label="{ item, isSource }">
      <span v-if="isSource">{{ item.label }}</span>
      <span v-else>{{ item.key }}</span>
    </template>
  </IxProTransfer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Data {
  key: string
  disabled: boolean
  label: string
  children?: Data[]
}

const targetKeys = ref<string[]>(['1-2', '1-2-1', '1-2-2', '1-3-2-1', '2'])

const dataSource: Data[] = [
  {
    key: '1',
    disabled: false,
    label: 'Selection-1',
    children: [
      {
        key: '1-1',
        disabled: false,
        label: 'Selection-1-1',
      },
      {
        key: '1-2',
        disabled: false,
        label: 'Selection-1-2',
        children: [
          {
            key: '1-2-1',
            disabled: false,
            label: 'Selection-1-2-1',
          },
          {
            key: '1-2-2',
            disabled: false,
            label: 'Selection-1-2-2',
          },
        ],
      },
      {
        key: '1-3',
        disabled: false,
        label: 'Selection-1-3',
        children: [
          {
            key: '1-3-1',
            disabled: false,
            label: 'Selection-1-3-1',
          },
          {
            key: '1-3-2',
            disabled: false,
            label: 'Selection-1-3-2',
            children: [
              {
                key: '1-3-2-1',
                disabled: true,
                label: 'Selection-1-3-2-1',
              },
              {
                key: '1-3-2-2',
                disabled: false,
                label: 'Selection-1-3-2-2',
              },
            ],
          },
        ],
      },
      {
        key: '1-4',
        disabled: false,
        label: 'Selection-1-4',
      },
    ],
  },
  {
    key: '2',
    disabled: false,
    label: 'Selection-2',
  },
]
</script>
