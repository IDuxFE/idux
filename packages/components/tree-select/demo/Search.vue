<template>
  <IxSpace direction="vertical">
    <IxSpace> searchable：<IxRadioGroup v-model:value="searchableValue" :options="options" /> </IxSpace>
    <IxTreeSelect
      placeholder="搜索"
      clearable
      checkable
      multiple
      :dataSource="treeData"
      :searchable="searchableValue"
      :onSearchedChange="onSearchedChange"
    />
  </IxSpace>
</template>

<script setup lang="ts">
import type { VKey } from '@idux/cdk/utils'
import type { RadioOption } from '@idux/components/radio'
import type { TreeSelectNode } from '@idux/components/tree-select'

import { ref } from 'vue'

const searchableValue = ref(true)

const options: RadioOption[] = [
  { label: 'true', value: true },
  { label: 'overlay', value: 'overlay' },
  { label: 'false', value: false },
]

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

const onSearchedChange = (searchedKeys: VKey[], searchedNodes: TreeSelectNode[]) => {
  console.log('onSearchedChange', searchedKeys, searchedNodes)
}
</script>
<style lang="less" scoped>
.ix-space {
  width: 100%;
}
</style>
