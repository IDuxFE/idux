<template>
  <IxTag checkable :checked="checked" color="red" @click="onClick">Checkable Tag</IxTag>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
const onClick = () => {
  checked.value = !checked.value
}
</script>
