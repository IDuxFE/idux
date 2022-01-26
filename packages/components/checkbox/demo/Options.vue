<template>
  <IxSpace vertical>
    <IxCheckboxGroup v-model:value="value" :options="options"></IxCheckboxGroup>
    <IxCheckboxGroup v-model:value="value" :options="options" buttoned></IxCheckboxGroup>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { CheckboxOption } from '@idux/components/checkbox'

const value = ref(['beijing'])

const options: CheckboxOption[] = [
  { label: 'Beijing', value: 'beijing' },
  { label: 'Shanghai', value: 'shanghai' },
  { label: 'Guangzhou', value: 'guangzhou' },
  { label: 'Shenzhen', value: 'shenzhen' },
]
</script>
