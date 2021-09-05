<template>
  <IxRow align="middle" gutter="16">
    <IxCol>
      <IxRadioGroup v-model:value="mode">
        <IxRadio value="vertical">Vertical</IxRadio>
        <IxRadio value="horizontal">Horizontal</IxRadio>
        <IxRadio value="inline">Inline</IxRadio>
      </IxRadioGroup>
    </IxCol>
    <IxCol>
      <IxDivider type="vertical" />
    </IxCol>
    <IxCol>
      <IxRadioGroup v-model:value="theme">
        <IxRadio value="light">Light</IxRadio>
        <IxRadio value="dark">Dark</IxRadio>
      </IxRadioGroup>
    </IxCol>
    <IxCol>
      <IxDivider type="vertical" />
    </IxCol>
    <IxCol>
      <IxButton mode="primary" @click="collapsed = !collapsed">
        <IxIcon :name="collapsed ? 'menu-unfold' : 'menu-fold'" />
      </IxButton>
    </IxCol>
  </IxRow>

  <div :style="{ marginTop: '16px', width: mode !== 'horizontal' ? '256px' : null }">
    <IxMenu :mode="mode" :theme="theme" :collapsed="collapsed">
      <IxMenuItem key="item1" icon="home"><a>Item 1</a></IxMenuItem>
      <IxMenuItem key="item2" icon="mail"> Item 2 </IxMenuItem>
      <IxMenuItem key="item3" disabled icon="appstore"> Item 3 </IxMenuItem>
      <IxMenuDivider />
      <IxMenuSub key="menuSub1" label="Sub Menu 1" icon="setting">
        <IxMenuItemGroup label="Item Group 1">
          <IxMenuItem key="item4">Item 4</IxMenuItem>
          <IxMenuItem key="item5">Item 5</IxMenuItem>
        </IxMenuItemGroup>
        <IxMenuDivider />
        <IxMenuSub key="menuSub2">
          <template #label><span>Sub Menu 2</span></template>
          <IxMenuItem key="item6">Item 6</IxMenuItem>
          <IxMenuItem key="item7">Item 7</IxMenuItem>
        </IxMenuSub>
        <IxMenuSub key="menuSub3" label="Sub Menu 3">
          <IxMenuItem key="item8">Item 8</IxMenuItem>
          <IxMenuItem key="item9">Item 9</IxMenuItem>
        </IxMenuSub>
      </IxMenuSub>
      <IxMenuSub key="menuSub4" disabled label="MenuSub 4" icon="github">
        <IxMenuItem key="item10">Item 10</IxMenuItem>
        <IxMenuItem key="item11">Item 11</IxMenuItem>
      </IxMenuSub>
    </IxMenu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const mode = ref('vertical')
    const theme = ref('light')
    const collapsed = ref(false)

    return { mode, theme, collapsed }
  },
})
</script>
