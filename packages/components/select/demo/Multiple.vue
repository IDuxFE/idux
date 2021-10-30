<template>
  <IxSelect v-model:value="value" :options="options" multiple @change="onChange"></IxSelect>
  <IxSelect v-model:value="value" :options="options" multiple disabled></IxSelect>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { SelectOption } from '@idux/components/select'

const options: SelectOption[] = []

for (let index = 0; index < 20; index++) {
  const prefix = index > 9 ? 'B' : 'A'
  options.push({ key: index, label: prefix + index, value: index, disabled: index % 3 === 0 })
}

const value = ref([0, 1])

const onChange = (value: number[], oldValue: number[]) => {
  console.log('selected change: ', value, oldValue)
}
</script>
