<template>
  <IxSpace direction="vertical">
    <IxRadioGroup v-model:value="value" :options="options" buttoned size="sm"></IxRadioGroup>
    <IxRadioGroup v-model:value="value" :options="options" buttoned></IxRadioGroup>
    <IxRadioGroup v-model:value="value" :options="options" buttoned size="lg">></IxRadioGroup>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('beijing')

const options = [
  { label: 'Beijing', value: 'beijing' },
  { label: 'Shanghai', value: 'shanghai' },
  { label: 'Guangzhou', value: 'guangzhou' },
  { label: 'Shenzhen', value: 'shenzhen' },
]
</script>
