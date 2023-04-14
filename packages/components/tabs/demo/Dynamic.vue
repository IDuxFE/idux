<template>
  <IxTabs v-model:selectedKey="selectedKey" :dataSource="dataSource" addable closable @add="onAdd">
    <template #content="{ key }"> Content of Tab {{ key }} </template>
  </IxTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedKey = ref(0)

const dataSource = ref(
  Array.from({ length: 3 }).map((_, index) => {
    return { key: index, title: `Tab ${index}` }
  }),
)

const onAdd = () => {
  const newKey = dataSource.value.length
  dataSource.value = [...dataSource.value, { key: newKey, title: `Tab ${newKey}` }]
  selectedKey.value = newKey
}
</script>
