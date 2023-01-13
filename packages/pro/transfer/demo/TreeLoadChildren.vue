<template>
  <IxProTransfer
    v-model:value="targetKeys"
    type="tree"
    :data-source="dataSource"
    :tree-props="{ loadChildren }"
    :scroll="{ height: 300, fullHeight: true }"
  />
</template>

<script setup lang="ts">
import type { TreeNode } from '@idux/components/tree'
import type { TransferData } from '@idux/pro/transfer'

import { ref } from 'vue'

interface Data extends TransferData {
  key: string
  disabled: boolean
  label: string
  children?: Data[]
}

const targetKeys = ref<string[]>([])
const loadChildren = ((node: Data) => {
  const depth = node.key.split('-').length
  if (depth > 2) {
    return
  }

  return new Promise(resolve => {
    setTimeout(
      () =>
        resolve(
          Array.from(new Array(5)).map((_, index) => ({
            key: `${node.key}-${index + 1}`,
            disabled: false,
            label: `${node.label}-${index + 1}`,
            children: [],
            isLeaf: depth >= 2,
          })),
        ),
      1000,
    )
  })
}) as (node: TreeNode) => Promise<TreeNode[]>

const dataSource: Data[] = [
  {
    key: '1',
    disabled: false,
    label: 'Selection-1',
    children: [],
  },
  {
    key: '2',
    disabled: false,
    label: 'Selection-2',
    children: [],
  },
]
</script>
