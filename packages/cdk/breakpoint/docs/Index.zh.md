---
category: cdk
title: Breakpoint
subtitle: 断点
---

## API

### useBreakpoints

断点观察者, 响应式的监听断点变化, 如果不传参数，会使用默认断点。

```ts
export function useBreakpoints(): Record<BreakpointKey, boolean>
export function useBreakpoints<T extends string>(value: Record<T, string>): Record<T, boolean>
```

### useSharedBreakpoints

通过 `createSharedComposable` 创建的全局共享的 `useBreakpoints`。

```ts
export const useSharedBreakpoints: () => Record<BreakpointKey, boolean>
```

### useMediaQuery

媒体匹配观察者, 每当匹配结果发生变化，就会返回一个新的计算结果。

```ts
export function useMediaQuery(value: string | string[]): ComputedRef<MediaQueryState>
```

### isMediaMatched

非响应式的媒体匹配。

```ts
export function isMediaMatched(value: string | string[]): boolean
```

### matchMedia

媒体匹配器，主要用于抹平各个浏览器的实现差异

```ts
export const matchMedia: (query: string) => MediaQueryList
```
