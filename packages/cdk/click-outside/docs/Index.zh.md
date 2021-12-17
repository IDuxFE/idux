---
category: cdk
type:
title: ClickOutside
subtitle: 点击外部
cover:
---

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
