<template>
  <IxSpace>
    <IxCheckbox v-model:checked="customExpandIcon">Custom expandIcon</IxCheckbox>
    <IxCheckbox v-model:checked="customLeafLineIcon">Custom leafLineIcon</IxCheckbox>
  </IxSpace>

  <IxTree
    v-model:expandedKeys="expandedKeys"
    blocked
    :dataSource="treeData"
    :leafLineIcon="customLeafLineIcon ? 'file' : undefined"
    showLine
  >
    <template #expandIcon="{ expanded }">
      <IxIcon v-if="customExpandIcon" :name="expanded ? 'folder-open' : 'folder'"></IxIcon>
      <IxIcon v-else name="right" :rotate="expanded ? 90 : 0"></IxIcon>
    </template>
  </IxTree>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { TreeNode } from '@idux/components/tree'

const customExpandIcon = ref(true)
const customLeafLineIcon = ref(true)
const expandedKeys = ref(['0', '0-0', '0-1'])

const treeData = ref<TreeNode[]>([
  {
    label: 'Node 0',
    key: '0',
    children: [
      {
        label: 'Node 0-0',
        key: '0-0',
        children: [
          { label: 'Node 0-0-0', key: '0-0-0' },
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
          { label: 'Node 0-1-2', key: '0-1-2', suffix: 'edit' },
        ],
      },
      { label: 'Node 0-2', key: '0-2' },
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
      { label: 'Node 1-2', key: '1-2' },
    ],
  },
  { label: 'Node 2', key: '2' },
])
</script>
