<template>
  <ix-steps :active="1" :percent="percent">
    <ix-step title="Finished" subTitle="20:20:01" description="This is a description."></ix-step>
    <ix-step title="In Progress" description="This is a description."></ix-step>
    <ix-step title="Waiting" description="This is a description."></ix-step>
  </ix-steps>

  <br />

  <ix-button class="change-btn" @click="lessPercent">进度-</ix-button>
  <ix-button @click="addPercent">进度+</ix-button>

  <!-- <ix-steps :active="1" status="error" :percent="88">
        <ix-step title="Finished" subTitle="20:20:01" description="This is a description."></ix-step>
        <ix-step title="In Progress" description="This is a description."></ix-step>
        <ix-step title="Waiting" description="This is a description."></ix-step>
    </ix-steps> -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const percent = ref(0)

    const addPercent = () => {
      if (percent.value >= 100) {
        percent.value = 100
        return
      }
      percent.value += 20
    }

    const lessPercent = () => {
      if (percent.value <= 0) {
        percent.value = 0
        return
      }
      percent.value -= 20
    }

    return {
      percent,
      addPercent,
      lessPercent,
    }
  },
})
</script>

<style lang="less" scoped>
.change-btn {
  margin-right: 12px;
}
</style>
