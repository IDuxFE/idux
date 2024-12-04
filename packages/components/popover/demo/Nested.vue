<template>
  <IxSpace>
    <IxPopover header="Title">
      <template #content>
        <div>This is content...</div>
        <div>This is content...</div>
        <br />
        <IxPopover header="Title">
          <template #content>
            <div>This is sub content...</div>
            <div>This is sub content...</div>
            <br />
          </template>
          <IxButton>hover</IxButton>
        </IxPopover>
      </template>
      <IxButton>hover</IxButton>
    </IxPopover>
    <IxPopover header="Title" trigger="click" closable>
      <template #content>
        <div>This is content...</div>
        <div>This is content...</div>
        <br />
        <IxSelect :dataSource="dataSource" placeholder="Please Select" />
      </template>
      <IxButton>click</IxButton>
    </IxPopover>
  </IxSpace>
</template>
<script setup lang="ts">
import { SelectData } from '@idux/components/select'

const dataSource: SelectData[] = [
  { key: 'tom', label: 'Tom' },
  { key: 'jerry', label: 'Jerry' },
  { key: 'speike', label: 'Speike' },
]
</script>
