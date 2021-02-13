<template>
  <p>mode: right</p>
  <ix-timeline :pending="true">
    <ix-timeline-item>0</ix-timeline-item>
    <ix-timeline-item>1</ix-timeline-item>
    <ix-timeline-item>2</ix-timeline-item>
    <ix-timeline-item>3</ix-timeline-item>
  </ix-timeline>

  <p>mode: alternate</p>
  <ix-timeline :pending="true" mode="alternate">
    <ix-timeline-item>0</ix-timeline-item>
    <ix-timeline-item>1</ix-timeline-item>
    <ix-timeline-item>2</ix-timeline-item>
    <ix-timeline-item>3</ix-timeline-item>
  </ix-timeline>

  <p>mode: left</p>
  <ix-timeline :pending="true" mode="left">
    <ix-timeline-item>0</ix-timeline-item>
    <ix-timeline-item>1</ix-timeline-item>
    <ix-timeline-item>2</ix-timeline-item>
    <ix-timeline-item>3</ix-timeline-item>
  </ix-timeline>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {},
})
</script>
<style lang="less" scoped></style>
