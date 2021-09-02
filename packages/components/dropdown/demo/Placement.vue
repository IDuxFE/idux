<template>
  <IxSpace>
    <IxDropdown placement="bottomStart">
      <IxButton>BS</IxButton>
      <template #overlay>
        <IxMenu>
          <IxMenuItem> Item 1 </IxMenuItem>
          <IxMenuItem> Item 2 </IxMenuItem>
          <IxMenuDivider />
          <IxMenuItem disabled> Item 3 </IxMenuItem>
        </IxMenu>
      </template>
    </IxDropdown>
    <IxDropdown placement="bottom">
      <IxButton>Bottom</IxButton>
      <template #overlay>
        <IxMenu>
          <IxMenuItem> Item 1 </IxMenuItem>
          <IxMenuItem> Item 2 </IxMenuItem>
          <IxMenuDivider />
          <IxMenuItem disabled> Item 3 </IxMenuItem>
        </IxMenu>
      </template>
    </IxDropdown>
    <IxDropdown placement="bottomEnd">
      <IxButton>BE</IxButton>
      <template #overlay>
        <IxMenu>
          <IxMenuItem> Item 1 </IxMenuItem>
          <IxMenuItem> Item 2 </IxMenuItem>
          <IxMenuDivider />
          <IxMenuItem disabled> Item 3 </IxMenuItem>
        </IxMenu>
      </template>
    </IxDropdown>
  </IxSpace>
  <br />
  <IxSpace>
    <IxDropdown placement="topStart">
      <IxButton>TS</IxButton>
      <template #overlay>
        <IxMenu>
          <IxMenuItem> Item 1 </IxMenuItem>
          <IxMenuItem> Item 2 </IxMenuItem>
          <IxMenuDivider />
          <IxMenuItem disabled> Item 3 </IxMenuItem>
        </IxMenu>
      </template>
    </IxDropdown>
    <IxDropdown placement="top">
      <IxButton>Top</IxButton>
      <template #overlay>
        <IxMenu>
          <IxMenuItem> Item 1 </IxMenuItem>
          <IxMenuItem> Item 2 </IxMenuItem>
          <IxMenuDivider />
          <IxMenuItem disabled> Item 3 </IxMenuItem>
        </IxMenu>
      </template>
    </IxDropdown>
    <IxDropdown placement="topEnd">
      <IxButton>TE</IxButton>
      <template #overlay>
        <IxMenu>
          <IxMenuItem> Item 1 </IxMenuItem>
          <IxMenuItem> Item 2 </IxMenuItem>
          <IxMenuDivider />
          <IxMenuItem disabled> Item 3 </IxMenuItem>
        </IxMenu>
      </template>
    </IxDropdown>
  </IxSpace>
</template>

<style lang="less" scoped>
.ix-button {
  width: 80px;
}
</style>
