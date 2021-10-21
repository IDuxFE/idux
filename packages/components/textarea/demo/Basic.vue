<template>
  <IxSpace direction="vertical">
    <IxTextarea v-model:value="valueRef" placeholder="Basic usage" />
    <IxTextarea v-model:value="valueRef" placeholder="Textarea usage" rows="4" />
  </IxSpace>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const valueRef = ref('')
</script>
