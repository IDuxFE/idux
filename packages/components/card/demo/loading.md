---
order: 0
title:
  zh: 典型卡片
  en: basic card
---

## zh
包含标题、内容、操作区域。
可通过设置size为small,medium,或者large，控制尺寸
## demo

```html
<template>
  <ix-card title="default size card" loading="true">
    <template v-slot:extra>
      <a href="#">More</a>
    </template>
    <p>card content</p>
    <p>card content</p>
  </ix-card>
</template>
```
