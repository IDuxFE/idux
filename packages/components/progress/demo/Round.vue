<template>
  <IxSpace vertical block>
    <IxRadioGroup v-model:value="valueRef">
      <IxRadio value="square">square</IxRadio>
      <IxRadio value="round">round</IxRadio>
    </IxRadioGroup>
    <IxProgress :strokeLinecap="valueRef" :percent="75" />
    <IxProgress :strokeLinecap="valueRef" :percent="75" type="circle" />
    <IxProgress :strokeLinecap="valueRef" :percent="75" type="dashboard" />
  </IxSpace>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import { type ProgressStrokeLinecap } from '@idux/components/progress'

const valueRef = ref<ProgressStrokeLinecap>('square')
</script>
