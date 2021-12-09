<template>
  <IxRow>
    <IxCol span="16">
      <IxSlider v-model:value="value0" :min="0" :max="20" @change="onChange" @input="onInput"></IxSlider>
    </IxCol>
    <IxCol span="6" offset="1">
      <IxInputNumber v-model:value="value0" :min="0" :max="20"></IxInputNumber>
    </IxCol>
  </IxRow>
  <IxRow>
    <IxCol span="16">
      <IxSlider v-model:value="value1" :min="0" :max="1" :step="0.01" @change="onChange" @input="onInput"></IxSlider>
    </IxCol>
    <IxCol span="6" offset="1">
      <IxInputNumber v-model:value="value1" :min="0" :max="1" :step="0.01"></IxInputNumber>
    </IxCol>
  </IxRow>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value0 = ref(3)
const value1 = ref(0.5)

function onInput(val: number | number[]) {
  console.log('input', val)
}

function onChange(val: number | number[]) {
  console.log('changed', val)
}
</script>
