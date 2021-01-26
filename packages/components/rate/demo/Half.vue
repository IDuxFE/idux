<template>
  <ix-rate v-model:value="value" allowHalf />
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const value = ref(3.5)

    return {
      value,
    }
  },
})
</script>
