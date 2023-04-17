<template>
  <IxSpace size="lg" vertical>
    <IxRadioGroup v-model:value="size" :dataSource="sizes"> </IxRadioGroup>
    <IxTabs v-model:selectedKey="selectedKey" :dataSource="dataSource" :size="size">
      <template #content="{ key }"> Content of Tab {{ key }} </template>
    </IxTabs>
    <IxTabs v-model:selectedKey="selectedKey" :dataSource="dataSource" :size="size" type="line">
      <template #content="{ key }"> Content of Tab {{ key }} </template>
    </IxTabs>
    <IxTabs v-model:selectedKey="selectedKey" :dataSource="dataSource" :size="size" type="segment">
      <template #content="{ key }"> Content of Tab {{ key }} </template>
    </IxTabs>
  </IxSpace>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { type TabsSize } from '@idux/components/tabs'

const size = ref<TabsSize>('md')
const sizes = ['lg', 'md'].map(item => ({ key: item, label: item }))

const selectedKey = ref(0)
const dataSource = Array.from({ length: 3 }).map((_, index) => {
  return { key: index, title: `Tab ${index}` }
})
</script>
