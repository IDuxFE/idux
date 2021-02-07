<template>
  <ix-title extra="setting" @extraClick="onExtraClick"> Title </ix-title>
  <ix-title :extra="extras" @extraClick="onExtraClick"> Title </ix-title>
  <ix-title>
    Title
    <template #extra> <ix-button mode="link">More</ix-button> </template>
  </ix-title>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const extras = ['setting', 'menu']
    const onExtraClick = (name: string, evt: MouseEvent) => console.log(name, evt)
    return { extras, onExtraClick }
  },
})
</script>
