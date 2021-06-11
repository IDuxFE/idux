<template>
  <ix-header prefix="arrow-left" @prefixClick="onPrefixClick"> Title </ix-header>
  <ix-header>
    Title
    <template #prefix> <ix-icon name="caret-left" @click="onPrefixClick" /> </template>
  </ix-header>
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
