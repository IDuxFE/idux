<template>
  <IxSpace size="lg" vertical>
    <IxRadioGroup v-model:value="placement" :dataSource="placements"> </IxRadioGroup>
    <IxTabs v-model:selectedKey="selectedKey" :dataSource="dataSource" :placement="placement" type="line">
      <template #content="{ key }"> Content of Tab {{ key }} </template>
    </IxTabs>
  </IxSpace>
</template>
<script setup lang="ts">
import type { TabsPlacement } from '@idux/components/tabs'

import { ref } from 'vue'

const placement = ref<TabsPlacement>('top')
const placements = ['top', 'start', 'end', 'bottom'].map(item => ({ key: item, label: item }))

const selectedKey = ref(0)
const dataSource = Array.from({ length: 3 }).map((_, index) => {
  return { key: index, title: `Tab ${index}` }
})
</script>
