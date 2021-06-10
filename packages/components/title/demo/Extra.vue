<template>
  <ix-title extra="setting" @extraClick="onExtraClick"> Title </ix-title>
  <ix-title :extra="extras" @extraClick="onExtraClick"> Title </ix-title>
  <ix-title>
    Title
    <template #extra> <ix-button mode="link" @click="onExtraClick($event, 'more')">More</ix-button> </template>
  </ix-title>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const extras = ['setting', 'menu']
    const onExtraClick = (evt: MouseEvent, name: string) => console.log(evt, name)
    return { extras, onExtraClick }
  },
})
</script>
