<template>
  <p>reverse: false</p>
  <ix-timeline :pending="true">
    <ix-timeline-item>0</ix-timeline-item>
    <ix-timeline-item>1</ix-timeline-item>
  </ix-timeline>

  <p>reverse: true</p>
  <ix-timeline :pending="true" :reverse="true">
    <ix-timeline-item>0</ix-timeline-item>
    <ix-timeline-item>1</ix-timeline-item>
  </ix-timeline>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {},
})
</script>
<style lang="less" scoped></style>
