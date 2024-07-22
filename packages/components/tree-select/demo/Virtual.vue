<template>
  <IxTreeSelect placeholder="虚拟滚动" multiple checkable :dataSource="treeData" virtual></IxTreeSelect>
</template>

<script setup lang="ts">
import type { VKey } from '@idux/cdk/utils'
import type { TreeSelectNode } from '@idux/components/tree-select'

const expandedKeys: VKey[] = []

function genData(path = '0', level = 3) {
  const data = []

  for (let index = 0; index < 10; index++) {
    const key = `${path}-${index}`
    const node: TreeSelectNode = {
      key,
      label: key,
    }

    if (level > 0) {
      expandedKeys.push(key)
      node.children = genData(key, level - 1)
    }

    data.push(node)
  }
  return data
}

const treeData = genData()
</script>
