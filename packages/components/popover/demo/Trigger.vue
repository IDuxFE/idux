<template>
  <IxSpace>
    <IxPopover header="Title">
      <template #content>
        <div>This is content...</div>
        <div>This is content...</div>
      </template>
      <IxButton>Hover</IxButton>
    </IxPopover>
    <IxPopover header="Title" trigger="focus">
      <template #content>
        <div>This is content...</div>
        <div>This is content...</div>
      </template>
      <IxButton>Focus</IxButton>
    </IxPopover>
    <IxPopover header="Title" trigger="click">
      <template #content>
        <div>This is content...</div>
        <div>This is content...</div>
      </template>
      <IxButton>Click</IxButton>
    </IxPopover>
    <IxPopover header="Title" trigger="contextmenu">
      <template #content>
        <div>This is content...</div>
        <div>This is content...</div>
      </template>
      <IxButton>Context Menu</IxButton>
    </IxPopover>
    <IxPopover header="Title" trigger="manual" :visible="visible">
      <template #content>
        <div>This is content...</div>
        <div>This is content...</div>
      </template>
      <IxButton @Click="visible = !visible">Manual</IxButton>
    </IxPopover>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>
