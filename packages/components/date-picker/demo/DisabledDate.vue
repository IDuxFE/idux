<template>
  <IxSpace vertical>
    <IxDatePicker :disabledDate="disabledDate" allowInput :cellTooltip="cellTooltip"></IxDatePicker>
  </IxSpace>
</template>

<script setup lang="ts">
import { endOfMonth, isAfter, isBefore, startOfDay } from 'date-fns'

const disabledDate = (date: Date) => isBefore(date, startOfDay(Date.now())) || isAfter(date, endOfMonth(Date.now()))
const cellTooltip = ({ disabled }: { disabled: boolean }): string | void => {
  if (disabled) {
    return 'cell disabled'
  }
}
</script>
