<template>
  <IxTree v-model:expandedKeys="expandedKeys" :dataSource="treeData" :height="200" virtual></IxTree>
</template>

<script setup lang="ts">
import type { VKey } from '@idux/cdk/utils'
import type { TreeNode } from '@idux/components/tree'

import { ref } from 'vue'

const expandedKeys = ref<VKey[]>([])

function genData(path = '0', level = 3) {
  const data = []

  for (let index = 0; index < 10; index++) {
    const key = `${path}-${index}`
    const node: TreeNode = {
      key,
      label: key,
    }

    if (level > 0) {
      expandedKeys.value.push(key)
      node.children = genData(key, level - 1)
    }

    data.push(node)
  }
  return data
}

const treeData = genData()
</script>
