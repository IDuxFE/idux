<template>
  <IxRadio :disabled="disabled">A</IxRadio>
  <IxRadio checked :disabled="disabled">B</IxRadio>
  <IxButton @click="toggle">Toggle</IxButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const disabled = ref(true)
const toggle = () => (disabled.value = !disabled.value)
</script>
