<template>
  <IxTabs
    v-model:selectedKey="selectedKey"
    :dataSource="dataSource"
    addable
    :dndSortable="{
      dragHandle: true,
    }"
    closable
    :onDndSortChange="handleDndSortChange"
    @add="onAdd"
  >
    <template #content="{ key }"> Content of Tab {{ key }} </template>
  </IxTabs>
</template>

<script setup lang="ts">
import type { TabsData } from '@idux/components/tabs'

import { ref } from 'vue'

const selectedKey = ref(0)

const dataSource = ref<TabsData[]>(
  Array.from({ length: 20 }).map((_, index) => {
    return { key: index, title: `Tab ${index}` }
  }),
)

const onAdd = () => {
  const newKey = dataSource.value.length
  dataSource.value = [...dataSource.value, { key: newKey, title: `Tab ${newKey}` }]
  selectedKey.value = newKey
}

const handleDndSortChange = (newData: TabsData[], oldData: TabsData[]) => {
  console.log('handleDndSortChange', newData, oldData)
  dataSource.value = newData
}
</script>
