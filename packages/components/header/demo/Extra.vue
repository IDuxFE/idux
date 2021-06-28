<template>
  <ix-header extra="setting" @extraClick="onExtraClick"> Title </ix-header>
  <ix-header :extra="extras" @extraClick="onExtraClick"> Title </ix-header>
  <ix-header>
    Title
    <template #extra> <ix-button mode="link" @click="onExtraClick($event, 'more')">More</ix-button> </template>
  </ix-header>
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
