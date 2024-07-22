<template>
  <IxSpace vertical block>
    <IxInput v-model:value="searchValue" placeholder="Search" suffix="search"></IxInput>
    <IxTree
      v-model:expandedKeys="expandedKeys"
      cascaderStrategy="all"
      checkable
      :dataSource="treeData"
      :searchValue="searchValue"
      :height="400"
      virtual
    ></IxTree>
  </IxSpace>
</template>

<script setup lang="ts">
import type { VKey } from '@idux/cdk/utils'
import type { TreeNode } from '@idux/components/tree'

import { ref } from 'vue'

const expandedKeys = ref<VKey[]>(['root'])

function genData(path = '0', level = 1) {
  const data = []

  for (let index = 0; index < 100; index++) {
    const key = `${path}-${index}`
    const node: TreeNode = {
      key,
      label: key,
      disabled: level === 0 && index === 5,
    }

    if (level > 0) {
      expandedKeys.value.push(key)
      node.children = genData(key, level - 1)
    }

    data.push(node)
  }
  return data
}

const treeData = [
  {
    key: 'root',
    label: '全部',
    children: genData(),
  },
]

const searchValue = ref('')
</script>
