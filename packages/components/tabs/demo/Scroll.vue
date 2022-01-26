<template>
  <IxSpace vertical :size="40" block>
    <IxTabs v-model:selectedKey="selectedKey">
      <IxTab v-for="panel in panels" :key="'tab' + panel" :title="'Tab ' + panel"> Content of Tab {{ panel }} </IxTab>
    </IxTabs>
    <IxTabs v-model:selectedKey="selectedKey" type="line">
      <IxTab v-for="panel in panels" :key="'tab' + panel" :title="'Tab ' + panel"> Content of Tab {{ panel }} </IxTab>
    </IxTabs>
    <IxTabs v-model:selectedKey="selectedKey" type="line" placement="start" style="height: 200px">
      <IxTab v-for="panel in panels" :key="'tab' + panel" :title="'Tab ' + panel"> Content of Tab {{ panel }} </IxTab>
    </IxTabs>
    <IxTabs v-model:selectedKey="selectedKey" type="segment">
      <IxTab v-for="panel in panels" :key="'tab' + panel" :title="'Tab ' + panel"> Content of Tab {{ panel }} </IxTab>
    </IxTabs>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedKey = ref('tab6')

const panels = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
</script>
