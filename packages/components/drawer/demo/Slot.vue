<template>
  <ix-button @click="showDrawer"> Click me </ix-button>
  <ix-drawer v-model:visible="visible" title="抽屉标题" width="50%">
    <template #title>
      <p>slot自定义标题</p>
    </template>
    <p v-for="i in 100" :key="i">{{ i }}</p>
    <template #footer>
      <div class="footer-btn-wrap">
        <ix-button class="footer-btn" mode="primary" size="small">编辑</ix-button>
        <ix-button class="footer-btn" size="small">删除</ix-button>
      </div>
    </template>
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
<style lang="less" scoped>
.footer-btn-wrap {
  text-align: right;
  .footer-btn {
    margin-left: 8px;
  }
}
</style>
