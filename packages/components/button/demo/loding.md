---
order: 4
title:
  zh: 加载中状态
---

## zh

通过设置 `loading` 将按钮设为加载中状态, 此时设置的 icon 无效。

## demo

```html
<template>
  <ix-button mode="primary" icon="search" loading>Primary</ix-button>
  <ix-button icon="search" loading>Default</ix-button>
  <ix-button mode="dashed" loading>Dashed</ix-button>
  <ix-button mode="text" loading>Text</ix-button>
  <ix-button mode="link" loading href="https://github.com/IduxFE/components" target="_blank">Link</ix-button>
  <br />
  <ix-button icon="search" :loading="isLoading">Loading: {{isLoading}}</ix-button>
  <ix-button @click="changeLoading">Change Loading</ix-button>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const isLoading = ref(false)
    const changeLoading = () => {
      isLoading.value = !isLoading.value
    }
    return { isLoading, changeLoading }
  },
})
</script>
```
