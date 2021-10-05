<template>
  <div class="title">disable options</div>
  <IxSpace>
    <IxTimePicker
      v-model:value="time"
      format="hh:mm:ss a"
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
const disabled = ref(true)
const readonly = ref(true)
const hideDisabledOptions = ref(false)

function disabledHours(selectedAmPm: string) {
  return selectedAmPm === 'am' ? [1, 2, 3] : []
}

function disabledMinutes(selectedHour: number, selectedAmPm: string) {
  return selectedAmPm === 'pm' && selectedHour === 12 ? [1, 2, 3] : []
}

function disabledSeconds(selectedHour: number, selectedMinute: number, selectedAmPm: string) {
  return selectedAmPm === 'pm' && selectedHour === 12 && selectedMinute === 0 ? [1, 2, 3] : []
}
</script>

<style scoped lang="less">
.title {
  padding: 10px 0;
}
</style>
