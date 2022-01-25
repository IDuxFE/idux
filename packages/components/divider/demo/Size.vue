<template>
  <IxRadioGroup v-model:value="size" buttoned>
    <IxRadio value="sm">Small</IxRadio>
    <IxRadio value="md">Medium</IxRadio>
    <IxRadio value="lg">Large</IxRadio>
  </IxRadioGroup>

  <IxDivider :size="size" label="iDux" />
  <p>见山是山，见水是水；见山不是山，见水不是水；见山还是山，见水还是水。</p>
  <IxDivider :size="size" label="iDux" />
  <div>
    <span>Text</span>
    <IxDivider :size="size" vertical />
    <a href="#">Link</a>
    <IxDivider :size="size" vertical dashed />
    <a href="#">Link</a></div
  >
</template>

<script setup lang="ts">
import { ref } from 'vue'

const size = ref('md')
</script>
