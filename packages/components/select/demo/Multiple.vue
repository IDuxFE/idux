<template>
  <IxSpace>
    <IxSelect v-model:value="value" :dataSource="dataSource" multiple @change="onChange"></IxSelect>
    <IxSelect v-model:value="value" :dataSource="dataSource" multiple disabled></IxSelect>
  </IxSpace>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { SelectData } from '@idux/components/select'

const dataSource: SelectData[] = []

for (let index = 0; index < 20; index++) {
  const prefix = index > 9 ? 'B' : 'A'
  dataSource.push({ key: index, label: prefix + index, value: index, disabled: index % 3 === 0 })
}

const value = ref([0, 1])

const onChange = (value: number[], oldValue: number[]) => {
  console.log('selected change: ', value, oldValue)
}
</script>
