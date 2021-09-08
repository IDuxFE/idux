<template>
  <IxLayout>
    <IxLayoutHeader>header</IxLayoutHeader>
    <IxLayoutSider placement="end">sider</IxLayoutSider>
    <IxLayoutContent>content</IxLayoutContent>
    <IxLayoutFooter>footer</IxLayoutFooter>
  </IxLayout>
</template>

<style lang="less" scoped>
.ix-layout {
  background-color: @color-blue;
  &-footer,
  &-header {
    background-color: @color-blue-l20;
  }
  &-sider {
    background-color: @color-blue-l10;
  }
  &-content {
    height: 200px;
  }
}
</style>
