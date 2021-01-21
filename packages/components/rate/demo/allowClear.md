---
order: 4
title:
  zh: 允许取消
  en: allow clear
---

## zh

允许点击已经选择的图标后清除所有选择项

## demo

```html
<template>
  <ix-rate v-model:value="value" allowClear />
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
