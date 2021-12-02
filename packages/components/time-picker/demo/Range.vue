<template>
  <IxSpace>
    <IxTimeRangePicker v-model:value="time" v-model:open="open" allow-input="overlay"></IxTimeRangePicker>
    <IxTimeRangePicker
      v-model:value="crossDayTime"
      v-model:open="crossDayRangeOpen"
      :auto-swap="false"
    ></IxTimeRangePicker>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref()
const crossDayTime = ref()
const open = ref(false)
const crossDayRangeOpen = ref(false)
</script>
<style scoped lang="less">
:deep(.ix-time-range-picker) {
  width: 300px;
}
</style>
