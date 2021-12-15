<template>
  <IxSlider v-model:value="value0" :reverse="isReversed"></IxSlider>
  <IxSlider v-model:value="value1" :reverse="isReversed" range></IxSlider>
  Reversed: <IxSwitch v-model:checked="isReversed"></IxSwitch>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value0 = ref(30)
const value1 = ref([20, 50])
const isReversed = ref(true)
</script>
