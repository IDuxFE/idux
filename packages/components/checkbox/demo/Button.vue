<template>
  <IxSpace direction="vertical">
    <IxCheckboxGroup v-model:value="value" buttoned>
      <IxCheckbox value="beijing">Beijing</IxCheckbox>
      <IxCheckbox value="shanghai">Shanghai</IxCheckbox>
      <IxCheckbox value="guangzhou">Guangzhou</IxCheckbox>
      <IxCheckbox value="shenzhen">Shenzhen</IxCheckbox>
    </IxCheckboxGroup>
    <IxCheckboxGroup v-model:value="value" buttoned disabled>
      <IxCheckbox value="beijing">Beijing</IxCheckbox>
      <IxCheckbox value="shanghai">Shanghai</IxCheckbox>
      <IxCheckbox value="guangzhou">Guangzhou</IxCheckbox>
      <IxCheckbox value="shenzhen">Shenzhen</IxCheckbox>
    </IxCheckboxGroup>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(['beijing'])
</script>
