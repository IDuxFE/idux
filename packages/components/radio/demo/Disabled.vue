<template>
  <ix-radio :disabled="disabled">a</ix-radio>
  <ix-radio checked :disabled="disabled">b</ix-radio>
  <ix-button @click="toggle">Toggle</ix-button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const disabled = ref(true)
    const toggle = () => (disabled.value = !disabled.value)

    return { toggle, disabled }
  },
})
</script>
