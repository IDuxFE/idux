<template>
  <IxTextarea ref="textareaRef" :value="text" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useResizeObserver } from '@idux/cdk/resize'

const textareaRef = ref()
const text = ref('')

useResizeObserver(textareaRef, entry => {
  console.log(entry)
  const { contentRect } = entry
  text.value = `height: ${contentRect.height}`
})
</script>
