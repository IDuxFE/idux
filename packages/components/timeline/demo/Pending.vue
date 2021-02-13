<template>
  <p>pending: false</p>
  <ix-timeline>
    <ix-timeline-item>0</ix-timeline-item>
    <ix-timeline-item>1</ix-timeline-item>
  </ix-timeline>

  <p>pending: true</p>
  <ix-timeline :pending="true">
    <ix-timeline-item>0</ix-timeline-item>
    <ix-timeline-item>1</ix-timeline-item>
  </ix-timeline>

  <p>pending: string</p>
  <ix-timeline pending="recording">
    <ix-timeline-item>0</ix-timeline-item>
    <ix-timeline-item>1</ix-timeline-item>
  </ix-timeline>

  <p>pending: slots</p>
  <ix-timeline>
    <ix-timeline-item>0</ix-timeline-item>
    <ix-timeline-item>1</ix-timeline-item>
    <template #pending>slots</template>
  </ix-timeline>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {},
})
</script>
<style lang="less" scoped></style>
