<template>
  <IxRadio v-model:checked="checked">Checked: {{ checked }}</IxRadio>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>
