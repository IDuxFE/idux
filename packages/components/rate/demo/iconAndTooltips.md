---
order: 2
title:
  zh: 自定义icon和tooltips
  en: customize icon and tooltips
---

## zh

- 可以自定义icon，icon名称见 icon 组件
- 自定义每一个元素悬浮展示的信息

## demo

```html
<template>
  <ix-rate v-model:value="value" :icon="icon" :tooltips="tooltip"  />
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
 setup(){
    const value = ref(3);
    const icon = 'smile'
    const tooltip = ['很差', '差', '一般', '不错', '很好'];

    return {
      value,
      icon,
      tooltip
    }
  }
})

</script>
```
