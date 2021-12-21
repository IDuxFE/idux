<template>
  <IxTreeSelect
    v-model:value="value"
    v-model:expandedKeys="expandedKeys"
    placeholder="单选"
    checkable
    :dataSource="treeData"
    :onExpand="onExpand"
    :onSelect="onSelect"
  >
  </IxTreeSelect>
</template>

<script setup lang="ts">
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

const value = ref('0-0')
const expandedKeys = ref(['0'])

const onExpand = (expanded: boolean, node: TreeSelectNode) => console.log('expanded', expanded, node)
const onSelect = (selected: boolean, node: TreeSelectNode) => console.log('select', selected, node)
</script>
