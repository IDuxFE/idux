<template>
  <ix-button @click="showDrawer"> Click me </ix-button>
  <ix-drawer v-model:visible="visible" title="抽屉标题" width="800px" height="90%" offset="5%">
    <p>抽屉内容</p>
  </ix-drawer>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const visible = ref(false)
    const showDrawer = () => {
      visible.value = !visible.value
    }
    return { visible, showDrawer }
  },
})
</script>
<style lang="less" scoped></style>
