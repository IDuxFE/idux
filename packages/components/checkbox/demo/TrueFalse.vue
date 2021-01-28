<template>
  <div>
    <ix-checkbox v-model:checked="checked" trueValue="yes" falseValue="no"> {{ checked }} </ix-checkbox>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const checked = ref('yes')

    return {
      checked,
    }
  },
})
</script>
<style lang="less" scoped></style>
