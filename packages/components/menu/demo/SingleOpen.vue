<template>
  <ix-menu style="width: 256px" mode="inline" :openedIds="openedIds" @update:openedIds="onOpenChange">
    <ix-sub-menu cid="sub1" title="Sub Menu 1" icon="home">
      <ix-menu-item>Item 1</ix-menu-item>
      <ix-menu-item>Item 2</ix-menu-item>
      <ix-sub-menu title="Sub Menu 1-1">
        <ix-menu-item>Item 3</ix-menu-item>
        <ix-menu-item>Item 4</ix-menu-item>
      </ix-sub-menu>
      <ix-sub-menu title="Sub Menu 1-2">
        <ix-menu-item>Item 5</ix-menu-item>
        <ix-menu-item>Item 6</ix-menu-item>
      </ix-sub-menu>
    </ix-sub-menu>
    <ix-sub-menu cid="sub2" title="SubMenu 2" icon="mail">
      <ix-menu-item>Item 7</ix-menu-item>
      <ix-menu-item>Item 8</ix-menu-item>
      <ix-menu-item>Item 9</ix-menu-item>
    </ix-sub-menu>
    <ix-sub-menu cid="sub3" title="SubMenu 3" icon="appstore">
      <ix-menu-item>Item 10</ix-menu-item>
      <ix-menu-item>Item 11</ix-menu-item>
      <ix-menu-item>Item 12</ix-menu-item>
    </ix-sub-menu>
  </ix-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const rootSubMenuIds = ['sub1', 'sub2', 'sub3']
    const openedIds = ref<string[]>([])
    const onOpenChange = (ids: string[]) => {
      const lastOpenId = ids.find(id => !openedIds.value.includes(id))
      if (rootSubMenuIds.indexOf(lastOpenId!) === -1) {
        openedIds.value = ids
      } else {
        openedIds.value = lastOpenId ? [lastOpenId] : []
      }
    }
    return { openedIds, onOpenChange }
  },
})
</script>
