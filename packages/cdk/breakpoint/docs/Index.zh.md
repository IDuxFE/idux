---
category: cdk
type:
title: Breakpoint
subtitle: 断点
single: true
---

提供构建响应式系统的工具, 以响应屏幕尺寸的变化：

## API

### BREAKPOINTS

默认提供的 5 个断点

| 属性 | 说明 |
| --- | --- |
| `xs` | `< 768px` |
| `sm` | `≥ 768px && < 1024px` |
| `md` | `≥ 1024px && < 1280px` |
| `lg` | `≥ 1280px && < 1720px` |
| `xl` | `≥ 1720px` |

### matchMedia

媒体匹配器，主要用于抹平各个浏览器的实现差异, 参数支持：`string`

```ts
const mediaQueryList = matchMedia(BREAKPOINTS.sm);
```

### isMatched

非响应式的断点匹配, 参数支持: `string | string[]`

```ts
const { xs, sm, lg } = BREAKPOINTS
const isXs = isMatched(xs)
const isSmOrLg = isMatched([sm, lg])
```

### useBreakpoints

断点观察者, 响应式的监听断点变化, 参数支持: `string | string[]`

```ts
const { xs, sm } = BREAKPOINTS
const state = useBreakpoints([xs, sm])

watchEffect(() => {
  console.log('matches', state.matches)
  console.log('breakpoints', state.breakpoints)
})
```

### useBreakpointsMatch

对断点观察者的进一步封装，更易于使用。

```ts
const { xs, sm } = BREAKPOINTS
const md = '(min-width: 1024px) and (max-width: 1365.99px)'
const all = 'all'
const state = useBreakpointsMatch({ xs, sm, md, all })

watchEffect(() => {
  console.log('isXs', state.xs)
  console.log('isSm', state.sm)
  console.log('isMd', state.md)
  console.log('isAll', state.all)
})
```

### useScreens

根据默认的 `BREAKPOINTS`，响应式的判断屏幕大小，。

```ts
const state = useScreens()

watchEffect(() => {
  console.log('isXs', state.xs)
  console.log('isSm', state.sm)
})
``
