<template>
  <IxRadioGroup v-model:value="type">
    <IxRadio value="type1">type1</IxRadio>
    <IxRadio value="type2">type2</IxRadio>
    <IxRadio value="type3">type3</IxRadio>
    <IxRadio value="type4">type4</IxRadio>
  </IxRadioGroup>
  <IxDivider />
  <IxLayout :class="type">
    <IxLayoutHeader>header</IxLayoutHeader>
    <IxLayoutSider>sider</IxLayoutSider>
    <IxLayoutContent>content</IxLayoutContent>
    <IxLayoutFooter>footer</IxLayoutFooter>
  </IxLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const type = ref('type1')
</script>
<style lang="less" scoped>
.ix-layout {
  background-color: @color-blue;
  &.type1 {
    grid-template-areas:
      'header header header'
      'sider-start content sider-end'
      'footer footer footer';
  }
  &.type2 {
    grid-template-areas:
      'sider-start header sider-end'
      'sider-start content sider-end'
      'footer footer footer';
  }
  &.type3 {
    grid-template-areas:
      'header header header'
      'sider-start content sider-end'
      'sider-start footer sider-end';
  }
  &.type4 {
    grid-template-areas:
      'sider-start header sider-end'
      'sider-start content sider-end'
      'sider-start footer sider-end';
  }
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
