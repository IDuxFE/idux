<template>
  <IxTextarea ref="textareaRef" :value="text" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import { offResize, onResize } from '@idux/cdk/resize'
import { convertElement } from '@idux/cdk/utils'
import { TextareaInstance } from '@idux/components'

const textareaRef = ref<TextareaInstance>()
const text = ref('')

const handlerResize = (entry: ResizeObserverEntry) => {
  const { contentRect } = entry
  text.value = `height: ${contentRect.height}`
}

onMounted(() => onResize(convertElement(textareaRef), handlerResize))

onBeforeUnmount(() => offResize(convertElement(textareaRef), handlerResize))
</script>
