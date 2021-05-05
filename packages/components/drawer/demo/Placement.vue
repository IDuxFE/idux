<template>
  <ix-radio-group v-model:value="placement">
    <ix-radio value="left">left</ix-radio>
    <ix-radio value="right">right</ix-radio>
    <ix-radio value="top">top</ix-radio>
    <ix-radio value="bottom">bottom</ix-radio>
  </ix-radio-group>
  <ix-button @click="showDrawer"> Click me </ix-button>
  <ix-drawer v-model:visible="visible" title="抽屉标题" :placement="placement">
    <p>上下左右多方向打开抽屉内容</p>
    <p>上下左右多方向打开抽屉内容</p>
    <p>上下左右多方向打开抽屉内容</p>
  </ix-drawer>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const placement = ref('left')
    const visible = ref(false)
    const showDrawer = () => {
      visible.value = !visible.value
    }
    return { placement, visible, showDrawer }
  },
})
</script>
<style lang="less" scoped></style>
