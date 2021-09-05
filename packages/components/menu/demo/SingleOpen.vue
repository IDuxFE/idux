<template>
  <IxMenu style="width: 256px" mode="inline" :expandedKeys="expandedKeys" @update:expandedKeys="onExpandedChange">
    <IxMenuSub key="sub1" label="Sub Menu 1" icon="home">
      <IxMenuItem>Item 1</IxMenuItem>
      <IxMenuItem>Item 2</IxMenuItem>
      <IxMenuSub label="Sub Menu 1-1">
        <IxMenuItem>Item 3</IxMenuItem>
        <IxMenuItem>Item 4</IxMenuItem>
      </IxMenuSub>
      <IxMenuSub label="Sub Menu 1-2">
        <IxMenuItem>Item 5</IxMenuItem>
        <IxMenuItem>Item 6</IxMenuItem>
      </IxMenuSub>
    </IxMenuSub>
    <IxMenuSub key="sub2" label="MenuSub 2" icon="mail">
      <IxMenuItem>Item 7</IxMenuItem>
      <IxMenuItem>Item 8</IxMenuItem>
      <IxMenuItem>Item 9</IxMenuItem>
    </IxMenuSub>
    <IxMenuSub key="sub3" label="MenuSub 3" icon="appstore">
      <IxMenuItem>Item 10</IxMenuItem>
      <IxMenuItem>Item 11</IxMenuItem>
      <IxMenuItem>Item 12</IxMenuItem>
    </IxMenuSub>
  </IxMenu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const rootMenuSubKeys = ['sub1', 'sub2', 'sub3']
    const expandedKeys = ref<string[]>([])
    const onExpandedChange = (keys: string[]) => {
      const lastExpandedKey = keys.find(key => !expandedKeys.value.includes(key))
      if (rootMenuSubKeys.indexOf(lastExpandedKey!) === -1) {
        expandedKeys.value = keys
      } else {
        expandedKeys.value = lastExpandedKey ? [lastExpandedKey] : []
      }
    }
    return { expandedKeys, onExpandedChange }
  },
})
</script>
