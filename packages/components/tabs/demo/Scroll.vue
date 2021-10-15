<template>
  <IxSpace direction="vertical" :size="40">
    <IxTabs selectedKey="tab6">
      <IxTab v-for="panel in panels" :key="'tab' + panel" :title="'Tab ' + panel"> Content of Tab {{ panel }} </IxTab>
    </IxTabs>
    <IxTabs selectedKey="tab6" type="line">
      <IxTab v-for="panel in panels" :key="'tab' + panel" :title="'Tab ' + panel"> Content of Tab {{ panel }} </IxTab>
    </IxTabs>
    <IxTabs selectedKey="tab6" type="line" placement="start" style="height: 200px">
      <IxTab v-for="panel in panels" :key="'tab' + panel" :title="'Tab ' + panel"> Content of Tab {{ panel }} </IxTab>
    </IxTabs>
    <IxTabs selectedKey="tab1" type="segment">
      <IxTab v-for="panel in panels" :key="'tab' + panel" :title="'Tab ' + panel"> Content of Tab {{ panel }} </IxTab>
    </IxTabs>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const panels = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
</script>
