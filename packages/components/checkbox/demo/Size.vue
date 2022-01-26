<template>
  <IxSpace vertical>
    <IxCheckboxGroup v-model:value="value" :options="options" buttoned size="sm" />
    <IxCheckboxGroup v-model:value="value" :options="options" buttoned />
    <IxCheckboxGroup v-model:value="value" :options="options" buttoned size="lg" />
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(['beijing'])

const options = [
  { label: 'Beijing', value: 'beijing' },
  { label: 'Shanghai', value: 'shanghai' },
  { label: 'Guangzhou', value: 'guangzhou' },
  { label: 'Shenzhen', value: 'shenzhen' },
]
</script>
