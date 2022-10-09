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
      type="tree"
      :tree-props="{ cascaderStrategy }"
      :data-source="dataSource"
    />
    <span>{{ targetKeys }}</span>
  </IxSpace>
</template>

<script setup lang="ts">
import type { CascaderStrategy } from '@idux/components/cascader'

import { ref, watch } from 'vue'

interface Data {
  key: string
  disabled: boolean
  label: string
  children?: Data[]
}

const cascaderStrategy = ref<CascaderStrategy>('all')
const targetKeys = ref<string[]>([])

watch(cascaderStrategy, () => {
  targetKeys.value = []
})

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
                disabled: false,
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
