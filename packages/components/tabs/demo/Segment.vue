<template>
  <IxSpace direction="vertical" :size="40">
    <IxTabs v-model:selectedKey="selectedKey" type="segment" mode="primary">
      <IxTab key="tab1" title="Tab 1"> Content of Tab 1 </IxTab>
      <IxTab key="tab2" title="Tab 2"> Content of Tab 2 </IxTab>
      <IxTab key="tab3" title="Tab 3"> Content of Tab 3 </IxTab>
    </IxTabs>
    <IxTabs v-model:selectedKey="selectedKey" type="segment">
      <IxTab key="tab1" title="Tab 1"> Content of Tab 1 </IxTab>
      <IxTab key="tab2" title="Tab 2"> Content of Tab 2 </IxTab>
      <IxTab key="tab3" title="Tab 3"> Content of Tab 3 </IxTab>
    </IxTabs>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedKey = ref('tab1')
</script>
