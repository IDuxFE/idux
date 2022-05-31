<template>
  <div>
    <IxPopover trigger="click" placement="bottomStart">
      <template #content>
        <IxSelectPanel
          :selectedKeys="value"
          :dataSource="dataSource"
          :onOptionClick="onOptionClick"
          multiple
        ></IxSelectPanel>
      </template>
      <IxButton>{{ selectedText }}</IxButton>
    </IxPopover>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'

import { SelectData } from '@idux/components/select'

const dataSource: SelectData[] = []

for (let index = 0; index < 20; index++) {
  const prefix = index > 9 ? 'B' : 'A'
  dataSource.push({ key: index, label: prefix + index, disabled: index % 3 === 0 })
}

const value = ref([1])
const selectedText = computed(() => value.value.join('|'))

const onOptionClick = (option: SelectData) => {
  const index = value.value.findIndex(key => key === option.key)
  if (index > -1) {
    value.value.splice(index, 1)
  } else {
    value.value.push(option.key as number)
  }
}
</script>
