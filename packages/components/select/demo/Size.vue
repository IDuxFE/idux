<template>
  <IxRadioGroup v-model:value="size" buttoned>
    <IxRadio value="sm">Small</IxRadio>
    <IxRadio value="md">Medium</IxRadio>
    <IxRadio value="lg">Large</IxRadio>
  </IxRadioGroup>
  <br />
  <br />
  <IxSpace>
    <IxSelect v-model:value="singleValue" :dataSource="dataSource" :size="size"> </IxSelect>
    <IxSelect v-model:value="multipleValue" :dataSource="dataSource" :size="size" multiple> </IxSelect>
  </IxSpace>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { FormSize } from '@idux/components/form'
import { SelectData } from '@idux/components/select'

const dataSource: SelectData[] = [
  { key: 'tom', label: 'Tom' },
  { key: 'jerry', label: 'Jerry' },
  { key: 'speike', label: 'Speike', disabled: true },
]

const size = ref<FormSize>('md')
const singleValue = ref('tom')
const multipleValue = ref(['tom'])
</script>
