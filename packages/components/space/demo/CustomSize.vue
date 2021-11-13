<template>
  <IxSpace :size="size">
    Space
    <IxButton mode="primary">Button</IxButton>
    <IxButton>Button</IxButton>
  </IxSpace>
  <br />
  <input v-model="size" type="number" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const size = ref(20)
</script>
