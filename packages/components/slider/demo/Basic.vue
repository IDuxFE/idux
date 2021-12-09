<template>
  <IxSlider v-model:value="value0" :disabled="isDisabled"></IxSlider>
  <IxSlider v-model:value="value1" :disabled="isDisabled" range></IxSlider>
  Disabled: <IxSwitch v-model:checked="isDisabled"></IxSwitch>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value0 = ref(30)
const value1 = ref([20, 50])
const isDisabled = ref(false)
</script>
