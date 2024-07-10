<template>
  <IxSpace vertical>
    <div ref="boundaryRef" class="dnd-movable-wrapper">
      <CdkDndMovable class="dnd-movable-item" :mode="mode" :strategy="strategy" :boundary="boundaryRef">
        <div class="dnd-movable-item__inner"> Drag Me </div>
      </CdkDndMovable>
    </div>
    <IxSpace vertical>
      <IxSpace>
        <span>strategy: </span>
        <IxRadioGroup v-model:value="strategy" :dataSource="strategies" />
      </IxSpace>
      <IxSpace>
        <span>mode: </span>
        <IxRadioGroup v-model:value="mode" :dataSource="modes" />
      </IxSpace>
    </IxSpace>
  </IxSpace>
</template>

<script setup lang="ts">
import type { DndMovableMode, DndMovableStrategy } from '@idux/cdk/dnd'
import type { RadioData } from '@idux/components/radio'

import { ref } from 'vue'

const strategy = ref<DndMovableStrategy>('transform')
const mode = ref<DndMovableMode>('afterDrop')
const boundaryRef = ref<HTMLElement>()

const strategies: RadioData[] = [
  {
    key: 'transform',
    label: 'transform',
  },
  {
    key: 'absolute',
    label: 'absolute',
  },
  {
    key: 'fixed',
    label: 'fixed',
  },
]
const modes: RadioData[] = [
  {
    key: 'afterDrop',
    label: 'afterDrop',
  },
  {
    key: 'immediate',
    label: 'immediate',
  },
]
</script>

<style scoped lang="less">
.dnd-movable-wrapper {
  width: 300px;
  height: 300px;
  position: relative;
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
