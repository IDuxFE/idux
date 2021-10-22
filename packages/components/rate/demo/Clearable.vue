<template>
  <IxRate v-model:value="value" clearable />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(3)
</script>
