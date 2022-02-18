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

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const icon = ref('up')
    const rotate = ref(true)

    const changeRotate = () => {
      rotate.value = !rotate.value
    }

    return {
      icon,
      rotate,
      changeRotate,
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
  .status-text {
    margin: 10px 0;
    display: block;
  }
}
</style>
