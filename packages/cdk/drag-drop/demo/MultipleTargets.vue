<template>
  <div ref="targetRef1" class="test-block"> </div>
  <div ref="targetRef2" class="test-block"> </div>
  <div ref="targetRef3" class="test-block"> </div>
  <br />
  <IxButton ref="dragRef">局部拖放</IxButton>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { useDraggable, useDroppable } from '@idux/cdk/drag-drop'

const dragRef = ref()
const targetRef1 = ref()
const targetRef2 = ref()
const targetRef3 = ref()

useDraggable(dragRef, { free: true, boundary: null })
useDroppable(targetRef1).connect(dragRef)
useDroppable(targetRef2).connect(dragRef)
useDroppable(targetRef3).connect(dragRef)
</script>

<style scoped lang="less">
.test-block {
  display: inline-block;
  margin-right: 10px;
  width: 200px;
  height: 200px;
  border: 1px dashed;
}
</style>
