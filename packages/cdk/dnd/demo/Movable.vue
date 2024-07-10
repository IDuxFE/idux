<template>
  <IxSpace vertical>
    <div class="dnd-movable-wrapper">
      <CdkDndMovable class="dnd-movable-item" :mode="mode" :strategy="strategy" :allowedAxis="allowedAxis">
        <CdkDndMovableHandle v-if="useHandle" class="dnd-movable-item__handle">
          <IxIcon name="holder" />
        </CdkDndMovableHandle>
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
      <IxSpace>
        <span>allowedAxis: </span>
        <IxRadioGroup v-model:value="allowedAxis" :dataSource="axises" />
      </IxSpace>
      <IxSpace>
        <span>use drag handle: </span>
        <IxSwitch v-model:checked="useHandle" />
      </IxSpace>
    </IxSpace>
  </IxSpace>
</template>

<script setup lang="ts">
import type { Axis, DndMovableMode, DndMovableStrategy } from '@idux/cdk/dnd'
import type { RadioData } from '@idux/components/radio'

import { ref } from 'vue'

const strategy = ref<DndMovableStrategy>('transform')
const mode = ref<DndMovableMode>('afterDrop')
const allowedAxis = ref<Axis>('all')
const useHandle = ref<boolean>(false)

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
const axises: RadioData[] = [
  {
    key: 'all',
    label: 'all',
  },
  {
    key: 'horizontal',
    label: 'horizontal',
  },
  {
    key: 'vertical',
    label: 'vertical',
  },
]
</script>

<style scoped lang="less">
.dnd-movable-wrapper {
  width: 100%;
  height: 300px;
  position: relative;
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

  &__handle {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
  }
}
</style>
