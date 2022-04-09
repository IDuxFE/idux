<template>
  <IxTagGroup
    v-model:activeKeys="activeKeys"
    :dataSource="list"
    :clickable="true"
    :gap="48"
    shape="round"
    @click="handleClick"
  ></IxTagGroup>
</template>

<script lang="ts" setup>
import type { VKey } from '@idux/cdk/utils'
import type { TagData } from '@idux/components/tag'

import { computed, ref } from 'vue'

const activeKeys = ref<VKey[]>([])

const list = computed<TagData[]>(() => {
  return [
    '斗之气',
    '斗者',
    '斗师',
    '大斗师',
    '斗灵',
    '斗王',
    '斗皇',
    '斗宗',
    '斗尊',
    '斗尊巅峰',
    '半圣',
    '斗圣',
    '斗帝',
  ].map((label, idx) => ({
    key: idx,
    label,
    color: activeKeys.value.includes(idx) ? 'success' : 'info',
  }))
})

const handleClick = (k: VKey, evt: MouseEvent) => {
  console.log(k, evt)
}
</script>
