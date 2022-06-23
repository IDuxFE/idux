---
category: cdk
type:
order: 0
title: DragDrop
subtitle: 拖放
---

## API

### useDraggable

```ts
/**
 * 让一个元素可以被拖拽
 *
 * @param source 可拖拽的元素
 * @param options 选项
 * @param context 默认挂载window为上下文管理载点
 */
export function useDraggable(
  source: MaybeElementRef,
  options?: DraggableOptions,
  context?: DnDContext,
): { 
  // 当前是否可以放置到目标
  canDrop: ComputedRef<boolean>;
  // 当前是否正在拖拽
  dragging: ComputedRef<boolean>
  // 当前拖动中的位置信息
  position: ComputedRef<DragPosition>;
  //重置拖拽
  reset:()=>void;
  // 取消可拖拽设置
  stop: () => void;
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

export type DnDEvent = (evt: DragEvent, position?: DragPosition) => void

export interface DraggableOptions {
  // 指定元素可拖拽的范围，高级定义请使用useDroppable,同时置此选项为null
  boundary?: BoundaryType
  // 允许元素自由拖放
  free?: boolean
  // 拖拽把手 除此元素外的区域将不再触发拖动
  handler?: MaybeElementRef
  onDragStart?: DnDEvent
  onDrag?: DnDEvent
  onDragEnd?: DnDEvent
}
```

### useDroppable

```ts
/**
 * 将一个元素置为可放置区域
 *
 * @param target 区域元素
 * @param options 选项
 * @param context 默认挂载window为上下文管理载点
 */
export function useDroppable(
  target: MaybeElementRef,
  options?: DroppableOptions,
  context?: DnDContext,
): {
  /**
   * 连接拖拽源和放置目标
   * @param source
   */
  connect: (source: MaybeElementRef) => void
  /**
   * 取消连接拖拽源和放置目标
   */
  stop:()=>void
}

export interface DroppableOptions {
  onDragEnter?: (evt: DragEvent) => void
  onDragOver?: (evt: DragEvent) => void
  onDragLeave?: (evt: DragEvent) => void
  onDrop?: (evt: DragEvent) => void
}
```

### CdkDraggable

#### DraggableProps

| 名称            | 说明        | 类型           | 默认值         | 全局配置 | 备注                           |
|---------------|-----------|--------------|-------------| --- |------------------------------|
| `boundary`    | 指定可拖放区域   | `BoundaryType` | `parent`    | -| 需要使用`useDropabble()`时，请置`null` |
| `disabled`    | 是否禁用      | `boolean`    | -           | -| -                            |
| `free`        | 是否自由拖放    | `boolean`    | -           | -| -                            |
| `is`          | 拖拽的元素或者组件 | `string \| Component` | `'div'`  | -                            |
| `onDragStart` | 拖拽开始事件    | `DnDEvent`   | -           | -        | -                            |
| `onDrag`      | 拖拽过程中事件   | `DnDEvent`   | -           | -        | -                            |
| `onDragEnd`   | 拖拽结束事件    | `DnDEvent`   | -           | -        | -                            |
