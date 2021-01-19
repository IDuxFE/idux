<template>
  <ix-affix :offset="offset">affix</ix-affix>
</template>

<script>
import { reactive, defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const offset = reactive({ bottom: 100, top: 100 })
    return {
      offset,
    }
  },
})
</script>
