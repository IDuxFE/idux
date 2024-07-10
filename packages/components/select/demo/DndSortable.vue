<template>
  <IxSelect
    :selectedKeys="value"
    :dataSource="dataSource"
    :onOptionClick="onOptionClick"
    :onDndSortChange="onDndSortChange"
    multiple
    :dndSortable="{
      dragHandle: true,
    }"
  >
  </IxSelect>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { SelectData } from '@idux/components/select'

const dataSource = ref<SelectData[]>([])

const tempData: SelectData[] = []
for (let index = 0; index < 20; index++) {
  const prefix = index > 9 ? 'B' : 'A'
  tempData.push({ key: index, label: prefix + index, disabled: index % 3 === 0 })
}
dataSource.value = tempData

const value = ref([1])

const onOptionClick = (option: SelectData) => {
  const index = value.value.findIndex(key => key === option.key)
  if (index > -1) {
    value.value.splice(index, 1)
  } else {
    value.value.push(option.key as number)
  }
}

const onDndSortChange = (newOptions: SelectData[]) => {
  console.log('onDndSortChange', newOptions)
  dataSource.value = newOptions
}
</script>
