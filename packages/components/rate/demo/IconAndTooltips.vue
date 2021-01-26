<template>
  <ix-rate v-model:value="value" :icon="icon" :tooltips="tooltip" />
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const value = ref(3)
    const icon = 'smile'
    const tooltip = ['很差', '差', '一般', '不错', '很好']

    return {
      value,
      icon,
      tooltip,
    }
  },
})
</script>
