<template>
  <IxSpace>
    <IxSelect v-model:value="value" :dataSource="dataSource"> </IxSelect>
    <IxSelect v-model:value="value">
      <IxSelectOptionGroup key="1" label="Manager">
        <IxSelectOption key="11" label="Tom" value="tom"></IxSelectOption>
        <IxSelectOption key="12" label="Jerry" value="jerry"></IxSelectOption>
      </IxSelectOptionGroup>
      <IxSelectOptionGroup key="2" label="Engineer">
        <IxSelectOption key="21" label="Speike" value="speike"></IxSelectOption>
      </IxSelectOptionGroup>
    </IxSelect>
  </IxSpace>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { SelectData } from '@idux/components/select'

const dataSource: SelectData[] = [
  {
    key: 1,
    label: 'Manager',
    children: [
      { key: 11, label: 'Tom', value: 'tom' },
      { key: 12, label: 'Jerry', value: 'jerry' },
    ],
  },
  {
    key: 2,
    label: 'Engineer',
    children: [{ key: 21, label: 'Speike', value: 'speike' }],
  },
]

const value = ref('tom')
</script>
