<template>
  <IxMenu style="width: 256px" mode="inline" :openedIds="openedIds" @update:openedIds="onOpenChange">
    <IxMenuSub cid="sub1" title="Sub Menu 1" icon="home">
      <IxMenuItem>Item 1</IxMenuItem>
      <IxMenuItem>Item 2</IxMenuItem>
      <IxMenuSub title="Sub Menu 1-1">
        <IxMenuItem>Item 3</IxMenuItem>
        <IxMenuItem>Item 4</IxMenuItem>
      </IxMenuSub>
      <IxMenuSub title="Sub Menu 1-2">
        <IxMenuItem>Item 5</IxMenuItem>
        <IxMenuItem>Item 6</IxMenuItem>
      </IxMenuSub>
    </IxMenuSub>
    <IxMenuSub cid="sub2" title="MenuSub 2" icon="mail">
      <IxMenuItem>Item 7</IxMenuItem>
      <IxMenuItem>Item 8</IxMenuItem>
      <IxMenuItem>Item 9</IxMenuItem>
    </IxMenuSub>
    <IxMenuSub cid="sub3" title="MenuSub 3" icon="appstore">
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
    const rootMenuSubIds = ['sub1', 'sub2', 'sub3']
    const openedIds = ref<string[]>([])
    const onOpenChange = (ids: string[]) => {
      const lastOpenId = ids.find(id => !openedIds.value.includes(id))
      if (rootMenuSubIds.indexOf(lastOpenId!) === -1) {
        openedIds.value = ids
      } else {
        openedIds.value = lastOpenId ? [lastOpenId] : []
      }
    }
    return { openedIds, onOpenChange }
  },
})
</script>
