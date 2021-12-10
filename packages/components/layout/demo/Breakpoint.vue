<template>
  <IxLayout>
    <IxLayoutHeader>Header</IxLayoutHeader>
    <IxLayoutSider breakpoint="md" :onCollapse="onCollapse">Sider</IxLayoutSider>
    <IxLayoutContent>Content</IxLayoutContent>
    <IxLayoutFooter>Footer</IxLayoutFooter>
  </IxLayout>
</template>

<script setup lang="ts">
const onCollapse = (collapsed: boolean, type: 'trigger' | 'breakpoint') => {
  console.log('onCollapse', collapsed, type)
}
</script>
