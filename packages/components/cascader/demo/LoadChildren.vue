<template>
  <IxCascader placeholder="Load children" :dataSource="treeData" :loadChildren="loadChildren" :onLoaded="onLoaded" />
</template>

<script setup lang="ts">
import type { VKey } from '@idux/cdk/utils'
import type { CascaderData } from '@idux/components/cascader'

const treeData: CascaderData[] = [
  {
    label: 'Parent 0',
    key: '0',
  },
  {
    label: 'Parent 1',
    key: '1',
  },
  {
    label: 'Child Node ',
    key: '2',
    isLeaf: true,
  },
]

const loadChildren = (node: CascaderData) => {
  return new Promise<CascaderData[]>(resolve => {
    setTimeout(() => {
      const parentKey = node.key as string
      const isLeaf = parentKey.length > 4
      const children = [
        {
          label: `Child Node ${parentKey}-0 `,
          key: `${parentKey}-0`,
          isLeaf: isLeaf,
        },
        {
          label: `Child Node ${parentKey}-1 `,
          key: `${parentKey}-1`,
          isLeaf: isLeaf,
        },
      ]
      resolve(children)
    }, 1000)
  })
}

const onLoaded = (loadedKeys: VKey[], node: CascaderData) => {
  console.log('onLoaded', loadedKeys, node)
}
</script>
