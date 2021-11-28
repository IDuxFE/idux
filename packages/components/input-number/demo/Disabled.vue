<template>
  <IxSpace>
    <IxInputNumber v-model:value="value" :disabled="disabled" :max="10" :min="1"></IxInputNumber>
    <IxSwitch v-model:checked="disabled"></IxSwitch>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)
const disabled = ref(true)
</script>
