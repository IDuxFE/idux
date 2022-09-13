<template>
  <IxSpace vertical block>
    <IxInputNumber
      v-model:value="containerHeight"
      style="width: 200px"
      :min="200"
      :max="600"
      :step="100"
    ></IxInputNumber>
    <div :style="{ height: `${containerHeight}px` }">
      <IxTree
        ref="treeRef"
        v-model:checkedKeys="checkedKeys"
        v-model:expandedKeys="expandedKeys"
        v-model:selectedKeys="selectedKeys"
        checkable
        autoHeight
        :dataSource="treeData"
      >
      </IxTree>
    </div>
  </IxSpace>
</template>

<script setup lang="ts">
import type { TreeNode } from '@idux/components/tree'

import { ref } from 'vue'

const containerHeight = ref(300)
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
      {
        label: 'Node 0-2',
        key: '0-2',
        children: [
          { label: 'Node 0-2-0', key: '0-2-0' },
          { label: 'Node 0-2-1', key: '0-2-1' },
        ],
      },
      {
        label: 'Node 0-3',
        key: '0-3',
        children: [
          { label: 'Node 0-3-0', key: '0-3-0' },
          { label: 'Node 0-3-1', key: '0-3-1' },
        ],
      },
      {
        label: 'Node 0-4',
        key: '0-4',
        children: [
          { label: 'Node 0-4-0', key: '0-4-0' },
          { label: 'Node 0-4-1', key: '0-4-1' },
        ],
      },
      {
        label: 'Node 0-5',
        key: '0-5',
        children: [
          { label: 'Node 0-5-0', key: '0-5-0' },
          { label: 'Node 0-5-1', key: '0-5-1' },
        ],
      },
      {
        label: 'Node 0-6',
        key: '0-6',
        children: [
          { label: 'Node 0-6-0', key: '0-6-0' },
          { label: 'Node 0-6-1', key: '0-6-1' },
        ],
      },
    ],
  },
]

const checkedKeys = ref(['0-0', '0-1'])
const expandedKeys = ref([])
const selectedKeys = ref(['0-1'])
</script>
