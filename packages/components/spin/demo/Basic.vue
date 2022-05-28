<template>
  <div>
    <IxSpin :spinning="spinning">
      <div class="content">content</div>
    </IxSpin>
    <div class="operation-area">
      <IxButton mode="primary" @click="changeSpinning()">切换状态</IxButton>
      <span class="status-text">spinning: {{ spinning }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const spinning = ref(true)
const changeSpinning = () => (spinning.value = !spinning.value)
</script>
<style lang="less" scoped>
.content {
  text-align: center;
  padding: 30px;
  background-color: #ddd;
}

.operation-area {
  margin-top: 30px;
  .status-text {
    margin: 10px 0;
    display: block;
  }
}
</style>
