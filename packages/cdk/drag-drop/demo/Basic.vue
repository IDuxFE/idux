<template>
  <div ref="elementRef" class="draggable-basic" :style="`left:${position.left}px;top:${position.top}px;`">
    Draggable dom!
  </div>
  <br />
  <br />
  <br />
  <CdkDraggable class="draggable-basic" @start="onStart" @move="onMove" @end="onEnd"> CdkDraggable! </CdkDraggable>
  <br />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { DraggableEvent, useDraggable } from '@idux/cdk/drag-drop'

const elementRef = ref()

const onStart: DraggableEvent = (position, evt) => console.log('onStart', position, evt)
const onMove: DraggableEvent = (position, evt) => console.log('onMove', position, evt)
const onEnd: DraggableEvent = (position, evt) => console.log('onEnd', position, evt)

const { position } = useDraggable(elementRef, { onStart, onMove, onEnd })
</script>

<style scoped lang="less">
.draggable-basic {
  position: fixed;
  z-index: 10;
  cursor: move;
  user-select: none;
  padding: 8px;
  background-color: #fff;
  border: 1px solid #c3c3c3;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}
</style>
