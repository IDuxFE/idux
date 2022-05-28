<template>
  <div>
    <IxSpin :tip="tip" :size="size">
      <div class="content">content</div>
    </IxSpin>
    <div class="operation-area">
      <IxButton mode="primary" @click="size = 'sm'">small</IxButton>
      <IxButton mode="primary" @click="size = 'md'">medium</IxButton>
      <IxButton mode="primary" @click="size = 'lg'">large</IxButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tip = ref('数据加载中，请等待')
const size = ref('sm')
</script>
<style lang="less" scoped>
.content {
  text-align: center;
  padding: 30px;
  background-color: #ddd;
}

.operation-area {
  margin-top: 30px;
  .ix-button {
    margin-right: 4px;
  }
}
</style>
