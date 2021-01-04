<template>
  <div>
    <ix-spin :icon="icon">
      <div class="content">content</div>
    </ix-spin>
    <div class="operation-area">
      <span class="status-text">icon: {{ icon }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const icon = ref('up')

    return {
      icon,
    }
  },
})
</script>
<style lang="less" scoped>
.content {
  text-align: center;
  padding: 30px;
  background: #6e8ef1;
}

.operation-area {
  margin-top: 30px;
  .status-text {
    margin: 10px 0;
    display: block;
  }
}
</style>
