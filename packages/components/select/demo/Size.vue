<template>
  <IxRadioGroup v-model:value="size" buttoned>
    <IxRadio value="sm">Small</IxRadio>
    <IxRadio value="md">Medium</IxRadio>
    <IxRadio value="lg">Large</IxRadio>
  </IxRadioGroup>
  <br />
  <br />
  <IxSelect v-model:value="singleValue" :options="options" :size="size" style="width: 120px"> </IxSelect>
  <IxSelect v-model:value="multipleValue" :options="options" :size="size" multiple> </IxSelect>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { SelectOption } from '@idux/components/select'

const options: SelectOption[] = [
  { label: 'Tom', value: 'tom' },
  { label: 'Jerry', value: 'jerry' },
  { label: 'Speike', value: 'speike', disabled: true },
]

const size = ref('md')
const singleValue = ref('tom')
const multipleValue = ref(['tom'])
</script>
