---
order: 1
title:
  zh: 支持半选
  en: support half selection
---

## zh

可以选择或展示半选（分）

## demo

```html
<template>
  <ix-rate v-model:value="value" allowHalf  />
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
 setup(){
    const value = ref(3.5);

    return {
      value,
    }
  }
})

</script>
```
