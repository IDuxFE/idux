<template>
  <ix-steps :active="1" :percent="percent">
    <ix-step title="Finished" subTitle="20:20:01" description="This is a description."></ix-step>
    <ix-step title="In Progress" description="This is a description."></ix-step>
    <ix-step title="Waiting" description="This is a description."></ix-step>
  </ix-steps>

  <ix-space style="margin-top: 8px">
    <ix-button v-show="percent > 0" @click="less"> Less </ix-button>
    <ix-button v-show="percent < 100" @click="add"> Add </ix-button>
    <ix-button v-show="percent === 100" mode="primary" @click="done"> Done </ix-button>
  </ix-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const percent = ref(0)

    const add = () => {
      if (percent.value === 100) {
        return
      }
      percent.value += 20
    }

    const less = () => {
      if (percent.value === 0) {
        return
      }
      percent.value -= 20
    }

    const done = () => {
      console.log('done')
    }

    return { percent, add, less, done }
  },
})
</script>
