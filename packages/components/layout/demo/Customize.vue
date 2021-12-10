<template>
  <IxRadioGroup v-model:value="type">
    <IxRadio value="type1">type1</IxRadio>
    <IxRadio value="type2">type2</IxRadio>
    <IxRadio value="type3">type3</IxRadio>
  </IxRadioGroup>
  <IxDivider />
  <IxLayout :class="type">
    <IxLayoutHeader>Header</IxLayoutHeader>
    <IxLayoutSider>Sider</IxLayoutSider>
    <IxLayoutContent>Content</IxLayoutContent>
    <IxLayoutFooter>Footer</IxLayoutFooter>
  </IxLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const type = ref('type1')
</script>

<style lang="less" scoped>
.ix-layout {
  &.type1 {
    grid-template-areas:
      'header header header'
      'sider content content'
      'footer footer footer';
  }
  &.type2 {
    grid-template-areas:
      'header header header'
      'content content sider'
      'footer footer footer';
  }
  &.type3 {
    grid-template-areas:
      'sider header header'
      'sider content content'
      'sider footer footer';
  }
}
</style>
