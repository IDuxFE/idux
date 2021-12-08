<template>
  <IxSpace>
    <IxInputNumber v-model:value="value" :keyboard="keyboard" :max="10" :min="1"></IxInputNumber>
    <IxSwitch v-model:checked="keyboard"></IxSwitch>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)
const keyboard = ref(true)
</script>
