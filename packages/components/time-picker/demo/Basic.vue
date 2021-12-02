<template>
  <IxSpace>
    <IxTimePicker v-model:value="time" v-model:open="open" allow-input="overlay"></IxTimePicker>
    <IxButton @click="changeToNow">now</IxButton>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

function changeToNow() {
  time.value = new Date()
}

const time = ref()
const open = ref(false)
</script>
<style scoped lang="less">
:deep(.ix-time-picker) {
  width: 200px;
}
</style>
