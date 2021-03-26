---
category: cdk
type:
title: ClickOutside
subtitle: 点击外部
cover:
---

为除了特定元素外添加全局点击事件。

## 何时使用

- 如点击浮层外部关闭。

## API

### `v-click-outside`

#### Props

```typescript
interface ClickOutsideOptions {
  exclude: Ref<HTMLElement>[]
  handler: ClickOutsideHandler
}

type ClickOutsideHandler = () => void

type ClickOutsideBinding = ClickOutsideHandler | ClickOutsideOptions
```
