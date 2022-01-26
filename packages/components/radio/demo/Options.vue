<template>
  <IxSpace vertical>
    <IxRadioGroup v-model:value="value" :options="options"></IxRadioGroup>
    <IxRadioGroup v-model:value="value" :options="options" buttoned></IxRadioGroup>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { RadioOption } from '@idux/components/radio'

const value = ref('beijing')

const options: RadioOption[] = [
  { label: 'Beijing', value: 'beijing' },
  { label: 'Shanghai', value: 'shanghai' },
  { label: 'Guangzhou', value: 'guangzhou' },
  { label: 'Shenzhen', value: 'shenzhen' },
]
</script>
