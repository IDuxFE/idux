<template>
  <div ref="target" class="ix-back-top-demo-custom" style="height: 300px; overflow: auto">
    <div style="height: 1000px">
      <div>Scroll down to see the bottom-right button.</div>
      <div>Scroll down to see the bottom-right button.</div>
      <div>Scroll down to see the bottom-right button.</div>
      <div>Scroll down to see the bottom-right button.</div>
      <div>Scroll down to see the bottom-right button.</div>
      <ix-back-top style="bottom: 100px; border-radius: 4px" :duration="200" :target="target"> UP </ix-back-top>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const target = ref<HTMLElement | null>(null)
    return { target }
  },
})
</script>
