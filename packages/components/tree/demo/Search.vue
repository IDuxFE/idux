<template>
  <IxInput v-model:value="searchValue" placeholder="Search" suffix="search"></IxInput>
  <br />
  <br />
  <IxTree :dataSource="treeData" :searchValue="searchValue"></IxTree>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { TreeNode } from '@idux/components/tree'

const treeData = ref<TreeNode[]>([
  {
    label: 'Node 0',
    key: '0',
    children: [
      {
        label: 'Node 0-0',
        key: '0-0',
        disabled: { drop: true },
        children: [
          {
            label: 'Node 0-0-0',
            key: '0-0-0',
            disabled: { drag: true },
          },
          { label: 'Node 0-0-1', key: '0-0-1' },
          { label: 'Node 0-0-2', key: '0-0-2' },
        ],
      },
      {
        label: 'Node 0-1',
        key: '0-1',
        children: [
          { label: 'Node 0-1-0', key: '0-1-0' },
          { label: 'Node 0-1-1', key: '0-1-1' },
          { label: 'Node 0-1-2', key: '0-1-2' },
        ],
      },
    ],
  },
  {
    label: 'Node 1',
    key: '1',
    children: [
      {
        label: 'Node 1-0',
        key: '1-0',
        children: [
          { label: 'Node 1-0-0', key: '1-0-0' },
          { label: 'Node 1-0-1', key: '1-0-1' },
          { label: 'Node 1-0-2', key: '1-0-2' },
        ],
      },
      {
        label: 'Node 1-1',
        key: '1-1',
        children: [
          { label: 'Node 1-1-0', key: '1-1-0' },
          { label: 'Node 1-1-1', key: '1-1-1' },
          { label: 'Node 1-1-2', key: '1-1-2' },
        ],
      },
    ],
  },
  { label: 'Node 2', key: '2' },
])

const searchValue = ref('')
</script>
