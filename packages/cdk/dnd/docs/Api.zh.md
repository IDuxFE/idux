## 组件

### CdkDndSortable

拖拽排序

#### DndSortableProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `tag` | 自定义组件根节点 | `string \| Component \| FunctionalComponent` | - | - | - |
| `strategy` | 拖拽排序策略 | `DndSortableStrategy` | `'list'` | - | - |
| `dataSource` | 拖拽排序数据 | `any[]` | - | - | - |
| `direction` | 拖拽排序列表的方向 | `DndSortableDirection` | `'vertical'` | - | - |
| `preview` | 拖拽元素的预览 | `boolean \| 'native' \| { offset: { x: number; y: number } }` | - | - | `'native'` 为原生的拖拽预览，配置 `true` 可以搭配 `#preview` 插槽进行自定义 |
| `getKey` | 数据项的唯一标识 | `string \| (item) => VKey` | `key` | - | - |
| `childrenKey` | 树形数据的子数据key | `string` | `children` | - | - |
| `treeIndent` | 树的层级间缩进 | `number` | `32` | - |
| `isSticky` | 是否是 `sticky` | `boolean \| ((options: DndSortableIsStickyOptions) => boolean)` | `32` | 配置了 `sticky` 后，即使拖拽离开所有的元素，还是会停留在最后一个拖入的元素 |
| `isTreeItemExpanded` | 树的某个节点是否被展开的判断函数 | `(key: VKey, data: DndSortableData) => void` | - | - |
| `canDrag` | 是否可以拖拽 | `boolean \| ((options: CanDragOptions) => boolean)` | - | - |
| `canDrop` | 是否可以拖拽放置 | `boolean \| ((options: CanDropOptions) => boolean)` | - | - |
| `onDragStart` | 开始拖拽的回调函数 | `((args: DndSortableOnDragStartArgs) => void) \| ((args: DndSortableOnDragStartArgs) => void)[]` | - | - |
| `onDrag` | 拖拽回调函数 | `((args: DndSortableOnDragArgs) => void) \| ((args: DndSortableOnDragArgs) => void)[]` | - | - |
| `onDragEnter` | 目标拖拽进入回调函数 | `((args: DndSortableOnDragEnterArgs) => void) \| ((args: DndSortableOnDragEnterArgs) => void)[]` | - | - |
| `onDragLeave` | 目标拖拽离开回调函数 | `((args: DndSortableOnDragLeaveArgs) => void) \| ((args: DndSortableOnDragLeaveArgs) => void)[]` | - | - |
| `onDrop` | 目标结束回调函数 | `((args: DndSortableOnDropArgs) => void) \| ((args: DndSortableOnDropArgs) => void)[]` | - | - |
| `onSortReorder` | 重新排序的回调函数 | `((reorderInfo: DndSortableReorderInfo) \| ((reorderInfo: DndSortableReorderInfo)[]` | - | - |
| `onSortChange` | 排序后数据变化的回调函数 | `((newDataSource: any[], oldDataSource: any[]) => void) \| ((newDataSource: any[], oldDataSource: any[]) => void)[]` | - | - |

```typescript
type DndSortableStrategy = 'list' | 'tree'
type DndSortableDirection = 'vertical' | 'horizontal'

interface CanDragOptions {
  sourceKey: VKey
  sourceIndex: number | undefined
  sourceData: DndSortableData | undefined
}
interface CanDropOptions extends Omit<CanDragOptions, 'sourceKey'> {
  sourceKey: VKey | undefined
  targetKey: VKey
  targetIndex: number | undefined
  targetData: DndSortableData | undefined
}

interface DndSortableTransferData {
  key: VKey
  listData: DndSortableInnerData
  listDataIndex: number
  direction?: DndSortableDirection
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string | symbol]: any
}

interface BaseDndSortableEventArgs {
  location: DragLocationHistory
  key: VKey
  data: DndSortableData
}
interface DndSortableEvetWithSourceArgs extends BaseDndSortableEventArgs {
  sourceKey: VKey
  sourceData: DndSortableData
}
interface DndSortableOnDragArgs extends BaseDndSortableEventArgs {}
interface DndSortableOnDragStartArgs extends BaseDndSortableEventArgs {}
interface DndSortableOnDragEnterArgs extends DndSortableEvetWithSourceArgs {}
interface DndSortableOnDragLeaveArgs extends DndSortableEvetWithSourceArgs {}
interface DndSortableOnDropArgs extends DndSortableEvetWithSourceArgs {}

interface DndSortableReorderInfo {
  sourceIndex: number
  targetIndex: number
  sourceKey: VKey
  targetKey: VKey
  sourceData: DndSortableData
  targetData: DndSortableData
  operation: 'insertBefore' | 'insertAfter' | 'insertChild'
}
```

#### DndSortableSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 默认插槽 | - | - |
| `preview` | 预览 | `{ key: VKey data: DndSortableData \| undefined index: number \| undefined container: HTMLElement }` | - |

### CdkDndSortableItem

用来绑定拖拽排序的内部元素

#### DndSortableItemProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `itemKey` | 对应的数据key | `string \| number \| symbol` | - | - | - |
| `direction` | 可以独立设置某个元素的方向 | `DndSortableDirection` | - | - | - |
| `isSticky` | 是否是 `sticky` | `boolean \| ((options: DndSortableIsStickyOptions) => boolean)` | `32` | 配置了 `sticky` 后，即使拖拽离开所有的元素，还是会停留在最后一个拖入的元素 |
| `canDrag` | 是否可以拖拽 | `boolean \| ((options: CanDragOptions) => boolean)` | - | - |
| `canDrop` | 是否可以拖拽放置 | `boolean \| ((options: CanDropOptions) => boolean)` | - | - |
| `onDragStart` | 开始拖拽的回调函数 | `((args: DndSortableOnDragStartArgs) => void) \| ((args: DndSortableOnDragStartArgs) => void)[]` | - | - |
| `onDrag` | 拖拽回调函数 | `((args: DndSortableOnDragArgs) => void) \| ((args: DndSortableOnDragArgs) => void)[]` | - | - |
| `onDragEnter` | 目标元素拖拽进入回调函数 | `((args: DndSortableOnDragEnterArgs) => void) \| ((args: DndSortableOnDragEnterArgs) => void)[]` | - | - |
| `onDragLeave` | 目标元素拖拽离开回调函数 | `((args: DndSortableOnDragLeaveArgs) => void) \| ((args: DndSortableOnDragLeaveArgs) => void)[]` | - | - |
| `onDrop` | 拖拽结束回调函数 | `((args: DndSortableOnDropArgs) => void) \| ((args: DndSortableOnDropArgs) => void)[]` | - | - |

#### DndSortableItemSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 默认插槽 | - | - |

### CdkDndSortableHandle

用来绑定拖拽排序元素的把手

### CdkDndMovable

拖拽移动

#### DndMovableProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `tag` | 自定义组件根节点 | `string \| Component \| FunctionalComponent` | `'div'` | - | - |
| `allowedAxis` | 可以拖拽移动的方向 | `'horizontal' \| 'vertical' \| 'all'` | `'all'` | - | - |
| `mode` | 拖拽移动模式 | `'immediate' \| 'afterDrop'` | `'afterDrop'` | - | `'immediate'` 模式下，会随着拖拽实时改变元素位置，`'afterDrop'`则会在拖拽结束改变 |
| `strategy` | 拖拽移动策略 | `'fixed' \| 'absolute' \| 'transform'` | `'transform'` | - | 使用哪种方式设置元素位置 |
| `preview` | 拖拽元素的预览 | `boolean \| 'native' \| { offset: { x: number; y: number } }` | - | - |
| `canDrag` | 是否可以拖拽 | `boolean` | `true` | - |
| `dragHandle` | 设置拖拽的把手 | `HTMLElement \| undefined` | - | 设置把手之后仅可以通过把手拖拽，也可以使用 `CdkDndMovableHandle` 组件自定义 |
| `dropTargets` | 设置可以拖入的目标元素 | `(HTMLElement \| undefined)[]` | - | 仅在 `afterDrop` 模式下可用 |
| `boundary` | 设置可以拖拽的边界 | `'parent' \| 'viewport' \| HTMLElement \| undefined` | - | - |
| `onDragStart` | 开始拖拽的回调函数 | `((args: ElementEventBasePayload) => void) \| ((args: ElementEventBasePayload) => void)[]` | - | - |
| `onDrag` | 拖拽回调函数 | `((args: ElementEventBasePayload) => void) \| ((args: ElementEventBasePayload) => void)[]` | - | - |
| `onDragEnter` | 目标拖拽进入回调函数 | `((args: ElementDropTargetEventBasePayload) => void) \| ((args: ElementDropTargetEventBasePayload) => void)[]` | - | - |
| `onDragLeave` | 目标拖拽离开回调函数 | `((args: ElementDropTargetEventBasePayload) => void) \| ((args: ElementDropTargetEventBasePayload) => void)[]` | - | - |
| `onDrop` | 拖拽结束回调函数 | `((args: DndSortableOnDropArgs) => void) \| ((args: DndSortableOnDropArgs) => void)[]` | - | - |
| `onDropOfTarget` | 目标元素拖拽放入回调函数 | `((args: ElementDropTargetEventBasePayload) => void) \| ((args: ElementDropTargetEventBasePayload) => void)[]` | - | - |

#### DndMovableSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 默认插槽 | - | - |
| `preview` | 预览 | `{ container: HTMLElement }` | - |

#### DndMovableMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `init` | 重新初始化位置 | - | - |

### CdkDndMovableHandle

用来绑定拖拽移动元素的把手

## 组合式API

### useDndContext

创建一个拖拽监听上下文

