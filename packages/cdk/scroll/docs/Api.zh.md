
### CdkVirtualScroll

虚拟滚动：

- 通过仅渲染那些屏幕上可见的条目，来高效的显示大型列表。
- 数据量过多时，用于提升页面渲染性能。

#### VirtualScrollProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `contentRender` | 自定义列表的容器节点 | `VirtualContentRenderFn \| #content={children}` | - | - | - |
| `dataSource` | 需要渲染的数据列表 | `Array` | `[]` | - | - |
| `getKey` | 列表项的唯一标识 | `string \| (item) => VKey` | `key` | - | - |
| `height` | 列表的高度 | `number \| 'auto' \| '100%'` | `0` | - | 设置为大于 0 时才可以启用虚拟滚动 |
| `fullHeight` | 是否永远使用 `height` 作为容器高度 | `boolean` | `false` | - | 仅在不符合虚拟滚动条件时生效 |
| `width` | 列表的宽度 | `number \| 100%` | `0` | - | 设置为大于 0 时才可以启用虚拟滚动 |
| `fullHeight` | 是否永远使用 `width` 作为容器的宽度 | `boolean` | `false` | - | 仅在不符合虚拟滚动条件时生效 |
| `rowHeight` | 默认列表行的高度 | `number` | `0` | - | 设置为大于 0 时才可以启用虚拟滚动 |
| `colWidth` | 默认列表列的宽度 | `number` | `0` | - | 设置为大于 0 时才可以启用虚拟滚动 |
| `getRowHeight` | 列表行的高度获取函数 | `(rowKey: VKey) => number \| undefined` | - | - | 在行高不固定的场景下尽可能减少抖动 |
| `getColWidth` | 列表列的宽度获取函数 | `(rowKey: VKey, colWidth: VKey) => number \| undefined` | - | - | 在列宽不固定的场景下尽可能减少抖动 |
| `rowRender` | 列表行的渲染函数 | `VirtualRowRenderFn \| #row={item, index}` | - | - | 必须设置或者提供 `row` 插槽 |
| `colRender` | 列表列的渲染函数 | `VirtualColRenderFn \| #col={row, item, index}` | - | - | 必须设置或者提供 `col` 插槽 |
| `scrollMode` | 使用的滚动模式，支持原生滚动和模拟滚动 | `'native' \| 'simulated'` | `'native'` | - | - |
| `virtual` | 是否启用虚拟滚动 | `boolean \| VirtualScrollEnabled` | `{ horizontal: true, vertical: false }` | - | - |
| `buffer` | 缓冲区大小 | `numnber` | `0` | - | - |
| `bufferOffset` | 在距离数据边界有几项时开始渲染下一屏数据 | `numnber` | `0` | - | - |
| `isStrictGrid` | 是否是严格的栅格 | `boolean` | `true` | - | 严格的栅格指行列之前是对齐的，即上一行的某列和下一行的这一列一定是对齐的 |
| `onScroll` | 滚动事件 | `(evt: Event) => void` | - | - | - |
| `onScrolledChange` | 滚动的位置发生变化 | `(startIndex: number, endIndex: number, visibleData: any[]) => void` | - | - | - |
| `onScrolledBottom` | 滚动到底部时触发 | `() => void` | - | - | - |

```ts
type VirtualRowRenderFn<Row = any> = (option: { item: Row; index: number; children?: VNode[] }) => VNodeChild

type VirtualColRenderFn<Row = any, Col = any> = (option: { row: Row; item: Col; index: number }) => VNodeChild

type VirtualContentRenderFn = (children: VNode[]) => VNodeChild

type VirtualScrollEnabled = { horizontal: boolean; vertical: boolean }
```

#### VirtualScrollMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `scrollTo` | 手动设置滚动条位置 | `(value?: number \| VirtualScrollToOptions) => void` | 支持滚动到具体的 key 或者 index, 以及设置偏移量 |

### FAQ

#### 如何开启横向虚拟滚动

##### 设置virtual

设置 `virtual` 为 `true` 或者 `{ horizontal: true }`

##### 调整数据结构

由于所有的行和列必须都有key来优化渲染，因此数据不可以只是一个二维数组，需要是以下的数据结构组成的数组：

```ts
interface RowData {
  [key: string]: any
  data: unknown[]
}
```

其中 `RowData` 是行数据，其中的 `data` 是列数据

##### 根据实际情况设置 `isStrictGrid`

我们允许每一行的列都是独立的宽度，即每一行的列数和列宽是不一样的，但这样会极大增加计算复杂度。

因此，在每行的列都对齐，即每行的列都一样宽的情况下，只需要计算一行即可，在 `isStrictGrid` 为 `true` 时，会采取这种计算策略。

##### 根据渲染复杂度确定是否开启 `buffer` 和 `bufferOffset`

在开启了 `buffer` 后，会在当前窗口可渲染的行列基础上，再多渲染一些数据来缓解渲染频率过高的问题，但这在数据的渲染过于复杂的情况下并不适用，因为单次渲染的节点会增加，从而会导致渲染卡顿。

`bufferOffset` 的意义，是在滚动到距离所有渲染的项目边界还有几项时就提前渲染下一屏的数据，它可以一定程度上让滚动更加顺滑，但是也增加了渲染频率。

#### 虚拟滚动组件在滚动比较快的时候出现短暂白屏如何处理？

由于虚拟滚动默认使用原生滚动来实现，而原生滚动触发的渲染总是会在虚拟滚动内部计算和渲染之前，因此当滚动过快或者内部元素渲染的复杂度太高时，不可避免会出现短暂的白屏。

优化方式有以下几种：

1. 当内部的渲染可优化的空间很大，且短暂的白屏区域并不会影响用户体验时，建议保留原生滚动，对渲染过程进行优化，减少dom节点数，将不必要的计算提前，复用重复的组件等。

2. 当以上无法解决痛点时，可以将 `scrollMode` 配置为 `simulated` 开启模拟滚动，这种滚动方式会在滚动发生之后首先通知组件进行计算并准备下一步的渲染，可视区域的滚动位置和虚拟滚动区域的渲染就会发生在同一时间，因此不会出现白屏。但是需要特别注意的是，由于模拟滚动主要是为了处理性能问题，模拟滚动并不会像原生滚动那样平滑，建议尽量避免使用模拟滚动。
