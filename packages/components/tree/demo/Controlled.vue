<template>
  <IxTree
    :checkedKeys="checkedKeys"
    :expandedKeys="expandedKeys"
    :selectedKeys="selectedKeys"
    checkable
    :dataSource="treeData"
    @checkedChange="onCheckedChange"
    @expandedChange="onExpandedChange"
    @selectedChange="onSelectedChange"
  >
  </IxTree>
</template>

<script setup lang="ts">
import type { VKey } from '@idux/cdk/utils'
import type { TreeNode } from '@idux/components/tree'

import { ref } from 'vue'

const treeData: TreeNode[] = [
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

const checkedKeys = ref<VKey[]>(['0-0', '0-1'])
const expandedKeys = ref<VKey[]>(['0', '0-0', '0-1'])
const selectedKeys = ref<VKey[]>(['0-1'])

const onCheckedChange = (keys: VKey[], nodes: TreeNode[]) => {
  console.log('onCheckedChange', keys, nodes)
  checkedKeys.value = keys
}

const onExpandedChange = (keys: VKey[], nodes: TreeNode[]) => {
  console.log('onExpandedChange', keys, nodes)
  expandedKeys.value = keys
}

const onSelectedChange = (keys: VKey[], nodes: TreeNode[]) => {
  console.log('onSelectedChange', keys, nodes)
  selectedKeys.value = keys
}
</script>
