<template>
  <IxTabs v-model:selectedKey="selectedKey" :dataSource="dataSource">
    <template #title="{ title }"> Default {{ title }}</template>
    <template #content="{ key }"> Default content of Tab {{ key }} </template>
    <template #customTitle="{ title }"> Custom {{ title }}</template>
    <template #customContent="{ key }"> Custom content of Tab {{ key }} </template>
  </IxTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { type TabsData } from '@idux/components/tabs'

const selectedKey = ref(0)
const dataSource: TabsData[] = [
  {
    key: 0,
    title: 'Tab 0',
  },
  {
    key: 1,
    title: 'Tab 1',
  },
  {
    key: 2,
    title: 'Tab 2',
    customTitle: 'customTitle',
    customContent: 'customContent',
  },
]
</script>
