<template>
  <IxSpace direction="vertical">
    <IxInput v-model:value="valueRef" placeholder="Basic usage" />
    <IxInput :value="valueRef" disabled placeholder="Disabled" />
    <IxInput :value="valueRef" readonly placeholder="Readonly" />
  </IxSpace>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

const valueRef = ref('')
watch(valueRef, value => console.log(value))
</script>
