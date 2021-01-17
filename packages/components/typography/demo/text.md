---
order: 2
title:
  zh: 文本组件
  en: Text component
---

## zh

内置不同样式的文本。

## en

Built-in different styles of text.

## demo

```html
<template>
  <span v-typography>Ant Design (default)</span>
  <span v-typography="'secondary'">Ant Design (secondary)</span>
  <span v-typography="'success'">Ant Design (success)</span>
  <span v-typography="'warning'">Ant Design (warning)</span>
  <span v-typography="'error'">Ant Design (error)</span>
  <span v-typography="{disabled: true}">Ant Design (disabled)</span>
  <span v-typography><mark>Ant Design (mark)</mark></span>
  <span v-typography><code>Ant Design (code)</code></span>
  <span v-typography><kbd>Ant Design (keyboard)</kbd></span>
  <span v-typography><u>Ant Design (underline)</u></span>
  <span v-typography><del>Ant Design (delete)</del></span>
  <span v-typography><strong>Ant Design (strong)</strong></span>
  <span v-typography><a href="https://ng.ant.design/" target="_blank">Ant Design (link)</a></span>
</template>

<style scoped>
  span.ix-typography {
    display: block;
  }
  
  span.ix-typography + span.ix-typography {
    margin-top: 8px;
  }
</style>
```
