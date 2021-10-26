<template>
  <IxButton @click="showDrawer"> Open </IxButton>
  <IxDrawer v-model:visible="visible" header="Basic header" width="480px" height="80%" offset="10%">
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
