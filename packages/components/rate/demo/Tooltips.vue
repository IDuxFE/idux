<template>
  <IxRate v-model:value="value" :tooltips="tooltips" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(3)

const tooltips = ['Poor', 'Fair', 'Average', 'Good', 'Excellent']
</script>
