---
category: cdk
title: ClickOutside
subtitle: 点击外部
cover:
---

`@idux/cdk/click-outside` 提供了一个为除了特定元素外添加全局点击事件的指令。

## 使用场景

- 点击浮层外部关闭浮层。
- 点击下拉框外部关闭下拉框。

## API

### ClickOutside

#### ClickOutsideOptions

```typescript
interface ClickOutsideOptions {
  exclude: Ref<HTMLElement>[]
  handler: ClickOutsideHandler
}

type ClickOutsideHandler = () => void

type ClickOutsideBinding = ClickOutsideHandler | ClickOutsideOptions
```
