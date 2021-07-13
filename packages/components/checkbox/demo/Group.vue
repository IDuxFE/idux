<template>
  <div>
    <ix-checkbox-group v-model:value="value" :options="options" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref(['option1', 'option2', 'option3'])
    const options = [
      { label: 'option1', value: 'option1' },
      { label: 'option2', value: 'option2' },
      { label: 'option3', value: 'option3' },
    ]
    return {
      value,
      options,
    }
  },
})
</script>
<style lang="less" scoped></style>
