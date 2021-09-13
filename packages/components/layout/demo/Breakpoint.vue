<template>
  <IxLayout>
    <IxLayoutHeader>header</IxLayoutHeader>
    <IxLayoutSider breakpoint="md" :onCollapse="onCollapse"> </IxLayoutSider>
    <IxLayoutContent> content </IxLayoutContent>
    <IxLayoutFooter>footer</IxLayoutFooter>
  </IxLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const collapsed = ref(true)
    const onCollapse = (collapsed: boolean, type: 'trigger' | 'breakpoint') => {
      console.log('onCollapse', collapsed, type)
    }

    return {
      collapsed,
      onCollapse,
    }
  },
})
</script>

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
