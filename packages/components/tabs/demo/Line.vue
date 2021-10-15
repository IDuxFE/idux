<template>
  <IxTabs v-model:selectedKey="selectedKey" type="line">
    <IxTab key="tab1" title="Tab 1"> Content of Tab 1 </IxTab>
    <IxTab key="tab2" title="Tab 2"> Content of Tab 2 </IxTab>
    <IxTab key="tab3" title="Tab 3"> Content of Tab 3 </IxTab>
  </IxTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedKey = ref('tab1')
</script>
