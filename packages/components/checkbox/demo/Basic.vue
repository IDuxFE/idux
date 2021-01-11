<template>
  <div>
    <ix-checkbox v-model:checked="checked"> option </ix-checkbox>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const checked = ref(true)

    return {
      checked,
    }
  },
})
</script>
<style lang="less" scoped></style>
