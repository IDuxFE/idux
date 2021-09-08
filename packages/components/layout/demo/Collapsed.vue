<template>
  <IxLayout>
    <IxLayoutHeader>header</IxLayoutHeader>
    <IxLayoutSider v-model:collapsed="collapsed" :show-trigger="true">sider</IxLayoutSider>
    <IxLayoutContent> collapsed: {{ collapsed }} </IxLayoutContent>
    <IxLayoutFooter>footer</IxLayoutFooter>
  </IxLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const collapsed = ref(true)
    return {
      collapsed,
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
