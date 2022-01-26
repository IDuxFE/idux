<template>
  <IxSpace vertical>
    <IxRadioGroup v-model:value="size" buttoned>
      <IxRadio value="sm">Small</IxRadio>
      <IxRadio value="md">Medium</IxRadio>
      <IxRadio value="lg">Large</IxRadio>
    </IxRadioGroup>
    <IxTreeSelect v-model:value="singleValue" :dataSource="treeData" :size="size" placeholder="尺寸" />
    <IxTreeSelect v-model:value="multipleValue" :dataSource="treeData" :size="size" multiple placeholder="尺寸" />
  </IxSpace>
</template>
<script setup lang="ts">
import type { FormSize } from '@idux/components/form'

import { ref } from 'vue'

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

const size = ref<FormSize>('md')
const singleValue = ref('0')
const multipleValue = ref(['0'])
</script>
<style lang="less" scoped>
.ix-space {
  width: 100%;
}
</style>
