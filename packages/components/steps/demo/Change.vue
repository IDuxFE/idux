<template>
  <ix-steps :active="active">
    <ix-step v-for="(item, index) in steps" :key="index" :title="item.title"> </ix-step>
  </ix-steps>

  <br />

  <ix-button class="change-btn" :disabled="active < 1" @click="pre">上一步</ix-button>
  <ix-button class="change-btn" :disabled="active > steps.length - 2" @click="next">下一步</ix-button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const active = ref(0)

    const steps = [
      {
        title: 'First',
      },
      {
        title: 'Second',
      },
      {
        title: 'Last',
      },
    ]

    const pre = () => {
      active.value -= 1
    }

    const next = () => {
      active.value += 1
    }

    return {
      active,
      steps,
      pre,
      next,
    }
  },
})
</script>

<style lang="less" scoped>
.change-btn {
  margin-right: 12px;
}
</style>
