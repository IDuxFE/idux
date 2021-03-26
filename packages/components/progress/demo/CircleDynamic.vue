<template>
  <div>
    <ix-progress :percent="defaultPercent" />
    <ix-progress :percent="defaultPercent" type="circle" />
    <ix-button-group>
      <ix-button icon="minus" @click="decline" />
      <ix-button icon="plus" @click="increase" />
    </ix-button-group>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const defaultPercent = ref<number>(0)

    const increase = () => {
      const percent = defaultPercent.value + 10
      defaultPercent.value = percent > 100 ? 100 : percent
    }

    const decline = () => {
      const percent = defaultPercent.value - 10
      defaultPercent.value = percent < 0 ? 0 : percent
    }
    return {
      defaultPercent,
      increase,
      decline,
    }
  },
})
</script>
