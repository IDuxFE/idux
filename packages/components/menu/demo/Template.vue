<template>
  <IxMenu style="width: 256px">
    <IxMenuItem key="item1" icon="home" label="Item 1"></IxMenuItem>
    <IxMenuItem key="item2" icon="mail" label="Item 2"></IxMenuItem>
    <IxMenuItem key="item3" disabled icon="appstore" label="Item 3"></IxMenuItem>
    <IxMenuDivider />
    <IxMenuSub key="menuSub1" label="Menu Sub 1" icon="setting">
      <IxMenuItemGroup key="itemGroup1" label="Item Group 1">
        <IxMenuItem key="item4" label="Item 4"></IxMenuItem>
        <IxMenuItem key="item5" label="Item 5"></IxMenuItem>
      </IxMenuItemGroup>
      <IxMenuDivider />
      <IxMenuSub key="menuSub2">
        <template #label><span>Menu Sub 2</span></template>
        <IxMenuItem key="item6" label="Item 6"></IxMenuItem>
        <IxMenuItem key="item7" label="Item 7"></IxMenuItem>
      </IxMenuSub>
      <IxMenuSub key="menuSub3" label="Menu Sub 3">
        <IxMenuItem key="item8" label="Item 8"></IxMenuItem>
        <IxMenuItem key="item9" label="Item 9"></IxMenuItem>
      </IxMenuSub>
    </IxMenuSub>
    <IxMenuSub key="menuSub4" disabled label="Menu Sub 4" icon="github">
      <IxMenuItem key="item10" label="Item 10"></IxMenuItem>
      <IxMenuItem key="item11" label="Item 11"></IxMenuItem>
    </IxMenuSub>
  </IxMenu>
</template>
