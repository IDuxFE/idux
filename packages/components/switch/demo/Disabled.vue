<template>
  <ix-switch :disabled="disabled"></ix-switch>
  <div class="mt-5">disabled: {{ disabled }}</div>
  <ix-button class="mt-5" @click="changeDisabled">change disabled</ix-button>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const disabled = ref(true)
    const changeDisabled = () => {
      disabled.value = !disabled.value
    }

    return {
      disabled,
      changeDisabled,
    }
  },
})
</script>
<style lang="less" scoped>
.mt-5 {
  margin-top: 5px;
}
</style>
