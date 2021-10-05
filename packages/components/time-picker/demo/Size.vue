<template>
  <IxSpace>
    <IxTimePicker v-model:value="time" size="large" />
    <IxTimePicker v-model:value="time" size="medium" />
    <IxTimePicker v-model:value="time" size="small" />
  </IxSpace>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const time = ref(new Date())
</script>
