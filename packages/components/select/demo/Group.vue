<template>
  <IxSpace>
    <IxSelect v-model:value="value" multiple :dataSource="dataSource"> </IxSelect>
    <IxSelect v-model:value="value">
      <IxSelectOptionGroup key="manager" label="Manager">
        <IxSelectOption key="tom" label="Tom"></IxSelectOption>
        <IxSelectOption key="jerry" label="Jerry"></IxSelectOption>
      </IxSelectOptionGroup>
      <IxSelectOptionGroup key="engineer" label="Engineer">
        <IxSelectOption key="speike" label="Speike"></IxSelectOption>
      </IxSelectOptionGroup>
    </IxSelect>
  </IxSpace>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { SelectData } from '@idux/components/select'

const dataSource: SelectData[] = [
  {
    key: 'manager',
    label: 'Manager',
    children: [
      { key: 'tom', label: 'Tom' },
      { key: 'jerry', label: 'Jerry' },
    ],
  },
  {
    key: 'engineer',
    label: 'Engineer',
    children: [{ key: 'speike', label: 'Speike' }],
  },
]

const value = ref('tom')
</script>
