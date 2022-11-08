<template>
  <IxSpace vertical>
    <IxRadioGroup v-model:value="size">
      <IxRadio value="sm">Small</IxRadio>
      <IxRadio value="md">Medium</IxRadio>
      <IxRadio value="lg">Large</IxRadio>
    </IxRadioGroup>
    <IxSpace :size="size" align="center">
      Text
      <IxButton mode="primary">Button</IxButton>
      <IxButton>Button</IxButton>
    </IxSpace>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const size = ref('md')
</script>
