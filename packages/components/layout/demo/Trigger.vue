<template>
  <IxLayout>
    <IxLayoutHeader>header</IxLayoutHeader>
    <IxLayoutSider v-model:collapsed="collapsed">
      <template #trigger>
        <div class="trigger" @click="onClick">trigger</div>
      </template>
    </IxLayoutSider>
    <IxLayoutContent> collapsed: {{ collapsed }} </IxLayoutContent>
    <IxLayoutFooter>footer</IxLayoutFooter>
  </IxLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const collapsed = ref(true)
    const onClick = () => {
      collapsed.value = !collapsed.value
    }
    return {
      collapsed,
      onClick,
    }
  },
})
</script>

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
  .trigger {
    position: absolute;
    top: 50%;
    right: -50px;
  }
}
</style>
