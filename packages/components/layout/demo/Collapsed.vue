<template>
  <IxLayout>
    <IxLayoutHeader>Header</IxLayoutHeader>
    <IxLayoutSider v-model:collapsed="collapsed">Sider</IxLayoutSider>
    <IxLayoutContent> <IxButton @click="changeCollapsed">Change Collapsed</IxButton> </IxLayoutContent>
    <IxLayoutFooter>Footer</IxLayoutFooter>
  </IxLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const collapsed = ref(true)

const changeCollapsed = () => {
  collapsed.value = !collapsed.value
}
</script>
