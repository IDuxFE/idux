<template>
  <IxButton @click="changeVisible"> Change Visible </IxButton>

  <IxDrawer v-model:visible="visible" header="Basic Drawer" :mask="false">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </IxDrawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

const changeVisible = () => {
  visible.value = !visible.value
}
</script>
