<template>
  <div ref="dragRef" :style="{ border: '1px dashed gray' }">
    <IxButton ref="dragHandleRef">局部拖放</IxButton>
    通过把柄拖动整体
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useDraggable } from '../src/composables/useDraggable'

const dragRef = ref(null)
const dragHandleRef = ref(null)

useDraggable(dragRef, { handle: dragHandleRef, free: true })
</script>
