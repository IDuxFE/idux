<template>
  <IxSpace vertical block>
    <IxSlider v-model:value="size" tooltipVisible :min="0" :max="50"></IxSlider>
    <IxSpace :size="size" align="center">
      Text
      <IxButton mode="primary">Button</IxButton>
      <IxButton>Button</IxButton>
    </IxSpace>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const size = ref(8)
</script>
