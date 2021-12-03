<template>
  <IxSpace direction="vertical">
    <IxDatePicker v-model:value="dateValue" clearable></IxDatePicker>
    <IxDatePicker v-model:value="weekValue" type="week" clearable></IxDatePicker>
    <IxDatePicker v-model:value="monthValue" type="month" clearable></IxDatePicker>
    <IxDatePicker v-model:value="quarterValue" type="quarter" clearable></IxDatePicker>
    <IxDatePicker v-model:value="yearValue" type="year" clearable></IxDatePicker>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const dateValue = ref(new Date())
const weekValue = ref(Date.now())
const monthValue = ref('2022-01')
const quarterValue = ref('2022-Q1')
const yearValue = ref('2022')
</script>
