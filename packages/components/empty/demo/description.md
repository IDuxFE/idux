---
order: 0
title:
  zh: 自定义
  en: Customized
---

## zh

- 通过设置 `image` 来自定义图片。
- 通过设置 `description` 来自定义描述内容, 支持 `v-slot:description`, 如果需要隐藏描述, 传入一个空字符串即可。
- 通过设置 `v-slot:default` 来自定义描述内容。

## demo

```html
<template>
  <ix-empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    description="Customize Description"
  >
    <ix-button mode="primary">Create Now</ix-button>
  </ix-empty>
  <ix-divider />
  <ix-empty>
    <template #description>
      <span>Customize <a href="#API">Description</a></span>
    </template>
  </ix-empty>
  <ix-divider />
  <ix-empty description=""></ix-empty>
</template>
```
