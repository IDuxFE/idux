<template>
  <IxPopover v-model:visible="visible" header="Title" :closable="true" trigger="manual">
    <template #content>
      <div>This is content...</div>
      <div>This is content...</div>
    </template>
    <IxButton @click="visible = true">click</IxButton>
  </IxPopover>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>
