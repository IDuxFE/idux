<template>
  <IxButton mode="primary" @click="visible = !visible">Open modal</IxButton>
  <IxModal v-model:visible="visible" draggable header="This is header">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </IxModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>
