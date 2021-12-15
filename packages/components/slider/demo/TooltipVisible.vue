<template>
  <IxSlider v-model:value="value0" :tooltip-visible="visible0"></IxSlider>
  <IxSlider v-model:value="value1" :tooltip-visible="visible1"></IxSlider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value0 = ref(30)
const visible0 = ref(true)

const value1 = ref(50)
const visible1 = ref(false)
</script>
