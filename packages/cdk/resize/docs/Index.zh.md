---
category: cdk
type: 
order: 0
title: Resize
subtitle: 调整尺寸
---

对 [ResizeObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver) 的进一步封装。

## API

### useResizeObserver

```ts
/**
 * 观察元素尺寸的变化
 * 
 * @param target 目标元素，可以是一个 Ref 或 组件实例
 * @param listener 尺寸变化后的回调
 * @param options 传递给 `ResizeObserver` 的参数
 * @returns 返回一个用于停止监听的函数
 */
export function useResizeObserver(
  target: MaybeElementRef,
  listener: ResizeListener,
  options?: ResizeObserverOptions,
): () => void
```

### CdkResizeObserver

#### ResizeObserverProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `disabled` | 是否禁用  | `boolean` | - | - | - |
| `is` | 被观测的元素或者组件 | `string | Component` | `'div'` | - | - |
| `options` | 传递给 `ResizeObserver` 的参数  | - | `ResizeObserverOptions` | - | 参见 [MDN:ResizeObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver/observe) |
| `onResize` | 当元素尺寸改变时的回调  | - | `(entry: ResizeObserverEntry) => void` | - | - |

### onResize

```ts
/**
 * 监听元素尺寸的变化
 * 
 * @param el 目标元素
 * @param listener 尺寸变化后的回调
 * @param options 传递给 `ResizeObserver` 的参数
 * @returns
 */
export function onResize(
  el: Element | null | undefined,
  listener: ResizeListener | undefined,
  options?: ResizeObserverOptions,
): void
```

### offResize

```ts
/**
 * 取消监听元素尺寸的变化
 * 
 * @param el 目标元素
 * @param listener 尺寸变化后的回调
 * @returns
 */
export function offResize(
  el: Element | null | undefined,
  listener: ResizeListener | undefined,
): void
```
