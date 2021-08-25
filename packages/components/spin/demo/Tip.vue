<template>
  <div>
    <IxSpin :tip="tip" :tipAlign="tipAlign">
      <div class="content">content</div>
    </IxSpin>
    <div class="operation-area">
      <IxButton mode="primary" @click="changeTipAlign()">切换提示文字排列方式</IxButton>
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
}

.operation-area {
  margin-top: 30px;
}
</style>
