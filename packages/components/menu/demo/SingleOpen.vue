<template>
  <IxMenu style="width: 256px" mode="inline" :expandedKeys="expandedKeys" @update:expandedKeys="onExpandedChange">
    <IxMenuSub key="sub1" label="Menu Sub 1" icon="home">
      <IxMenuItem>Item 1</IxMenuItem>
      <IxMenuItem>Item 2</IxMenuItem>
      <IxMenuSub key="sub1-1" label="Menu Sub 1-1">
        <IxMenuItem>Item 3</IxMenuItem>
        <IxMenuItem>Item 4</IxMenuItem>
      </IxMenuSub>
      <IxMenuSub key="sub1-2" label="Menu Sub 1-2">
        <IxMenuItem>Item 5</IxMenuItem>
        <IxMenuItem>Item 6</IxMenuItem>
      </IxMenuSub>
    </IxMenuSub>
    <IxMenuSub key="sub2" label="Menu Sub 2" icon="mail">
      <IxMenuItem>Item 7</IxMenuItem>
      <IxMenuItem>Item 8</IxMenuItem>
      <IxMenuItem>Item 9</IxMenuItem>
    </IxMenuSub>
    <IxMenuSub key="sub3" label="Menu Sub 3" icon="appstore">
      <IxMenuItem>Item 10</IxMenuItem>
      <IxMenuItem>Item 11</IxMenuItem>
      <IxMenuItem>Item 12</IxMenuItem>
    </IxMenuSub>
  </IxMenu>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { VKey } from '@idux/cdk/utils'

const rootMenuSubKeys: VKey[] = ['sub1', 'sub2', 'sub3']

const expandedKeys = ref<VKey[]>([])

const onExpandedChange = (keys: VKey[]) => {
  const lastExpandedKey = keys.find(key => !expandedKeys.value.includes(key))
  if (rootMenuSubKeys.indexOf(lastExpandedKey!) === -1) {
    expandedKeys.value = keys
  } else {
    expandedKeys.value = lastExpandedKey ? [lastExpandedKey] : []
  }
}
</script>
