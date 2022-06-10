---
category: cdk
type: 
order: 0
title: Resize
subtitle: 调整尺寸
---

## API

### CdkResizable

可调整尺寸的组件。

#### ResizableProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `bounds` | 可调整尺寸的边界范围  | `'parent' \| 'window' \| Window \| MaybeElementRef` | `parent` | - | - |
| `disabled` | 是否禁用  | `boolean` | `false` | - | - |
| `handlers` | 定义拖拽手柄的位置  | `ResizableHandlerPlacement[]` | `allHandlerPlacements` | - | - |
| `is` | 可以调整尺寸的元素或者组件 | `string \| Component` | `'div'` | - | - |
| `maxHeight` | 可调整的最大高度  | `number` | `Number.MAX_SAFE_INTEGER` | - | - |
| `maxWidth` | 可调整的最大宽度  | `number` | `Number.MAX_SAFE_INTEGER` | - | - |
| `minHeight` | 可调整的最小高度  | `number` | `8` | - | - |
| `minWidth` | 可调整的最小宽度  | `number` | `8` | - | - |
| `onStart` | 拖拽开始事件  | - | `ResizableEvent` | - | - |
| `onMove` | 拖拽过程中事件  | - | `ResizableEvent` | - | - |
| `onEnd` | 拖拽结束事件  | - | `ResizableEvent` | - | - |

```ts
const allHandlerPlacements = ['top', 'bottom', 'start', 'end', 'topStart', 'topEnd', 'bottomStart', 'bottomEnd'] as const

export type ResizableHandlerPlacement = typeof allHandlerPlacements[number]

export interface ResizePosition {
  width: number
  height: number
  offsetWidth: number
  offsetHeight: number
}

export type ResizableEvent = (position: ResizePosition, evt: PointerEvent) => void
```

### CdkResizableHandler

定义调整手柄及位置。

#### ResizableHandlerProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `placement` | 手柄的位置  | `ResizableHandlerPlacement` | `bottomEnd` | - | 同时也决定了可以调整的方向 |

### CdkResizeObserver

`useResizeObserver` 的组件形式。

#### ResizeObserverProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `disabled` | 是否禁用  | `boolean` | - | - | - |
| `is` | 被观测的元素或者组件 | `string | Component` | `'div'` | - | - |
| `options` | 传递给 `ResizeObserver` 的参数  | - | `ResizeObserverOptions` | - | 参见 [MDN:ResizeObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver/observe) |
| `onResize` | 当元素尺寸改变时的回调  | - | `(entry: ResizeObserverEntry) => void` | - | - |

### useResizeObserver

对 [ResizeObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver) 的进一步封装。

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
