<template>
  <IxMenu style="width: 256px">
    <IxMenuItem icon="home"><a>Item 1</a></IxMenuItem>
    <IxMenuItem icon="mail"> Item 2 </IxMenuItem>
    <IxMenuItem disabled icon="appstore"> Item 3 </IxMenuItem>
    <IxMenuDivider />
    <IxMenuSub title="Sub Menu 1" icon="setting">
      <IxMenuItemGroup title="Item Group 1">
        <IxMenuItem>Item 4</IxMenuItem>
        <IxMenuItem>Item 5</IxMenuItem>
      </IxMenuItemGroup>
      <IxMenuDivider />
      <IxMenuSub>
        <template #title><span>Sub Menu 2</span></template>
        <IxMenuItem>Item 6</IxMenuItem>
        <IxMenuItem>Item 7</IxMenuItem>
      </IxMenuSub>
      <IxMenuSub title="Sub Menu 3">
        <IxMenuItem>Item 8</IxMenuItem>
        <IxMenuItem>Item 9</IxMenuItem>
      </IxMenuSub>
    </IxMenuSub>
    <IxMenuSub disabled title="MenuSub 4" icon="github">
      <IxMenuItem>Item 10</IxMenuItem>
      <IxMenuItem>Item 11</IxMenuItem>
    </IxMenuSub>
  </IxMenu>
</template>
