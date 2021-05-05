<template>
  <ix-button @click="showDrawer"> Click me </ix-button>
  <ix-drawer v-model:visible="visible">
    <p>没有标题的抽屉内容</p>
    <p>没有标题的抽屉内容</p>
    <p>没有标题的抽屉内容</p>
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
