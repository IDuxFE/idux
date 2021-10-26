<template>
  <IxButton @click="showDrawer"> Open </IxButton>
  <IxDrawer v-model:visible="visible" header="Basic Drawer">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </IxDrawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

const showDrawer = () => {
  visible.value = !visible.value
}
</script>
