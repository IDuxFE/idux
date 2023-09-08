<template>
  <div style="width: 280px">
    <IxText copyable :copyTooltip="['快，点一下！', '哈，复制了！']" @copy="onCopy"
      >@idux是一套企业级中后台UI组件库, 致力于提供高效愉悦的开发体验。</IxText
    >
  </div>
</template>

<script lang="ts" setup>
import { useMessage } from '@idux/components/message'

const { success, error } = useMessage()

const onCopy = (copySuccess: boolean) => {
  if (copySuccess) {
    success('复制成功')
  } else {
    error('复制失败')
  }
}
</script>
