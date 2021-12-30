<template>
  <IxInputNumber v-model:value="value" :max="10" :min="1" :precision="2" :step="0.01" @change="handleChange">
  </IxInputNumber>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)

function handleChange(value: number | null, oldValue: number | null | undefined) {
  console.log('changed', value, oldValue)
}
</script>
