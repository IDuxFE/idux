<template>
  <ix-header extra="setting" @extraClick="onExtraClick"> Title </ix-header>
  <ix-header :extra="extraNode" @extraClick="onExtraClick"> Title </ix-header>
  <ix-header>
    Title
    <template #extra>
      <ix-icon name="setting" @extraClick="onExtraClick"></ix-icon>
      <ix-icon name="menu" @extraClick="onExtraClick"></ix-icon>
      <ix-button mode="link" @click="onExtraClick($event)">More</ix-button>
    </template>
  </ix-header>
</template>
<script lang="ts">
import { IxIcon } from '@idux/components/icon'
import { defineComponent, h } from 'vue'

export default defineComponent({
  setup() {
    const extraNode = h(IxIcon, { name: 'menu' })
    const onExtraClick = (evt: MouseEvent) => console.log(evt)
    return { extraNode, onExtraClick }
  },
})
</script>
