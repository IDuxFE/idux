<template>
  <IxTagGroup :dataSource="data" :closable="true" @close="handleClose"></IxTagGroup>
</template>

<script lang="ts" setup>
import type { VKey } from '@idux/cdk/utils'
import type { TagData } from '@idux/components/tag'

import { reactive } from 'vue'

const data = reactive<TagData[]>([
  {
    key: 'a',
    label: '两数之和',
    color: 'success',
  },
  {
    key: 'b',
    label: '三数之和',
    color: 'success',
  },
  {
    key: 'c',
    label: '四数之和',
    color: 'success',
  },
  {
    key: 'd',
    label: 'M数之和',
    color: 'success',
  },
])

const handleClose = (k: VKey, evt: MouseEvent) => {
  const idx = data.findIndex(item => item.key === k)
  data.splice(idx, 1)
  console.log(k, evt)
}
</script>
