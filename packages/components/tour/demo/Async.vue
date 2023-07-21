<template>
  <div>
    <IxButton @click="beginTour">Begin</IxButton>
    <IxDivider />
    <IxSpace>
      <div ref="firstBtnRef">
        <IxButton>Step1</IxButton>
      </div>
      <div ref="secondBtnRef">
        <IxButton>Step3</IxButton>
      </div>
    </IxSpace>
  </div>
  <IxTour v-model:visible="tourVisible" :steps="steps"></IxTour>
</template>

<script setup lang="ts">
import type { TourStep } from '@idux/components/tour'

import { ref } from 'vue'

const tourVisible = ref(false)

const beginTour = () => (tourVisible.value = true)

const firstBtnRef = ref<HTMLElement>()
const secondBtnRef = ref<HTMLElement>()
let appendedElement: HTMLElement | undefined

const steps: TourStep[] = [
  {
    title: 'Step1',
    description: 'this is description...',
    target: () => firstBtnRef.value,
  },
  {
    title: 'Step2',
    description: 'this is description...',
    target: () => appendedElement,
    async beforeEnter() {
      await new Promise(resolve => setTimeout(resolve, 500))
      const div = document.createElement('div')
      div.className = 'demo-tour-async__appended-element'
      div.textContent = 'This Is Step 2'
      document.body.appendChild(div)

      appendedElement = div
    },
    afterLeave() {
      if (appendedElement) {
        document.body.removeChild(appendedElement)
      }
    },
  },
  {
    title: 'Step3',
    description: 'this is description...',
    target: () => secondBtnRef.value,
  },
]
</script>

<style lang="less">
.demo-tour-async__appended-element {
  position: fixed;
  z-index: 10000;
  top: 600px;
  left: 600px;
  width: 100px;
  height: 50px;
  background-color: var(--ix-color-primary);
  color: #fff;
}
</style>
