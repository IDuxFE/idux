---
category: cdk
type:
title: Breakpoint
subtitle: 断点
cover:
---

提供构建响应式系统的工具, 以响应屏幕尺寸的变化：

## API

### Breakpoints

默认提供的 5 个断点

| 属性 | 说明 |
| --- | --- |
| `XSmall` | `< 768px` |
| `Small` | `≥ 768px && < 1024px` |
| `Medium` | `≥ 1024px && < 1280px` |
| `Large` | `≥ 1280px && < 1720px` |
| `XLarge` | `≥ 1720px` |

### isMatchedBreakpoint

非响应式的断点匹配, 参数支持: `string | string[]`

```ts
const { Small, Small } = Breakpoints
const isXSmallScreen = isMatchedBreakpoint(Small)
const isSmallOrLarge = isMatchedBreakpoint([XSmall, Small])
```

### observeBreakpoint

断点观察者, 响应式的监听断点变化, 参数支持: `string | string[]`

```ts
const { Small, Small } = Breakpoints
const layoutChanges = observeBreakpoint([XSmall, Small])

watchEffect(() => {
  console.log('breakpoints', layoutChanges.value.breakpoints)
  console.log('matches', layoutChanges.value.matches)
})
```

### cleanObservables

用于清空断点观察者的缓存

```ts
cleanObservables()
```

### matchMedia

媒体匹配器，主要用于磨皮各个浏览器的实现差异, 参数支持：`string`

```ts
const mediaQueryList = mediaMatcher.matchMedia(Breakpoints.Small);
```
