<template>
  <IxTreeSelect placeholder="异步加载" :dataSource="treeData" :loadChildren="loadChildren" :onLoaded="onLoaded" />
</template>

<script setup lang="ts">
import type { VKey } from '@idux/cdk/utils'
import type { TreeSelectNode } from '@idux/components/tree-select'

const treeData: TreeSelectNode[] = [
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

const loadChildren = (node: TreeSelectNode) => {
  return new Promise<TreeSelectNode[]>(resolve => {
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

const onLoaded = (loadedKeys: VKey[], node: TreeSelectNode) => {
  console.log('onLoaded', loadedKeys, node)
}
</script>
