<template>
  <div ref="returnTop" class="returnBtn">
    <ix-icon name="arrow-up" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const returnTop = ref<HTMLElement | null>(null)

onMounted(() => {
  returnTop.value?.addEventListener('click', () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  })
})
</script>

<style lang="less">
.returnBtn {
  // TODO need less var
  padding: 12px;

  &:hover {
    color: #1c6eff;
  }

  .ix-icon {
    font-size: 16px;
  }
}
</style>
