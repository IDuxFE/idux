<template>
  <section>
    <IxTimePicker v-model:value="time" :hour-step="2" :minute-step="5" :second-step="10" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref(new Date())
</script>
<style scoped lang="less">
:deep(.ix-time-picker) {
  width: 200px;
}
</style>
