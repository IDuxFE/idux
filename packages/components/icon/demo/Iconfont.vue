<template>
  <IxIcon iconfont name="icon-tuichu" />
  <IxIcon iconfont name="icon-facebook" />
  <IxIcon iconfont name="icon-twitter" rotate />
</template>

<script setup lang="ts">
import { fetchIconFormScript } from '@idux/components/icon'

fetchIconFormScript('https://at.alicdn.com/t/font_8d5l8fzk5b87iudi.js')
</script>

<style scoped lang="less">
.ix-icon {
  margin-right: 12px;
  font-size: 24px;
}
</style>
