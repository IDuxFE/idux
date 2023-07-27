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
  <IxTour v-model:visible="tourVisible" :steps="steps" placement="topStart"></IxTour>
</template>

<script setup lang="ts">
import type { TourStep } from '@idux/components/tour'

import { ref } from 'vue'

const tourVisible = ref(false)

const beginTour = () => (tourVisible.value = true)

const firstBtnRef = ref<HTMLElement>()
const secondBtnRef = ref<HTMLElement>()
const thirdBtnRef = ref<HTMLElement>()

const steps: TourStep[] = [
  {
    title: 'Step1',
    description: 'this is description...',
    target: () => firstBtnRef.value,
    mask: { color: 'rgba(40, 0, 255, 0.4)' },
  },
  {
    title: 'Step2',
    description: 'this is description...',
    target: () => secondBtnRef.value,
    mask: false,
    placement: 'rightStart',
    prevButtonText: '<- Prev',
    nextButtonText: 'Next ->',
  },
  {
    title: 'Step3',
    description: 'this is description...',
    target: () => thirdBtnRef.value,
    prevButton: false,
    nextButton: { size: 'md' },
    showArrow: false,
    nextButtonText: 'Enjoy!!!',
  },
]
</script>

<style lang="less"></style>
