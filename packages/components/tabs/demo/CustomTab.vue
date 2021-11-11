<template>
  <IxTabs v-model:selectedKey="selectedKey" type="segment" mode="primary">
    <IxTab key="tab1">
      <template #title>
        <IxIcon name="file"></IxIcon>
        Tab 1
      </template>
      Content of Tab 1
    </IxTab>
    <IxTab key="tab2">
      <template #title>
        <IxIcon name="file"></IxIcon>
        Tab 2
      </template>
      Content of Tab 2
    </IxTab>
    <IxTab key="tab3">
      <template #title>
        <IxIcon name="file"></IxIcon>
        Tab 3
      </template>
      Content of Tab 3
    </IxTab>
  </IxTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedKey = ref('tab1')
</script>
