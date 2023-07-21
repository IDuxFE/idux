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
  <IxTour v-model:activeIndex="currentStepIndex" v-model:visible="tourVisible" :steps="steps">
    <template #title="{ activeIndex, title }"> {{ title }}({{ activeIndex + 1 }}) </template>
    <template #description="{ activeIndex, description }">
      <p>
        <IxIcon v-if="activeIndex === 0" name="info-circle" />
        {{ description }}
      </p>
    </template>
    <template #indicators="{ activeIndex, total }">
      <div class="demo-tour-custom-slots__dots">
        <span
          v-for="index in total"
          :key="index"
          :class="[
            'demo-tour-custom-slots__dots__dot',
            index - 1 === activeIndex && 'demo-tour-custom-slots__dots__dot--active',
          ]"
        ></span>
      </div>
    </template>
  </IxTour>
</template>

<script setup lang="ts">
import type { TourStep } from '@idux/components/tour'

import { ref } from 'vue'

const tourVisible = ref(false)
const currentStepIndex = ref(0)

const beginTour = () => (tourVisible.value = true)

const firstBtnRef = ref<HTMLElement>()
const secondBtnRef = ref<HTMLElement>()
const thirdBtnRef = ref<HTMLElement>()

const steps: TourStep[] = [
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
</script>

<style lang="less">
.demo-tour-custom-slots__dots {
  display: flex;
  gap: 4px;

  &__dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: rgb(122, 122, 122);

    &--active {
      background-color: var(--ix-color-primary);
    }
  }
}
</style>
