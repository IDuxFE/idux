<template>
  <IxTreeSelect
    v-model:value="value"
    v-model:expandedKeys="expandedKeys"
    placeholder="单选"
    checkable
    getKey="value"
    labelKey="text"
    childrenKey="options"
    :dataSource="treeData"
    :onExpand="onExpand"
    :onSelect="onSelect"
  />
</template>

<script setup lang="ts">
import type { TreeSelectNode } from '@idux/components/tree-select'

import { ref } from 'vue'

const treeData = [
  {
    text: 'Node 0',
    value: '0',
    options: [
      {
        text: 'Node 0-0',
        value: '0-0',
        options: [
          {
            text: 'Node 0-0-0',
            value: '0-0-0',
          },
          {
            text: 'Node 0-0-1',
            value: '0-0-1',
          },
        ],
      },
      {
        text: 'Node 0-1',
        value: '0-1',
        options: [
          { text: 'Node 0-1-0', value: '0-1-0' },
          { text: 'Node 0-1-1', value: '0-1-1' },
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
