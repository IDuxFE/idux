<template>
  <IxSlider v-model:value="value0" :style="style" vertical></IxSlider>
  <IxSlider v-model:value="value1" :style="style" range vertical></IxSlider>
  <IxSlider v-model:value="value2" :style="style" :marks="marks" range vertical></IxSlider>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'

const style = {
  display: 'inline-block',
  height: '300px',
  marginLeft: '70px',
}

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
const value1 = ref([30, 50])
const value2 = ref([26, 37])
</script>
