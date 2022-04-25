<template>
  <IxCascader placeholder="Virtual scroll" :dataSource="dataSource" virtual />
</template>

<script setup lang="ts">
import { CascaderData } from '@idux/components/cascader'

function genData(path = '0', level = 1) {
  const data = []

  for (let index = 0; index < 1000; index++) {
    const key = `${path}-${index}`
    const node: CascaderData = {
      key,
      label: key,
    }

    if (level > 0) {
      node.children = genData(key, level - 1)
    }

    data.push(node)
  }
  return data
}

const dataSource = genData()
</script>
