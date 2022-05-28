<template>
  <div>
    <IxSpin :icon="icon" :rotate="rotate">
      <div class="content">content</div>
    </IxSpin>
    <div class="operation-area">
      <IxButton mode="primary" @click="changeRotate()">change rotate</IxButton>
      <span class="status-text">rotate: {{ rotate }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const icon = ref('up')
const rotate = ref(true)

const changeRotate = () => {
  rotate.value = !rotate.value
}
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
