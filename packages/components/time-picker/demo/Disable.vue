<template>
  <div class="title">disable options</div>
  <IxSpace>
    <IxTimePicker
      v-model:value="time"
      format="hh:mm:ss a"
      allow-input
      :hide-disabled-options="hideDisabledOptions"
      :disabled-hours="disabledHours"
      :disabled-minutes="disabledMinutes"
      :disabled-seconds="disabledSeconds"
    />
    <IxButton @click="hideDisabledOptions = true">hide disabled options</IxButton>
  </IxSpace>

  <div class="title">disabled</div>
  <IxSpace>
    <IxTimePicker v-model:value="time" :disabled="disabled" />
    <IxTimeRangePicker v-model:value="timeRange" :disabled="disabled" />
    <IxButton @click="disabled = !disabled">change disable</IxButton>
  </IxSpace>

  <div class="title">readonly</div>
  <IxSpace>
    <IxTimePicker v-model:value="time" :readonly="readonly" />
    <IxButton @click="readonly = !readonly">change readonly</IxButton>
  </IxSpace>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const time = ref()
const timeRange = ref()
const disabled = ref(true)
const readonly = ref(true)
const hideDisabledOptions = ref(false)

function disabledHours(selectedAmPm: string | undefined) {
  return selectedAmPm === 'am' ? [1, 2, 3] : []
}

function disabledMinutes(selectedHour: number | undefined, selectedAmPm: string | undefined) {
  return selectedAmPm === 'pm' && selectedHour === 12 ? [1, 2, 3] : []
}

function disabledSeconds(
  selectedHour: number | undefined,
  selectedMinute: number | undefined,
  selectedAmPm: string | undefined,
) {
  return selectedAmPm === 'pm' && selectedHour === 12 && selectedMinute === 0 ? [1, 2, 3] : []
}
</script>

<style scoped lang="less">
.title {
  padding: 10px 0;
}
:deep(.ix-time-picker) {
  width: 200px;
}
</style>
