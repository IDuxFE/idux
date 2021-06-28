<template>
  <ix-button @click="showDrawer"> Click me </ix-button>
  <ix-drawer v-model:visible="visible" :before-close="handleClose">
    <p>没有标题的抽屉内容</p>
    <p>没有标题的抽屉内容</p>
    <p>没有标题的抽屉内容</p>
  </ix-drawer>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IxMessage } from '@idux/components/message'

export default defineComponent({
  setup() {
    const visible = ref(false)
    const showDrawer = () => {
      visible.value = !visible.value
    }
    const handleClose = (done: () => void) => {
      IxMessage.warning('你点击关闭了抽屉')
      done()
    }
    return { visible, showDrawer, handleClose }
  },
})
</script>
<style lang="less" scoped></style>
