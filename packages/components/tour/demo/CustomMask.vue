<template>
  <div>
    <IxButton @click="beginTour">Begin</IxButton>
    <IxDivider />
    <IxSpace>
      <div ref="firstBtnRef">
        <IxButton>Step1</IxButton>
      </div>
      <div ref="secondBtnRef">
        <IxButton>Step2</IxButton>
      </div>
      <div ref="thirdBtnRef">
        <IxButton>Step3</IxButton>
      </div>
    </IxSpace>
  </div>
  <IxTour v-model:visible="tourVisible" :steps="steps" :mask="mask"></IxTour>
</template>

<script setup lang="ts">
import type { TourStep } from '@idux/components/tour'

import { ref } from 'vue'

const tourVisible = ref(false)
const mask = ref({})
const steps = ref<TourStep[]>([])

let tmr: number

const beginTour = () => {
  clearTimeout(tmr)
  tmr = setTimeout(() => {
    mask.value = {
      container: { x: 10, y: 10, width: window.innerWidth - 20, height: window.innerHeight - 20 },
      class: 'demo-tour-custom-mask-cls',
      color: 'rgba(40, 0, 255)',
    }
    steps.value = [
      {
        title: 'Step1',
        description: 'this is description...',
        target: () => firstBtnRef.value,
      },
      {
        title: 'Step2',
        description: 'this is description...',
        target: () => secondBtnRef.value,
      },
      {
        title: 'Step3',
        description: 'this is description...',
        target: () => thirdBtnRef.value,
      },
    ]
    tourVisible.value = true
  }, 500)
}

const firstBtnRef = ref<HTMLElement>()
const secondBtnRef = ref<HTMLElement>()
const thirdBtnRef = ref<HTMLElement>()
</script>

<style lang="less">
.demo-tour-custom-mask-cls {
  opacity: 0.4;
}
</style>
