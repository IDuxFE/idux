
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
| `rowHeight` | 列表行的高度 | `number` | `0` | - | 设置为大于 0 时才可以启用虚拟滚动 |
| `colWidth` | 列表列的宽度 | `number` | `0` | - | 设置为大于 0 时才可以启用虚拟滚动 |
| `rowRender` | 列表行的渲染函数 | `VirtualRowRenderFn \| #row={item, index}` | - | - | 必须设置或者提供 `row` 插槽 |
| `colRender` | 列表列的渲染函数 | `VirtualColRenderFn \| #col={row, item, index}` | - | - | 必须设置或者提供 `col` 插槽 |
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
