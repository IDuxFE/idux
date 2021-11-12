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

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const tip = ref('数据加载中，请等待')
    const size = ref('sm')

    return {
      tip,
      size,
    }
  },
})
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
