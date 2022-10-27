<template>
  <IxSpace vertical :size="40" block>
    <IxTabs v-model:selectedKey="selectedKey" style="width: 410px">
      <IxTab v-for="panel in panels" :key="panel" :title="'Tab ' + panel"> Content of Tab {{ panel }} </IxTab>
    </IxTabs>
    <IxTabs v-model:selectedKey="selectedKey" style="width: 410px" type="line">
      <IxTab v-for="panel in panels" :key="panel" :title="'Tab ' + panel"> Content of Tab {{ panel }} </IxTab>
    </IxTabs>
    <IxTabs v-model:selectedKey="selectedKey" style="height: 200px" type="line" placement="start">
      <IxTab v-for="panel in panels" :key="panel" :title="'Tab ' + panel"> Content of Tab {{ panel }} </IxTab>
    </IxTabs>
    <IxTabs v-model:selectedKey="selectedKey" style="width: 410px" type="segment">
      <IxTab v-for="panel in panels" :key="panel" :title="'Tab ' + panel"> Content of Tab {{ panel }} </IxTab>
    </IxTabs>
    <IxSpace align="center">
      <IxButton @click="addTab">addTab</IxButton>
      <IxButton @click="closeTab">closeTab</IxButton>
      移动到第几个：<IxInputNumber v-model:value="selectedKey" :max="20" :min="1"></IxInputNumber>
    </IxSpace>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedKey = ref(7)

const panels = ref([1, 2, 3, 4, 5, 6, 7])
const addTab = () => {
  const key = (panels.value[panels.value.length - 1] || 0) + 1
  panels.value.push(key)
  selectedKey.value = key
}
const closeTab = () => {
  panels.value.pop()
  const key = panels.value[panels.value.length - 1]
  selectedKey.value = key
}
</script>
