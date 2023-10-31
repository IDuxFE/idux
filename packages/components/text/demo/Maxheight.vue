<script lang="ts" setup>
const text = Array.from(new Array(80))
  .map(() => '@idux是一套企业级中后台UI组件库, 致力于提供高效愉悦的开发体验。')
  .join()
</script>

<template>
  <div class="demo-text-max-height">
    <IxText :tooltip="false" :ellipsis="{ rows: 4, expandable: true }">
      {{ text }}
      <template #expandIcon="{ expanded }">
        {{ expanded ? '收起' : '展开' }}
      </template>
    </IxText>
  </div>
</template>

<style lang="less">
.demo-text-max-height {
  width: 600px;
  .ix-text-inner {
    display: inline-block;
    max-height: 300px;
    overflow-y: auto;
  }
}
</style>
