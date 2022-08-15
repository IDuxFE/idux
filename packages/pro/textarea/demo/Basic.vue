<template>
  <IxProTextarea v-model:value="value" :onChange="onChange" placeholder="Basic usage"></IxProTextarea>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const onChange = (value: string, oldValue: string) => {
  console.log(value, oldValue)
}
</script>

<style scoped lang="less">
.ix-pro-textarea {
  width: 480px;
  height: 210px;
}
</style>
