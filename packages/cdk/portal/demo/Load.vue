<template>
  <CdkPortal target="ix-container" :load="load">
    <div>Portal</div>
  </CdkPortal>
  <IxButton @click="load = !load">Load</IxButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const load = ref(false)
</script>
