<template>
  <div>
    <ix-button @click="showMask">打开蒙层</ix-button>
    <ix-mask v-show="visible" :mask="true" @click="showMask">
      <p>蒙层遮罩内容</p>
    </ix-mask>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const visible = ref(false)
    const showMask = () => {
      visible.value = !visible.value
    }
    return { visible, showMask }
  },
})
</script>
<style lang="less" scoped></style>
