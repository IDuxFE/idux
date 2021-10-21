<template>
  <IxSpace direction="vertical">
    <IxCheckboxGroup v-model:value="value" :options="options" :gap="16" />
    <IxCheckboxGroup v-model:value="value" :options="options" :gap="16" buttoned />
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
