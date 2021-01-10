<template>
  <div>
    <ix-spin :tip="tip" :tipAlign="tipAlign">
      <div class="content">content</div>
    </ix-spin>
    <div class="operation-area">
      <ix-button mode="primary" @click="changeTipAlign()">切换提示文字排列方式</ix-button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'

export default defineComponent({
  setup() {
    const tipAlignIsHorizontal = ref(true)

    const tip = ref('数据加载中，请等待')
    const tipAlign = computed(() => (tipAlignIsHorizontal.value ? 'horizontal' : 'vertical'))
    const changeTipAlign = () => (tipAlignIsHorizontal.value = !tipAlignIsHorizontal.value)

    return {
      tip,
      tipAlign,
      changeTipAlign,
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
}
</style>
