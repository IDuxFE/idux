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
}

.operation-area {
  margin-top: 30px;
  .status-text {
    margin: 10px 0;
    display: block;
  }
}
</style>
