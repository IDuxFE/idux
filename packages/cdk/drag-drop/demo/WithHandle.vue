<template>
  <div ref="dragRef" class="test-block">
    <IxButton ref="dragHandleRef">通过把柄拖动</IxButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useDraggable } from '../src/composables/useDraggable'

const dragRef = ref(null)
const dragHandleRef = ref(null)

useDraggable(dragRef, { handler: dragHandleRef, free: true })
</script>

<style scoped lang="less">
.test-block {
  width: 180px;
  height: 100px;
  padding: 30px;
  border: 1px dashed;
}
</style>
