<template>
  <h4>marks & step</h4>
  <IxSlider v-model:value="value0" :disabled="isDisabled" :marks="marks"></IxSlider>

  <h4>step=null</h4>
  <IxSlider v-model:value="value1" :disabled="isDisabled" :marks="marks" :step="null"></IxSlider>

  Disabled: <IxSwitch v-model:checked="isDisabled"></IxSwitch>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'

const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: {
      color: 'red',
    },
    label: h('strong', '100°C'),
  },
}

const value0 = ref(30)
const value1 = ref(50)
const isDisabled = ref(false)
</script>
