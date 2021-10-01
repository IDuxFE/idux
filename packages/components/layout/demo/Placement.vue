<template>
  <IxRadioGroup v-model:value="placement">
    <IxRadio value="start">start</IxRadio>
    <IxRadio value="end">end</IxRadio>
  </IxRadioGroup>
  <IxDivider />
  <IxLayout>
    <IxLayoutHeader>header</IxLayoutHeader>
    <IxLayoutSider :placement="placement">sider</IxLayoutSider>
    <IxLayoutContent>content</IxLayoutContent>
    <IxLayoutFooter>footer</IxLayoutFooter>
  </IxLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const placement = ref('start')
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
