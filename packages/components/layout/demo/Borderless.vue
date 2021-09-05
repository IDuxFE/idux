<template>
  <IxLayout>
    <IxLayoutHeader borderless>header</IxLayoutHeader>
    <IxLayoutSider borderless>sider</IxLayoutSider>
    <IxLayoutContent> content </IxLayoutContent>
    <IxLayoutFooter borderless>footer</IxLayoutFooter>
  </IxLayout>
</template>

<style lang="less" scoped>
.ix-layout {
  background-color: @blue;
  &-footer,
  &-header {
    background-color: @blue-l20;
  }
  &-sider {
    background-color: @blue-l10;
  }
  &-content {
    height: 200px;
  }
}
</style>
