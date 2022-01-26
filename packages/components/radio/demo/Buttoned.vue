<template>
  <IxSpace vertical>
    <IxRadioGroup v-model:value="value" buttoned>
      <IxRadio value="beijing">Beijing</IxRadio>
      <IxRadio value="shanghai">Shanghai</IxRadio>
      <IxRadio value="guangzhou">Guangzhou</IxRadio>
      <IxRadio value="shenzhen">Shenzhen</IxRadio>
    </IxRadioGroup>
    <IxRadioGroup v-model:value="value" buttoned mode="primary">
      <IxRadio value="beijing">Beijing</IxRadio>
      <IxRadio value="shanghai">Shanghai</IxRadio>
      <IxRadio value="guangzhou">Guangzhou</IxRadio>
      <IxRadio value="shenzhen">Shenzhen</IxRadio>
    </IxRadioGroup>
    <IxRadioGroup v-model:value="value" buttoned disabled>
      <IxRadio value="beijing">Beijing</IxRadio>
      <IxRadio value="shanghai">Shanghai</IxRadio>
      <IxRadio value="guangzhou">Guangzhou</IxRadio>
      <IxRadio value="shenzhen">Shenzhen</IxRadio>
    </IxRadioGroup>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('beijing')
</script>
