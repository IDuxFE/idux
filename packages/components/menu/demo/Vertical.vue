<template>
  <IxMenu style="width: 256px">
    <IxMenuItem icon="home"><a>Item 1</a></IxMenuItem>
    <IxMenuItem icon="mail"> Item 2 </IxMenuItem>
    <IxMenuItem disabled icon="appstore"> Item 3 </IxMenuItem>
    <IxMenuDivider />
    <IxMenuSub label="Menu Sub 1" icon="setting">
      <IxMenuItemGroup label="Item Group 1">
        <IxMenuItem>Item 4</IxMenuItem>
        <IxMenuItem>Item 5</IxMenuItem>
      </IxMenuItemGroup>
      <IxMenuDivider />
      <IxMenuSub>
        <template #label><span>Menu Sub 2</span></template>
        <IxMenuItem>Item 6</IxMenuItem>
        <IxMenuItem>Item 7</IxMenuItem>
      </IxMenuSub>
      <IxMenuSub label="Menu Sub 3">
        <IxMenuItem>Item 8</IxMenuItem>
        <IxMenuItem>Item 9</IxMenuItem>
      </IxMenuSub>
    </IxMenuSub>
    <IxMenuSub disabled label="Menu Sub 4" icon="github">
      <IxMenuItem>Item 10</IxMenuItem>
      <IxMenuItem>Item 11</IxMenuItem>
    </IxMenuSub>
  </IxMenu>
</template>
