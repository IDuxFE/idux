<template>
  <IxHeader extra="setting" @extraClick="onExtraClick"> Title </IxHeader>
  <IxHeader :extra="extraNode" @extraClick="onExtraClick"> Title </IxHeader>
  <IxHeader>
    Title
    <template #extra>
      <IxIcon name="setting" @extraClick="onExtraClick"></IxIcon>
      <IxIcon name="menu" @extraClick="onExtraClick"></IxIcon>
      <IxButton mode="link" @click="onExtraClick($event)">More</IxButton>
    </template>
  </IxHeader>
</template>
<script lang="ts">
import { IxIcon } from '@idux/components/icon'
import { defineComponent, h } from 'vue'

export default defineComponent({
  setup() {
    const extraNode = h(IxIcon, { name: 'menu' })
    const onExtraClick = (evt: MouseEvent) => console.log(evt)
    return { extraNode, onExtraClick }
  },
})
</script>
