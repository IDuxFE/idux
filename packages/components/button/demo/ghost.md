---
order: 2
title:
  zh: 幽灵按钮
---

## zh

通过设置 `ghost` 将按钮的背景设为透明，通常在有色背景上。

## demo

```html
<template>
<div class="button-ghost-demo">
  <ix-button mode="primary" ghost>Primary</ix-button>
  <ix-button ghost>Default</ix-button>
  <ix-button mode="dashed" ghost>Dashed</ix-button>
  <ix-button danger ghost>Danger</ix-button>
</div>
</template>

<style lang="less" scoped>
.button-ghost-demo {
  background: rgb(200, 200, 200);
  padding: 16px;
}
</style>
```
