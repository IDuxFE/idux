<template>
  <IxSlider v-model:value="value0" :keyboard="keyboard"></IxSlider>
  <IxSlider v-model:value="value1" :keyboard="keyboard" range></IxSlider>
  Use Keyboard Behavior: <IxSwitch v-model:checked="keyboard"></IxSwitch>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value0 = ref(30)
const value1 = ref([20, 50])
const keyboard = ref(true)
</script>
