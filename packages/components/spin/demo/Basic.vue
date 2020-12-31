<template>
  <div>
    <ix-spin :spinning="spinning">
      <div class="content">content</div>
    </ix-spin>
    <div class="operation-area">
      <ix-button mode="primary" @click="changeSpinning()">切换状态</ix-button>
      <span class="status-text">spinning: {{ spinning }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const spinning = ref(true)

    const changeSpinning = () => (spinning.value = !spinning.value)

    return {
      spinning,
      changeSpinning,
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
