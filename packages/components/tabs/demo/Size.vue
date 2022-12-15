<template>
  <IxSpace :size="20" vertical>
    <IxRadioGroup v-model:value="size">
      <IxRadio value="lg">大</IxRadio>
      <IxRadio value="md">中</IxRadio>
    </IxRadioGroup>
    <IxTabs v-model:selectedKey="selectedKey" :size="size">
      <IxTab key="tab1" title="标签1" />
      <IxTab key="tab2" title="标签2" />
      <IxTab key="tab3" title="标签3" />
    </IxTabs>
    <IxTabs v-model:selectedKey="selectedKey" type="line" :size="size">
      <IxTab key="tab1" title="标签1" />
      <IxTab key="tab2" title="标签2" />
      <IxTab key="tab3" title="标签3" />
    </IxTabs>
    <IxTabs v-model:selectedKey="selectedKey" type="segment" :size="size">
      <IxTab key="tab1" title="标签1" />
      <IxTab key="tab2" title="标签2" />
      <IxTab key="tab3" title="标签3" />
    </IxTabs>
    <IxTabs v-model:selectedKey="selectedKey" type="segment" mode="primary" :size="size">
      <IxTab key="tab1" title="标签1" />
      <IxTab key="tab2" title="标签2" />
      <IxTab key="tab3" title="标签3" />
    </IxTabs>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { type TabsSize } from '@idux/components/tabs'

const size = ref<TabsSize>('md')
const selectedKey = ref('tab1')
</script>
