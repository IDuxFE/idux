<template>
  <div style="width: 280px">
    <IxText copyable :ellipsis="{ rows: 2, expandable: true }">
      @idux 是一套企业级中后台 UI 组件库, 致力于提供高效愉悦的开发体验。 基于 Vue 3.x + TypeScript 开发,
      全部代码开源并遵循 MIT 协议，任何企业、组织及个人均可免费使用。
      <template #expandIcon="{ expanded }">
        {{ expanded ? '收起' : '更多' }}
      </template>
    </IxText>
  </div>
</template>
