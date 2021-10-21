<template>
  <IxSwitch v-model:checked="checked"></IxSwitch>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)
</script>
