<template>
  <ix-rate v-model:value="value" disabled />
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const value = ref(3)

    return {
      value,
    }
  },
})
</script>
