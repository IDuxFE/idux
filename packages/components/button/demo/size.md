---
order: 5
title:
  zh: 按钮尺寸
---

## zh

按钮共有 3 种尺寸：大、中、下，通过设置 `size` 来使用不同的尺寸，默认为中。

## demo

```html
<template>
  <ix-button @click="changeSize('large')">Large</ix-button>
  <ix-button @click="changeSize('medium')">Medium</ix-button>
  <ix-button @click="changeSize('small')">Small</ix-button>
  <br />
  <ix-button mode="primary" :size="size">Primary</ix-button>
  <ix-button :size="size">Default</ix-button>
  <ix-button mode="dashed" :size="size">Dashed</ix-button>
  <ix-button mode="text" :size="size">Text</ix-button>
  <ix-button mode="link" :size="size" href="https://github.com/IduxFE/components" target="_blank">Link</ix-button>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const size = ref('large')
    const changeSize = (value: string) => {
      size.value = value
    }
    return { size, changeSize }
  },
})
</script>
```
