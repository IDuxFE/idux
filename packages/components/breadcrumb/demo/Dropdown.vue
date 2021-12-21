<template>
  <IxBreadcrumb>
    <IxBreadcrumbItem>Somewhere</IxBreadcrumbItem>
    <IxBreadcrumbItem>
      <IxDropdown>
        <a class="ix-dropdown-trigger">over the rainbow <IxIcon name="down"></IxIcon></a>
        <template #overlay>
          <IxMenu>
            <IxMenuItem key="one">skies are blue</IxMenuItem>
            <IxMenuItem key="two">wish upon a star</IxMenuItem>
            <IxMenuDivider />
            <IxMenuItem key="three" disabled>troubles melt like lemon drops</IxMenuItem>
          </IxMenu>
        </template>
      </IxDropdown>
    </IxBreadcrumbItem>
  </IxBreadcrumb>
</template>
