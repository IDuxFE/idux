<template>
  <ix-radio-group v-model:value="value">
    <ix-space direction="vertical">
      <ix-radio value="a">Option A</ix-radio>
      <ix-radio value="b">Option B</ix-radio>
      <ix-radio value="c">Option C</ix-radio>
      <ix-radio value="d">
        More...
        <ix-input v-if="value === 'd'" v-model:value="moreValue" style="width: 100px; margin-left: 16px"></ix-input>
      </ix-radio>
    </ix-space>
  </ix-radio-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('a')
    const moreValue = ref('')

    return { value, moreValue }
  },
})
</script>
