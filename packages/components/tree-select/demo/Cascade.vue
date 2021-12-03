<template>
  <IxTreeSelect
    v-model:value="value"
    v-model:expandedKeys="expandedKeys"
    placeholder="级联"
    cascade
    checkable
    multiple
    :dataSource="treeData"
  />
</template>

<script setup lang="ts">
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
</script>
