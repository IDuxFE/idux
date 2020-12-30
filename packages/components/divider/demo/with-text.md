---
order: 2
title: 
  zh: 带文字的分割线
  en: divider with text
---

## zh

分割线中带有文字，可以用 `position` 制定文字的位置。

文字默认位置为 `center`，除此之外你还可以设置为 `left` 和 `center`，同时你还可以通过全局配置修改默认位置。

## demo

```html
<template>
 <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
  <ix-divider>Text</ix-divider>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
  <ix-divider position="left">Left Text</ix-divider>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
 <ix-divider position="right">Right Text</ix-divider>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
</template>
```
