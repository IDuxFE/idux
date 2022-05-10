<template>
  <IxSpace vertical>
    <IxRadioGroup v-model:value="searchableValue" :dataSource="searchableData" />
    <IxTreeSelect
      placeholder="搜索"
      clearable
      checkable
      multiple
      :dataSource="treeData"
      :searchable="searchableValue"
    />
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { type RadioData } from '@idux/components/radio'

const searchableValue = ref(true)

const searchableData = [
  { key: true, label: 'True' },
  { key: 'overlay', label: 'Overlay' },
  { key: false, label: 'False' },
] as RadioData[]

const treeData = [
  {
    label: 'Node 0',
    key: '0',
    children: [
      {
        label: 'Node 0-0',
        key: '0-0',
        children: [
          {
            label: 'Node 0-0-0',
            key: '0-0-0',
          },
          {
            label: 'Node 0-0-1',
            key: '0-0-1',
          },
        ],
      },
      {
        label: 'Node 0-1',
        key: '0-1',
        children: [
          { label: 'Node 0-1-0', key: '0-1-0' },
          { label: 'Node 0-1-1', key: '0-1-1' },
        ],
      },
    ],
  },
]
</script>
<style lang="less" scoped>
.ix-space {
  width: 100%;
}
</style>
