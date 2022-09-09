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
    reset: () => void;
    // 取消可拖拽设置
    stop: () => void;
  }

export interface DraggableOptions {
  /**
   * 作为限制拖拽范围的元素，需自定义droppable时需指定为空
   */
  boundary?: BoundaryType
  /**
   * 指定是否可以拖拽
   */
  free?: boolean
  /**
   * 拖拽把手
   */
  handle?: MaybeElementRef

  /**
   * 拖拽底层实现
   * * `native`: using html5 drag-drop api
   * * `pointer`: using mouse/touch position to simulate
   */
  backend?: DnDBackendType

  onDragStart?: DnDEvent
  onDrag?: DnDEvent
  onDragEnd?: DnDEvent
}

export interface DnDPosition {
  x: number
  y: number
}

export type DnDEvent = (evt: DragEvent, position?: DragPosition) => void

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
    stop: () => void
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

| 名称            | 说明        | 类型             | 默认值        | 全局配置     | 备注                           |
|---------------|-----------|----------------|------------|----------|------------------------------|
| `backend`     | 拖拽底层实现       | `native` \| `pointer`  | `native` |      | *`native`: 基于HTML5 drag-drop 原生api封装<br>*`pointer`: 用于支持触摸屏及鼠标事件模拟实现的拖拽                              |
| `boundary`    | 指定可拖放区域   | `BoundaryType` | `parent`   | -        | 需要使用`useDropabble()`时，请置`null` |
| `disabled`    | 是否禁用      | `boolean`      | -          | -        | -                            |
| `free`        | 是否自由拖放    | `boolean`      | -          | -        | -                            |
| `is`          | 拖拽的元素或者组件 | `string \| Component` | `'div'`  | -                            |
| `onDragStart` | 拖拽开始事件    | `DnDEvent`     | -          | -        | -                            |
| `onDrag`      | 拖拽过程中事件   | `DnDEvent`     | -          | -        | -                            |
| `onDragEnd`   | 拖拽结束事件    | `DnDEvent`     | -          | -        | -                            |
