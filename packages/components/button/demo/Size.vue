<template>
  <IxRadioGroup v-model:value="size">
    <IxRadio value="sm">Small</IxRadio>
    <IxRadio value="md">Medium</IxRadio>
    <IxRadio value="lg">Large</IxRadio>
  </IxRadioGroup>

  <br />
  <IxButton mode="primary" :size="size">Primary</IxButton>
  <IxButton :size="size">Default</IxButton>
  <IxButton mode="dashed" :size="size">Dashed</IxButton>
  <IxButton mode="text" :size="size">Text</IxButton>
  <IxButton mode="link" :size="size" href="https://github.com/IDuxFE/idux" target="_blank">Link</IxButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { ButtonSize } from '@idux/components/button'

const size = ref<ButtonSize>('lg')
</script>
