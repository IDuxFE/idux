<template>
  <IxSpace vertical>
    checkStrategy：
    <IxRadioGroup v-model:value="checkStrategy">
      <IxRadio value="all">all</IxRadio>
      <IxRadio value="parent">parent</IxRadio>
      <IxRadio value="child">child</IxRadio>
    </IxRadioGroup>
    <IxTreeSelect
      v-model:value="value"
      v-model:expandedKeys="expandedKeys"
      placeholder="勾选策略"
      cascade
      checkable
      multiple
      :dataSource="treeData"
      :checkStrategy="checkStrategy"
    />
  </IxSpace>
</template>

<script setup lang="ts">
import type { TreeCheckStrategy } from '@idux/components/tree'

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

const value = ref(['0-0'])
const expandedKeys = ref(['0'])
const checkStrategy = ref<TreeCheckStrategy>('parent')
</script>
<style lang="less" scoped>
.ix-space {
  width: 100%;
}
</style>
