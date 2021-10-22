<template>
  <IxRate v-model:value="value" allowHalf />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(3.5)
</script>
