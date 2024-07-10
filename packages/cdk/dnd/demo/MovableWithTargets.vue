<template>
  <IxSpace vertical :gap="50">
    <IxSpace>
      <div ref="box1" class="dnd-movable-drop-box">box1</div>
      <div ref="box2" class="dnd-movable-drop-box">box2</div>
    </IxSpace>
    <IxSpace>
      <CdkDndMovable class="dnd-movable-item" :mode="mode" :dropTargets="[box1]">
        <div class="dnd-movable-item__inner"> Drag To Box1 </div>
      </CdkDndMovable>
      <CdkDndMovable class="dnd-movable-item" :mode="mode" :dropTargets="[box2]">
        <div class="dnd-movable-item__inner"> Drag To Box2 </div>
      </CdkDndMovable>
      <CdkDndMovable class="dnd-movable-item" :mode="mode" :dropTargets="[box1, box2]">
        <div class="dnd-movable-item__inner"> Drag To All </div>
      </CdkDndMovable>
    </IxSpace>
  </IxSpace>
</template>

<script setup lang="ts">
import type { DndMovableMode } from '@idux/cdk/dnd'

import { ref } from 'vue'

const mode = ref<DndMovableMode>('afterDrop')
const box1 = ref<HTMLElement>()
const box2 = ref<HTMLElement>()
</script>

<style scoped lang="less">
.dnd-movable-drop-box {
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30;
  border: 1px solid red;
}
.dnd-movable-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  background-color: red;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 600;
}
</style>
