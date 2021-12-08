<template>
  <IxSpace>
    <IxInputNumber v-model:value="value" :readonly="readonly" :max="10" :min="1"></IxInputNumber>
    <IxSwitch v-model:checked="readonly"></IxSwitch>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)
const readonly = ref(true)
</script>
