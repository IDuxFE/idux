<template>
  <IxSlider v-model:value="value0" :tooltip-formatter="tipFormatterFn0"></IxSlider>
  <IxSlider v-model:value="value1" :tooltip-formatter="tipFormatterFn1"></IxSlider>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'

import { IxIcon } from '@idux/components/icon'

const value0 = ref(30)
const value1 = ref(50)

function tipFormatterFn0(val: number) {
  return `人生进度：${val}%`
}

function tipFormatterFn1() {
  return h(IxIcon, { name: 'github' })
}
</script>
