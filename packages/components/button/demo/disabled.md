---
order: 3
title:
  zh: 禁用状态
---

## zh

通过设置 `disabled` 将按钮设为禁用状态。

## demo

```html
<template>
  <ix-button mode="primary" disabled>Primary</ix-button>
  <ix-button disabled>Default</ix-button>
  <ix-button mode="dashed" disabled>Dashed</ix-button>
  <ix-button mode="text" disabled>Text</ix-button>
  <ix-button mode="link" disabled href="https://github.com/IduxFE/components" target="_blank">Link</ix-button>
  <br />
  <ix-button :disabled="disabled">Disabled: {{disabled}}</ix-button>
  <ix-button @click="changeDisabled">Change Disabled</ix-button>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const disabled = ref(false)
    const changeDisabled = () => {
      disabled.value = !disabled.value
    }
    return { disabled, changeDisabled }
  },
})
</script>
```
