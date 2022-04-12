<template>
  <IxSpace vertical>
    <IxDateRangePicker v-model:value="dateValue" clearable></IxDateRangePicker>
    <IxDateRangePicker v-model:value="weekValue" type="week" clearable></IxDateRangePicker>
    <IxDateRangePicker v-model:value="monthValue" type="month" clearable></IxDateRangePicker>
    <IxDateRangePicker v-model:value="quarterValue" type="quarter" clearable></IxDateRangePicker>
    <IxDateRangePicker v-model:value="yearValue" type="year" clearable></IxDateRangePicker>
    <IxDateRangePicker v-model:value="dateValue" type="datetime" clearable></IxDateRangePicker>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dateValue = ref([
  new Date(),
  ((date: Date) => {
    date.setDate(date.getDate() + 10)
    return date
  })(new Date()),
])
const weekValue = ref([Date.now(), Date.now() + 1000 * 60 * 60 * 24 * 21])
const monthValue = ref(['2022-01', '2022-06'])
const quarterValue = ref(['2022-Q1', '2022-Q3'])
const yearValue = ref(['2022', '2050'])
</script>
