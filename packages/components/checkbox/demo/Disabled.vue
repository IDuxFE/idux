<template>
  <IxCheckbox :disabled="disabled">A</IxCheckbox>
  <IxCheckbox :checked="true" :disabled="disabled">B</IxCheckbox>
  <IxButton @click="toggle">Toggle</IxButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const disabled = ref(true)
const toggle = () => (disabled.value = !disabled.value)
</script>
