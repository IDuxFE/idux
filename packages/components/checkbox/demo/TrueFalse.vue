<template>
  <IxCheckbox v-model:checked="checked" trueValue="yes" falseValue="no">Yes or no</IxCheckbox>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const checked = ref('yes')

watch(checked, value => console.log(value))
</script>
