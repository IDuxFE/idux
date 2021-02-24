<template>
  <ix-affix :offset="offset">
    <ix-button mode="primary">basic</ix-button>
  </ix-affix>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const offset = ref(0)
    return {
      offset,
    }
  },
})
</script>
<style lang="less" scoped>
:deep(.ix-affix) {
  z-index: 100;
}
</style>
