<template>
  <p>pendingDot: string</p>
  <ix-timeline :pending="true" pending-dot="dot">
    <ix-timeline-item>0</ix-timeline-item>
    <ix-timeline-item>1</ix-timeline-item>
  </ix-timeline>

  <p>pendingDot: slots</p>
  <ix-timeline :pending="true">
    <ix-timeline-item>0</ix-timeline-item>
    <ix-timeline-item>1</ix-timeline-item>
    <template v-slot:pendingDot>
      <ix-icon name='frown'/>
    </template>
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