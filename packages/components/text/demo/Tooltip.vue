<template>
  <IxRadioGroup v-model:value="tooltip" :dataSource="radios"></IxRadioGroup>
  <div style="width: 280px; margin-top: 16px">
    <IxText ellipsis :tooltip="tooltip">
      @idux是一套企业级中后台UI组件库, 致力于提供高效愉悦的开发体验。
      <template #title>
        @idux是一套企业级中后台UI组件库, 致力于提供高效愉悦的开发体验。
        <br />
        基于 Vue 3.x + TypeScript 开发, 全部代码开源并遵循 MIT 协议，任何企业、组织及个人均可免费使用。
      </template>
    </IxText>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const tooltip = ref(true)

const radios = [
  { key: false, label: '关闭' },
  { key: true, label: '开启' },
  { key: 'native', label: '原生' },
]
</script>
