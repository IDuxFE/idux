<template>
  <IxSpace vertical>
    <IxDatePicker v-model:value="value" format="dd/MM/yyyy"></IxDatePicker>
    <IxDatePicker v-model:value="value" type="week" format="II/RRRR"></IxDatePicker>
    <IxDatePicker v-model:value="value" type="month" format="MM/yyyy"></IxDatePicker>
    <IxDatePicker v-model:value="value" type="quarter" format="'Q'Q/yyyy"></IxDatePicker>
    <IxDatePicker v-model:value="value" type="year" format="yy"></IxDatePicker>
    <IxDatePicker v-model:value="value" type="datetime" format="dd/MM/yyyy hh:mm"></IxDatePicker>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(new Date())
</script>
