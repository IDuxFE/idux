<template>
  <div class="title">allowInput: true</div>
  <IxSpace>
    <IxTimePicker v-model:value="time" v-model:open="open" :allow-input="true"></IxTimePicker>
    <IxButton @click="changeToNow">now</IxButton>
  </IxSpace>
  <div class="title">allowInput: 'overlay'</div>
  <IxSpace>
    <IxTimePicker
      v-model:value="overlayedPickerTime"
      v-model:open="overlayedPickerOpen"
      allow-input="overlay"
    ></IxTimePicker>
    <IxButton @click="changeOverlayedPickerToNow">now</IxButton>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref()
const open = ref(false)
const overlayedPickerTime = ref()
const overlayedPickerOpen = ref(false)

function changeToNow() {
  time.value = new Date()
}

function changeOverlayedPickerToNow() {
  overlayedPickerTime.value = new Date()
}
</script>
<style scoped lang="less">
:deep(.ix-time-picker) {
  width: 200px;
}

.title {
  padding: 10px 0;
}
</style>
