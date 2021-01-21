---
order: 0
title:
  zh: 基本用法
  en: Basic usage
---

## zh

简单展示，图标默认是 `star`

## demo

```html
<template>
  <ix-rate v-model:value="value" />
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
 setup(){
    const value = ref(3);

    return {
      value,
    }
  }
})

</script>
```
