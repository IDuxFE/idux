<template>
  <div>
    <ix-spin :tip="tip" :size="size">
      <div class="content">content</div>
    </ix-spin>
    <div class="operation-area">
      <ix-button mode="primary" @click="size = 'small'">small</ix-button>
      <ix-button mode="primary" @click="size = 'medium'">medium</ix-button>
      <ix-button mode="primary" @click="size = 'large'">large</ix-button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const tip = ref('数据加载中，请等待')
    const size = ref('small')

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
  background: #6e8ef1;
}

.operation-area {
  margin-top: 30px;
  .ix-button {
    margin-right: 4px;
  }
}
</style>
