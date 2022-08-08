## API

### IxProTransfer

#### ProTransferProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 已选数据数组 | `VKey[]` | - | - | - |
| `v-model:sourceSelectedKeys` | 源数据列表勾选的keys | `VKey[]` | - | - | - |
| `v-model:targetSelectedKeys` | 目标数据列表勾选的keys | `VKey[]` | - | - | - |
| `v-model:sourceExpandedKeys` | 源数据列表树展开的keys | `VKey[]` | - | - | 仅在 `type` 为 `'tree'` 下生效|
| `v-model:targetExpandedKeys` | 目标数据列表树展开的keys | `VKey[]` | - | - | 仅在 `type` 为 `'tree'` 下生效 |
| `clearable` | 是否可清除 | `boolean` | `true` | ✅ | - |
| `clearIcon` | 清除图标 | `string \| #clearIcon` | `clear` | ✅ | - |
| `dataSource` | 源数据数组 | `TransferData[]` | `[]` | - | - |
| `disabled` | 是否禁用穿梭框 | `boolean` | `false` | - | - |
| `defaultTargetData` | 初始默认目标列表数据 | `TransferData` | - | - | 仅用于设置初始数据，不可响应式变更 |
| `empty` | 空状态的配置 | `string \| EmptyProps` | - | - | - |
| `flatTargetData` | 是否平展开已选树数据 | `boolean` | `false` | - | 平展开后仅将树的叶子节点数据以列表展示，仅在 `type` 为 `'tree'` 下生效 |
| `getKey` | 数据项 `key` 的取值 | `string \| (item: unknown) => string \| number` | - | - | 默认取数据的 `key` 属性 |
| `mode` | 穿梭框模式 | `'default' \| 'immediate'` | `'default'` | - | `'immediate'` 模式为勾选即触发穿梭，不展示穿梭操作按钮 |
| `pagination` | 数据列表分页配置 | `boolean \| TransferPaginationProps` | `false` | ✅ | 仅使用默认列表底部时可用 |
| `scroll` | 穿梭框列表滚动配置项，可以指定滚动区域的宽、高 | `TransferScroll` | - | - |
| `searchable` | 数据列表是否可搜索 | `boolean \| { source: boolean, target: boolean }` | `false` | ✅ | - |
| `searchFn` | 搜索的判断函数 | `SearchFn` | - | - |
|`spin` | 数据列表的加载状态 | `boolean \| { source: boolean, target: boolean }` | `false` | - | - |
| `type` | 穿梭框类型 | `'table' \| 'tree'` | `'table'` | - | - |
| `tableProps` | 表格自定义参数 | `ProTransferTableProps` | - | - | 仅在 `type` 为 `'table'` 下生效 |
| `treeProps` | 树自定义参数 | `ProTransferTableProps` | - | - | 仅在 `type` 为 `'tree'` 下生效 |
| `virtual` | 是否开启虚拟滚动 | `boolean` | `false` | - | 需要设置 `scroll.height` |
| `onChange` | 已选数据改变回调函数 | `(keys: VKey[], oldKeys: Vkey[]) => void` | - | - | - |
| `onScroll` | 数据列表滚动事件 | `(isSource: boolean, evt: Event) => void` | - | - | 仅使用默认列表并开启 `virtual` 下可用 |
| `onScrolledChange` | 数据列表滚动的位置发生变化 | `(isSource: boolean, startIndex: number, endIndex: number, visibleNodes: unknown[]) => void` | - | - | 仅使用默认列表并开启 `virtual` 下可用 |
| `onScrolledBottom` | 数据列表滚动到底部时触发 | `(isSource: boolean) => void` | - | - | 仅使用默认列表并开启 `virtual` 下可用 |
| `onSearch` | 穿梭框搜索触发回调函数 | `(isSource: boolean, searchValue: string \| undefined) => void` | - | - | - |
| `onSelectAll` | 数据列表全部勾选回调函数 | `(isSource: boolean, checked: boolean) => void` | - | - | - |
| `onClear` | 已选数据清除的回调函数 | `(isSource: boolean) => void` | - | - | - |

```ts
export type TreeTransferData<C extends VKey = 'children'> = TransferData & {
  [key in C]?: TreeTransferData<C>[]
}

export interface TransferScroll {
  height?: string | number
  width?: string | number | { source?: string | number; target?: string | number }
  fullHeight?: boolean
}

export type SearchFn<T extends BaseTransferData = TransferData> = (
  isSource: boolean,
  item: T,
  searchValue: string,
) => boolean

export interface TransferPaginationProps {
  pageIndex?: [number | undefined, number | undefined] | [number | undefined] | number
  pageSize?: [number | undefined, number | undefined] | [number | undefined] | number
  disabled?: boolean
  total?: [number | undefined, number | undefined] | [number | undefined] | number
  onChange?: (isSource: boolean, pageIndex: number, pageSize: number) => void
}

export interface ProTransferTableProps {
  sourceColumns: TableColumn[]
  targetColumns: TableColumn[]
  tableLayout?: 'auto' | 'fixed'
  ellipsis?: boolean
  borderless?: boolean
}

export interface ProTransferTreeProps {
  showLine?: boolean
  childrenKey?: string
  expandIcon?: string
  labelKey?: string
  leafLineIcon?: string
  loadChildren?: <C extends VKey = VKey>(node: TreeTransferData<C>) => TreeTransferData<C>[]
  onExpand?: MaybeArray<(expanded: boolean, node: TreeNode) => void>
  onExpandedChange?: MaybeArray<(expendedKeys: VKey[], expendedNodes: TreeNode[]) => void>
}
```

#### ProTransferSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `clearIcon` | 清除按钮 | - | - |
| `empty` | 穿梭框列表空状态 | `EmptyProps` | 详情参考基础穿梭框组件 |
| `footer` | 穿梭框列表底部 | `TransferBindings & { isSource: boolean }` | 详情参考基础穿梭框组件  |
| `headerLabel` | 穿梭框列表头部标签 | `{ data: TransferData[], isSource: boolean }` | 详情参考基础穿梭框组件 |
| `headerSuffix` | 穿梭框列表头部后缀 | `{ isSource: boolean }` | 详情参考基础穿梭框组件  |
| `operations` | 穿梭框列表底部 | `TransferOperationsContext` | 详情参考基础穿梭框组件  |
| `label` | 树穿梭框label | `{ item: TransferData, isSource: boolean }` | 仅在 `type` 为 `'tree'` 下生效 |
| `prefix` | 树节点前缀图标 | `string` | - | 仅在 `type` 为 `'tree'` 下生效  |
| `suffix` | 树节点后缀图标 | `string` | - | 仅在 `type` 为 `'tree'` 下生效 |

#### ProTransferMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `scrollTo` | 滚动到指定位置 | `(isSource: boolean, option?: number \| VirtualScrollToOptions) => void` | 仅在开启 `virtual` 时可用 |
