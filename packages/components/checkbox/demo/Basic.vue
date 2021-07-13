<template>
  <div>
    <ix-checkbox v-model:checked="checked" label="option" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const checked = ref(false)
    return {
      checked,
    }
  },
})
</script>
<style lang="less" scoped></style>
