<template>
  <div ref="target" class="drawer-target">
    <p>Render in this</p>
    <IxButton @click="changeVisible"> Open </IxButton>
  </div>

  <IxDrawer v-model:visible="visible" header="Basic Drawer" :target="target" :width="200">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </IxDrawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const target = ref<HTMLDivElement>()
const visible = ref(false)

const changeVisible = () => {
  visible.value = !visible.value
}
</script>

<style scoped lang="less">
.drawer-target {
  position: relative;
  height: 200px;
  padding: 48px;
  overflow: hidden;
  text-align: center;
  background: #fafafa;
  border: 1px solid #ebedf0;
  border-radius: 2px;

  :deep(.ix-drawer-wrapper),
  :deep(.ix-drawer-mask) {
    position: absolute;
  }
}
</style>
