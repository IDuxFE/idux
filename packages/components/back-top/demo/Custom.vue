<template>
  <div ref="target" class="ix-back-top-demo-custom" style="height: 300px; overflow: auto">
    <div style="height: 1000px">
      <div>Scroll down to see the bottom-right button.</div>
      <div>Scroll down to see the bottom-right button.</div>
      <div>Scroll down to see the bottom-right button.</div>
      <div>Scroll down to see the bottom-right button.</div>
      <div>Scroll down to see the bottom-right button.</div>
      <IxBackTop style="bottom: 100px; border-radius: 4px" :duration="200" :target="target"> UP </IxBackTop>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const target = ref<HTMLElement>()
    return { target }
  },
})
</script>
