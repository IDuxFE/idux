<template>
  <ix-button @click="showDrawer"> Click me </ix-button>
  <ix-drawer v-model:visible="visible" title="父级抽屉标题" width="50%">
    <p>父级抽屉内容</p>
    <ix-button @click="showChildrenDrawer"> 打开子抽屉 </ix-button>
    <ix-drawer v-model:visible="chilrenVisible" title="子级抽屉标题">
      <p>子级抽屉内容</p>
      <p>子级抽屉内容</p>
      <p>子级抽屉内容</p>
    </ix-drawer>
  </ix-drawer>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const visible = ref(false)
    const chilrenVisible = ref(false)
    const showDrawer = () => {
      visible.value = !visible.value
    }
    const showChildrenDrawer = () => {
      chilrenVisible.value = !chilrenVisible.value
    }
    return { visible, chilrenVisible, showDrawer, showChildrenDrawer }
  },
})
</script>
<style lang="less" scoped></style>
