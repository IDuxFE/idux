<template>
  <ix-input v-model:value="valueRef" addonBefore="http://" addonAfter=".com" />
  <br /><br />
  <ix-input v-model:value="valueRef">
    <template #addonBefore><ix-icon name="user" /></template>
    <template #addonAfter><ix-icon name="setting" /></template>
  </ix-input>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const valueRef = ref('my site')
    return { valueRef }
  },
})
</script>
