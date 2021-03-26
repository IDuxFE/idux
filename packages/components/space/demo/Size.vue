<template>
  <ix-space :size="size">
    Space
    <ix-button>Button</ix-button>
    <ix-button mode="primary">Button</ix-button>
  </ix-space>
  <br />
  <select v-model="size">
    <option value="small">small</option>
    <option value="medium">medium</option>
    <option value="large">large</option>
  </select>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Size',
  setup() {
    const size = ref('small')
    return { size }
  },
})
</script>
