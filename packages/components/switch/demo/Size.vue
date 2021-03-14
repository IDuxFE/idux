<template>
  <div>small size:</div>
  <ix-switch size="small"></ix-switch>
  <div>normal size:</div>
  <ix-switch size="normal"></ix-switch>
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
.switch-basic-button {
  margin-top: 5px;
}
</style>
