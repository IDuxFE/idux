<template>
  <IxSpace>
    <IxInputNumber v-model:value="value" :max="10" :min="1"></IxInputNumber>
    <IxButton mode="primary" @click="handleClick">Rest</IxButton>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(100)

function handleClick() {
  value.value = 100
}
</script>
