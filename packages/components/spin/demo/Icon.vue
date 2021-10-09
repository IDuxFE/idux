<template>
  <div>
    <IxSpin :icon="icon">
      <div class="content">content</div>
    </IxSpin>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const icon = ref('up')

    return {
      icon,
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
</style>
