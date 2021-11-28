<template>
  <IxSpace direction="vertical">
    <IxInputNumber v-model:value="value" :max="10" :min="1" size="sm" @change="handleChange"></IxInputNumber>
    <IxInputNumber v-model:value="value" :max="10" :min="1" @change="handleChange"></IxInputNumber>
    <IxInputNumber v-model:value="value" :max="10" :min="1" size="lg" @change="handleChange"></IxInputNumber>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)

function handleChange(value: number | null, oldValue: number | null | undefined) {
  console.log('changed', value, oldValue)
}
</script>
