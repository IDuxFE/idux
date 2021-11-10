<template>
  <IxRadioGroup v-model:value="placement">
    <IxRadio value="top">top</IxRadio>
    <IxRadio value="start">start</IxRadio>
    <IxRadio value="end">end</IxRadio>
    <IxRadio value="bottom">bottom</IxRadio>
  </IxRadioGroup>
  <IxTabs v-model:selectedKey="selectedKey" type="line" :placement="placement">
    <IxTab key="tab1" title="Tab 1"> Content of Tab 1 </IxTab>
    <IxTab key="tab2" title="Tab 2"> Content of Tab 2 </IxTab>
    <IxTab key="tab3" title="Tab 3"> Content of Tab 3 </IxTab>
  </IxTabs>
</template>
<script setup lang="ts">
import type { TabsPlacement } from '@idux/components/tabs'

import { ref } from 'vue'

const placement = ref<TabsPlacement>('top')
const selectedKey = ref('tab1')
</script>
