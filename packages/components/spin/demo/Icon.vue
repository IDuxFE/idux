<template>
  <div>
    <ix-spin :icon="icon">
      <div class="content">content</div>
    </ix-spin>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

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
  background: #6e8ef1;
}
</style>
