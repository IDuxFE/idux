<template>
  <IxSpace direction="vertical">
    <IxTimePicker v-model:value="time" size="sm" />
    <IxTimePicker v-model:value="time" />
    <IxTimePicker v-model:value="time" size="lg" />
  </IxSpace>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const time = ref(new Date())
</script>
