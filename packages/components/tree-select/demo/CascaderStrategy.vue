<template>
  <IxSpace vertical>
    <IxRadioGroup v-model:value="cascaderStrategy">
      <IxRadio value="all">All</IxRadio>
      <IxRadio value="parent">Parent</IxRadio>
      <IxRadio value="child">Child</IxRadio>
      <IxRadio value="off">Off</IxRadio>
    </IxRadioGroup>
    <IxTreeSelect
      v-model:value="value"
      v-model:expandedKeys="expandedKeys"
      multiple
      :cascaderStrategy="cascaderStrategy"
      :dataSource="treeData"
    />
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { CascaderStrategy } from '@idux/components/cascader'

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

const value = ref(['0-0'])
const expandedKeys = ref(['0'])
const cascaderStrategy = ref<CascaderStrategy>('parent')
</script>
<style lang="less" scoped>
.ix-space {
  width: 100%;
}
</style>
