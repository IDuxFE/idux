<template>
  <IxSlider v-model:value="value0" @change="onChange" @input="onInput"></IxSlider>
  <IxSlider v-model:value="value1" range @change="onChange" @input="onInput"></IxSlider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value0 = ref(30)
const value1 = ref([20, 50])

function onInput(val: number | number[]) {
  console.log('input', val)
}

function onChange(val: number | number[]) {
  console.log('change', val)
}
</script>
