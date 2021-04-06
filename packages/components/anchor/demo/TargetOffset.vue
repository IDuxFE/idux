<template>
  <ix-anchor :target-offset="targetOffset">
    <ix-link href="#何时使用" title="何时使用" />
    <ix-link href="#api" title="api">
      <ix-link href="#ix-anchor" title="ix-anchor" />
      <ix-link href="#props" title="ix-anchor-link Props" />
    </ix-link>
  </ix-anchor>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
export default defineComponent({
  setup() {
    const targetOffset = ref(0)

    onMounted(() => {
      targetOffset.value = window.innerHeight / 2
    })
    return {
      targetOffset,
    }
  },
})
</script>
<style lang="less" scoped></style>
