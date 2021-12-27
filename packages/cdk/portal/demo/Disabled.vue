<template>
  <CdkPortal target="ix-container" :disabled="disabled">
    <div>Portal</div>
  </CdkPortal>
  <IxButton @click="handleDisable">Disabled</IxButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const disabled = ref(false)

const handleDisable = () => {
  disabled.value = !disabled.value
}
</script>
