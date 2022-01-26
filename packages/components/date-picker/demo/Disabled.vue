<template>
  <IxSpace vertical>
    <IxDatePicker v-model:value="value" disabled></IxDatePicker>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(new Date())
</script>
