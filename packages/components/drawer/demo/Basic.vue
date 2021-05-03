<template>
  <div>
    <ix-button @click="showDrawer">打开抽屉</ix-button>
    <ix-drawer :visible="visible" title="标题" footer="底部内容">
      <template #title>
        <p>slot标题</p>
      </template>
      <p v-for="i in 10" :key="i">{{ i }}</p>
      <template #footer>
        <div class="footer-btn-wrap">
          <ix-button class="footer-btn" mode="primary">编辑</ix-button>
          <ix-button class="footer-btn">删除</ix-button>
        </div>
      </template>
    </ix-drawer>
  </div>
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
<style lang="less" scoped>
.footer-btn-wrap {
  text-align: right;
  .footer-btn {
    margin-left: 8px;
  }
}
</style>
