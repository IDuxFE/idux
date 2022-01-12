<template>
  <div>
    <IxRadioGroup v-model:value="size" :options="sizeOptions" />
    <IxProgress :percent="30" :size="size" />
    <IxProgress :percent="50" :size="size" status="active" />
    <IxProgress :percent="70" :size="size" status="exception" />
    <IxProgress :percent="100" :size="size" />
  </div>
</template>
<script setup lang="ts">
import type { ProgressSize } from '@idux/components/progress'
import type { RadioOption } from '@idux/components/radio'

import { ref } from 'vue'
const sizeOptions: RadioOption[] = [
  {
    label: 'large',
    value: 'lg',
  },
  {
    label: 'medium',
    value: 'md',
  },
  {
    label: 'small',
    value: 'sm',
  },
]
const size = ref<ProgressSize>('md')
</script>
