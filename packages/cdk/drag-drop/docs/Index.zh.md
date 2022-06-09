---
category: cdk
type: 
order: 0
title: DragDrop
subtitle: 拖拽
---

## API

### useDraggable

```ts
/**
 * 使一个元素可以被拖拽
 * 
 * @param target 目标元素，可以是一个 Ref 或 组件实例
 * @param options 拖拽的配置
 * @returns 返回一个用于停止监听的函数, 和当前的拖拽状态
 */
export function useDraggable(
  target: MaybeElementRef,
  options: DraggableOptions,
): {
  dragging: ComputedRef<boolean>
  position: ComputedRef<DragPosition>
  stop: () => void
}

export interface DragPosition {
  // 元素当前的 left 位置
  left: number
  // 元素当前的 top 位置
  top: number
  // 元素被拖拽后水平偏移量
  offsetX: number
  // 元素被拖拽后垂直偏移量
  offsetY: number
}

export type DraggableEvent = (position: DragPosition, evt: PointerEvent) => void

export interface DraggableOptions {
  onStart?: DraggableEvent
  onMove?: DraggableEvent
  onEnd?: DraggableEvent
}

```

### CdkDraggable

#### DraggableProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `disabled` | 是否禁用  | `boolean` | - | - | - |
| `is` | 拖拽的元素或者组件 | `string | Component` | `'div'` | - | - |
| `onStart` | 拖拽开始事件  | - | `DraggableEvent` | - | - |
| `onMove` | 拖拽过程中事件  | - | `DraggableEvent` | - | - |
| `onEnd` | 拖拽结束事件  | - | `DraggableEvent` | - | - |
