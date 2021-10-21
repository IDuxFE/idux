<template>
  <IxCheckbox v-model:checked="checked">Checked: {{ checked }}</IxCheckbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>
