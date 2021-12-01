<template>
  <IxTree
    v-model:checkedKeys="checkedKeys"
    v-model:expandedKeys="expandedKeys"
    v-model:selectedKeys="selectedKeys"
    checkable
    :dataSource="treeData"
    @check="onCheck"
    @expand="onExpand"
    @select="onSelect"
  >
  </IxTree>
</template>

<script setup lang="ts">
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

const checkedKeys = ref(['0-0', '0-1'])
const expandedKeys = ref(['0', '0-0', '0-1'])
const selectedKeys = ref(['0-1'])

const onCheck = (checked: boolean, node: TreeNode) => console.log('checked', checked, node)
const onExpand = (expanded: boolean, node: TreeNode) => console.log('expanded', expanded, node)
const onSelect = (selected: boolean, node: TreeNode) => console.log('selected', selected, node)
</script>
