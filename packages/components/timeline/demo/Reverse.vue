<template>
  <ix-timeline :pending="true" :reverse="reverse">
    <ix-timeline-item key="0">New issue in 2021-02-08</ix-timeline-item>
    <ix-timeline-item key="1">Create IxTimeline in 2021-02-10</ix-timeline-item>
    <ix-timeline-item key="2">Update component documentation in 2021-02-12</ix-timeline-item>
    <ix-timeline-item key="3">Write test cases in 2021-02-14</ix-timeline-item>
  </ix-timeline>

  <ix-button mode="primary" @click="changeReverse">Toggle reverse</ix-button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const reverse = ref(false)
    const changeReverse = () => {
      reverse.value = !reverse.value
    }
    return { reverse, changeReverse }
  },
})
</script>
