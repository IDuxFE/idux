<template>
  <IxFormItem label="min">
    <IxInputNumber v-model:value="min" :max="max" :min="0.2" size="sm"></IxInputNumber>
  </IxFormItem>
  <IxFormItem label="max">
    <IxInputNumber v-model:value="max" :max="10" :min="min" size="sm"></IxInputNumber>
  </IxFormItem>
  <a style="cursor: pointer" @click="onClick">click me</a>
  <IxImageViewer v-model:visible="visible" :images="['/images/example/html.png']" :zoom="zoom"></IxImageViewer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const min = ref(0.5)
const max = ref(2)
const visible = ref(false)
const zoom = computed(() => [min.value, max.value])
const onClick = () => (visible.value = true)
</script>
