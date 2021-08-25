<template>
  <IxRadio :disabled="disabled">a</IxRadio>
  <IxRadio checked :disabled="disabled">b</IxRadio>
  <IxButton @click="toggle">Toggle</IxButton>
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
