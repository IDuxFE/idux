<template>
  <ix-timeline :pending="true">
    <ix-timeline-item color="red">red</ix-timeline-item>
    <ix-timeline-item color="yellow">yellow</ix-timeline-item>
    <ix-timeline-item color="black">black</ix-timeline-item>
    <ix-timeline-item>default</ix-timeline-item>
  </ix-timeline>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {

  }
})
</script>
<style lang="less" scoped>
</style>