<template>
  <IxSpace>
    <IxTimePicker v-model:value="time" v-model:open="open"></IxTimePicker>
    <IxButton @click="changeToNow">now</IxButton>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

function changeToNow() {
  time.value = Date.now()
}

const time = ref()
const open = ref(false)
</script>
