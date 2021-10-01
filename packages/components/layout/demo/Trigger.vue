<template>
  <IxLayout>
    <IxLayoutHeader>header</IxLayoutHeader>
    <IxLayoutSider v-model:collapsed="collapsed" :show-trigger="true">
      <template #trigger>
        <IxButton class="trigger" :icon="iconName" shape="circle" @click="onClick"></IxButton>
      </template>
    </IxLayoutSider>
    <IxLayoutContent> collapsed: {{ collapsed }} </IxLayoutContent>
    <IxLayoutFooter>footer</IxLayoutFooter>
  </IxLayout>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

export default defineComponent({
  setup() {
    const collapsed = ref(true)
    const onClick = () => {
      collapsed.value = !collapsed.value
    }
    const iconName = computed(() => {
      return collapsed.value ? 'right' : 'left'
    })
    return {
      iconName,
      collapsed,
      onClick,
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
  .trigger {
    position: absolute;
    top: 50%;
    right: -15px;
  }
}
</style>
