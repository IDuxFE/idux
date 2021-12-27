<template>
  <IxSpace direction="vertical">
    <IxRadioGroup v-model:value="size">
      <IxRadio value="sm">小</IxRadio>
      <IxRadio value="md">正常</IxRadio>
      <IxRadio value="lg">大</IxRadio>
    </IxRadioGroup>
    <IxSpace :size="size">
      space:
      <IxButton mode="primary">Button</IxButton>
      <IxButton>Button</IxButton>
    </IxSpace>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const size = ref('md')
</script>
