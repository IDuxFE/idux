<template>
  <ix-timeline :pending="true">
    <ix-timeline-item>
      0
      <template #dot>
        <ix-icon name="clock-circle-filled" />
      </template>
    </ix-timeline-item>
    <ix-timeline-item>1</ix-timeline-item>
    <ix-timeline-item>
      2
      <template #dot>
        <ix-icon name="clock-circle-filled" />
      </template>
    </ix-timeline-item>
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
