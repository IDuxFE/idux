<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <IxButton @click="open = !open">Open Modal</IxButton>
  <CdkPortal target="body">
    <div v-if="open" class="portal-modal">
      <p>Hello modal!</p>
      <IxButton @click="open = false">Close</IxButton>
    </div>
  </CdkPortal>
</template>

<style scoped>
.portal-modal {
  position: fixed;
  z-index: 1000;
  top: 30%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  padding: 48px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}
</style>
