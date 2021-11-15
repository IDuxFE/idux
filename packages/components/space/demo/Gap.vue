<template>
  <!-- TODO IxInputNumber -->
  <input v-model="gap" type="number" />
  <br /><br />
  <IxSpace :gap="gap">
    Space
    <IxButton mode="primary">Button</IxButton>
    <IxButton>Button</IxButton>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const gap = ref(8)
</script>
