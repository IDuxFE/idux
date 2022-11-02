<template>
  <IxSpace vertical>
    <IxDateRangePicker
      v-model:value="value"
      :disabled-date="disabledDate"
      :on-select="handleSelect"
      clearable
    ></IxDateRangePicker>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { differenceInDays } from 'date-fns'

const selectedDates = ref<(Date | undefined)[] | undefined>()
const value = ref([])

const disabledDate = (date: Date) => {
  const dates = selectedDates.value
  if (!dates?.[0] || !!dates[1]) {
    return false
  }

  return Math.abs(differenceInDays(date, dates[0])) > 7
}

const handleSelect = (dates: (Date | undefined)[] | undefined) => {
  selectedDates.value = dates
}
</script>
