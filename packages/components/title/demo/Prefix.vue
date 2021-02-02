<template>
  <ix-title prefix="arrow-left" @prefixClick="onPrefixClick"> Title </ix-title>
  <ix-title>
    Title
    <template #prefix> <ix-icon name="caret-left" /> </template>
  </ix-title>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const onPrefixClick = (evt: MouseEvent) => console.log(evt)
    return { onPrefixClick }
  },
})
</script>