```ts
function useDndContext(options?: DndOptions): DndContext

interface DndOptions {
  monitor?: MonitorOptions | boolean
  onDrag?: MonitorOptions['onDrag']
  onDragOfTarget?: DropTargetOptions['onDrag']
  onDragStart?: MonitorOptions['onDragStart']
  onDragEnter?: DropTargetOptions['onDragEnter']
  onDragLeave?: DropTargetOptions['onDragLeave']
  onDrop?: MonitorOptions['onDrop']
  onDropOfTarget?: DropTargetOptions['onDrop']
}

interface DndContext {
  registerDraggable: (options: DraggableOptions) => () => void
  registerDropTarget: (options: DropTargetOptions) => () => void
}
```

详细参数类型请参考 [pragmatic-drag-and-drop](https://atlassian.design/components/pragmatic-drag-and-drop/about)

### useDndSortable

创建拖拽排序上下文

```ts
function useDndSortable(options: DndSortableOptions): DndSortableContext

interface DndSortableOptions<C extends keyof V = never, V extends object = Record<string, unknown>> {
  dataSource: Ref<DndSortableData<C, V>[]>
  direction?: Ref<DndSortableDirection>
  childrenKey?: string | Ref<string | undefined>
  treeIndent?: number | Ref<number | undefined>
  getKey?: Ref<GetKey | string | undefined>
  preview?: Ref<DndSortablePreviewOptions | undefined>
  strategy?: DndSortableStrategy | Ref<DndSortableStrategy | undefined>
  canDrag?: (options: CanDragOptions) => boolean | undefined
  canDrop?: (options: CanDropOptions) => boolean | undefined
  isSticky?: (options: DndSortableIsStickyOptions) => boolean | undefined
  isTreeItemExpanded?: (key: VKey, data: DndSortableData<C, V>) => void

  onDragStart?: (args: DndSortableOnDragStartArgs) => void
  onDrag?: (args: DndSortableOnDragArgs) => void
  onDragEnter?: (args: DndSortableOnDragEnterArgs) => void
  onDragLeave?: (args: DndSortableOnDragLeaveArgs) => void
  onDrop?: (args: DndSortableOnDropArgs) => void
  onSortReorder?: (info: DndSortableReorderInfo) => void
  onSortChange?: (newDataSource: DndSortableData[], oldDataSource: DndSortableData[]) => void
}

interface DndSortableContext {
  registerDraggable: (options: DndSortableDraggableOptions) => () => void // 注册可拖拽的元素
  registerDropTarget: (options: DndSortableDropTargetOptions) => () => void // 注册可拖拽放入的元素
  draggingOverState: ComputedRef<DndSortableDraggingOverState | null>
  draggingState: ComputedRef<DndSortableDraggingState | null>
}

type DndSortableDraggableOptions = Omit<DraggableOptions, 'canDrag'> & {
  key: VKey
  preview?: DndSortablePreviewOptions
  canDrag?: (args: ElementGetFeedbackArgs & CanDragOptions) => boolean | undefined
}

type DndSortableDropTargetOptions = Omit<DropTargetOptions, 'canDrop'> & {
  key: VKey
  direction?: DndSortableDirection
  canDrop?: (args: ElementDropTargetGetFeedbackArgs & CanDropOptions) => boolean | undefined
  isSticky?: (options: DndSortableIsStickyOptions) => boolean | undefined
}

type DndSortablePreviewOptions =
  | boolean
  | {
      offset?: { x: number; y: number }
      mount?: (state: DndSortablePreviewState) => void
      unmount?: (state: DndSortablePreviewState) => void
    }
```

### useDndMovable

拖拽移动元素

```ts
function useDndMovable(options: DndMovableOptions): DndMovableContext

interface DndMovableOptions extends Omit<DndOptions, 'monitor'> {
  mode?: MaybeRef<DndMovableMode | undefined>
  strategy?: MaybeRef<DndMovableStrategy | undefined>
  canDrag?: MaybeRef<boolean | undefined>
  draggableElement: MaybeElementRef
  dropTargets?: MaybeRef<MaybeElement[] | undefined>
  boundary?: MaybeRef<DndMovableBoundaryType | undefined>
  dragHandle?: MaybeElementRef
  allowedAxis?: MaybeRef<Axis>
  preview?: MaybeRef<DndMovablePreviewOptions>
}

interface DndMovableContext {
  init: () => void
  position: ComputedRef<Position>
  offset: ComputedRef<Position>
}

interface Position {
  x: number
  y: number
}

type DndMovablePreviewOptions =
  | boolean
  | {
      offset?: { x: number; y: number }
      mount?: (args: { container: HTMLElement }) => void
      unmount?: (args: { container: HTMLElement }) => void
    }
```

### useDndAutoScroll

绑定某个滚动容器，使拖拽的元素可以移动到边界时自动滚动

```ts
function useDndAutoScroll(
  elementRef: Ref<HTMLElement | undefined>,
  options?: AutoScrollOptions | Ref<AutoScrollOptions>,
): void

interface AutoScrollOptions {
  canScroll: boolean
  maxScrollSpeed?: 'standard' | 'fast'
  allowedAxis?: 'horizontal' \| 'vertical' \| 'all'
}
```
