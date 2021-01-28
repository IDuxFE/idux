<template>
  <div>
    <ix-checkbox-group v-model:value="value">
      <ix-checkbox value="option1"> option1 </ix-checkbox>
      <ix-checkbox value="option2"> option2 </ix-checkbox>
      <ix-checkbox value="option3"> option3 </ix-checkbox>
    </ix-checkbox-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref(['option1', 'option2', 'option3'])

    return {
      value,
    }
  },
})
</script>
<style lang="less" scoped></style>
