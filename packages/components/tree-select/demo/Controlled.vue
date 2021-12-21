<template>
  <IxTreeSelect
    placeholder="单选"
    checkable
    :value="selectedValue"
    :expandedKeys="expandedKeys"
    :dataSource="treeData"
    :onChange="onChange"
    :onExpandedChange="onExpandedChange"
  />
</template>

<script setup lang="ts">
import type { VKey } from '@idux/cdk/utils'
import type { TreeSelectNode } from '@idux/components/tree-select'

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

const selectedValue = ref<VKey>('0-0')
const expandedKeys = ref<VKey[]>(['0'])

const onChange = (currValue: VKey, oldValue: VKey, node: TreeSelectNode | TreeSelectNode[]) => {
  console.log('onChange: ', currValue, oldValue, node)
  selectedValue.value = currValue
}

const onExpandedChange = (keys: VKey[], nodes: TreeSelectNode[]) => {
  console.log('onExpandedChange', keys, nodes)
  expandedKeys.value = keys
}
</script>
