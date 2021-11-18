<template>
  <IxTree :dataSource="treeData" :loadChildren="loadChildren"> </IxTree>
</template>

<script setup lang="ts">
import type { TreeNode } from '@idux/components/tree'

const treeData: TreeNode[] = [
  {
    label: 'Parent 0',
    key: '0',
  },
  {
    label: 'Parent 1',
    key: '1',
  },
  {
    label: 'Tree Node ',
    key: '2',
    isLeaf: true,
  },
]

const loadChildren = (node: TreeNode) => {
  return new Promise<TreeNode[]>(resolve => {
    setTimeout(() => {
      const parentKey = node.key as string
      const children = [
        {
          label: `Child ${parentKey}-0 `,
          key: `${parentKey}-0`,
        },
        {
          label: `Child ${parentKey}-1 `,
          key: `${parentKey}-1`,
        },
      ]
      resolve(children)
    }, 1000)
  })
}
</script>
