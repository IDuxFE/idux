<template>
  <IxSpace>
    <IxDropdown placement="bottom-start">
      <IxButton>bottom-start</IxButton>
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
      <IxButton>bottom</IxButton>
      <template #overlay>
        <IxMenu>
          <IxMenuItem> Item 1 </IxMenuItem>
          <IxMenuItem> Item 2 </IxMenuItem>
          <IxMenuDivider />
          <IxMenuItem disabled> Item 3 </IxMenuItem>
        </IxMenu>
      </template>
    </IxDropdown>
    <IxDropdown placement="bottom-end">
      <IxButton>bottom-end</IxButton>
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
  <br /><br />
  <IxSpace>
    <IxDropdown placement="top-start">
      <IxButton>top-start</IxButton>
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
      <IxButton>top</IxButton>
      <template #overlay>
        <IxMenu>
          <IxMenuItem> Item 1 </IxMenuItem>
          <IxMenuItem> Item 2 </IxMenuItem>
          <IxMenuDivider />
          <IxMenuItem disabled> Item 3 </IxMenuItem>
        </IxMenu>
      </template>
    </IxDropdown>
    <IxDropdown placement="top-end">
      <IxButton>top-end</IxButton>
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
  width: 120px;
}
</style>
