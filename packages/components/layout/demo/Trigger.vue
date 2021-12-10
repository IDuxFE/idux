<template>
  <IxLayout>
    <IxLayoutHeader>Header</IxLayoutHeader>
    <IxLayoutSider>
      <div class="ix-layout-sider-content">Sider</div>
      <IxLayoutSiderTrigger></IxLayoutSiderTrigger>
    </IxLayoutSider>
    <IxLayoutContent>Content</IxLayoutContent>
    <IxLayoutFooter>Footer</IxLayoutFooter>
  </IxLayout>
</template>

<style scoped lang="less">
.ix-layout {
  &-sider {
    padding-bottom: 48px;
    line-height: 1;
    &-content {
      padding-top: 48px;
      height: 100%;
    }

    &-trigger {
      background: @color-blue;
      line-height: 48px;
    }
  }
}
</style>
