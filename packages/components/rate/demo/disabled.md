---
order: 3
title:
  zh: 只读模式
  en: disbaled
---

## zh

此时图标被禁用，无法选择

## demo

```html
<template>
  <ix-rate v-model:value="value" disabled  />
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
