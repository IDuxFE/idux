<template>
  <div style="width: 280px">
    <IxText copyable :ellipsis="{ rows: 2, expandable: true }">
      @idux 是一套企业级中后台 UI 组件库, 致力于提供高效愉悦的开发体验。 基于 Vue 3.x + TypeScript 开发,
      全部代码开源并遵循 MIT 协议，任何企业、组织及个人均可免费使用。
      <template #copyIcon="{ copied }">
        <span style="font-size: var(--ix-font-size-sm)">{{ copied ? '成功' : '复制' }}</span>
      </template>
    </IxText>
  </div>
  <br />
  <div style="width: 280px">
    <IxText copyable :ellipsis="{ rows: 2, expandable: true }" :copyIcon="customCopyIcon">
      @idux 是一套企业级中后台 UI 组件库, 致力于提供高效愉悦的开发体验。 基于 Vue 3.x + TypeScript 开发,
      全部代码开源并遵循 MIT 协议，任何企业、组织及个人均可免费使用。
    </IxText>
  </div>
</template>

<script lang="ts" setup>
import type { TextCopyIconRenderer } from '@idux/components/text'

import { h } from 'vue'

const customCopyIcon: TextCopyIconRenderer = ({ copied }) => {
  return h('span', copied ? '成功' : '复制')
}
</script>
