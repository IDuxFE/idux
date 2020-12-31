<template>
  <div>
    <ix-spin :tip="tip" :tipAlign="tipAlign" :size="size">
      <div class="content">content</div>
    </ix-spin>
    <div class="operation-area">
      <ix-button mode="primary" @click="size = 'small'">small</ix-button>
      <ix-button mode="primary" @click="size = 'medium'">medium</ix-button>
      <ix-button mode="primary" @click="size = 'large'">large</ix-button>
      <span class="status-text">size: {{ size }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'

export default defineComponent({
  setup() {
    let tipAlignIsHorizontal = ref(true)

    const tip = ref('数据加载中，请等待')
    const tipAlign = computed(() => (tipAlignIsHorizontal.value ? 'horizontal' : 'vertical'))
    const size = ref('small')

    return {
      tip,
      tipAlign,
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
  .status-text {
    margin: 10px 0;
    display: block;
  }
  /deep/.ix-button {
    margin-right: 4px;
  }
}
</style>
