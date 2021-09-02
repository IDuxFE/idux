<template>
  <IxDropdown>
    <a class="ix-dropdown-trigger">Hover me <IxIcon name="down"></IxIcon></a>
    <template #overlay>
      <IxMenu>
        <IxMenuItem> Item 1 </IxMenuItem>
        <IxMenuItem> Item 2 </IxMenuItem>
        <IxMenuDivider />
        <IxMenuItem disabled> Item 3 </IxMenuItem>
      </IxMenu>
    </template>
  </IxDropdown>
</template>
