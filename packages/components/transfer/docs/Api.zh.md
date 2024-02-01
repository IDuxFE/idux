
### IxTransfer

#### TransferProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 已选数据数组 | `VKey[]` | - | - | - |
| `v-model:sourceSelectedKeys` | 源数据列表勾选的keys | `VKey[]` | - | - | - |
| `v-model:targetSelectedKeys` | 目标数据列表勾选的keys | `VKey[]` | - | - | - |
| `v-model:sourceSearchValue` | 源数据列表搜索值 | `string` | - | - | - |
| `v-model:targetSearchValue` | 目标数据列表搜索值 | `string` | - | - | - |
| `clearable` | 是否可清除 | `boolean` | `true` | ✅ | - |
| `clearIcon` | 清除图标 | `string \| #clearIcon` | `delete` | ✅ | - |
| `customAdditional` | 自定义选项的额外属性 | `TransferCustomAdditional` | - | - | 例如 `class`, 或者原生事件 |
| `dataSource` | 源数据数组 | `TransferData[]` | `[]` | - | - |
| `defaultTargetData` | 初始默认目标列表数据 | `TransferData` | - | - | 仅用于设置初始数据，不可响应式变更 |
| `disabled` | 是否禁用穿梭框 | `boolean` | `false` | - | - |
| `empty` | 空状态的配置 | `'default' \| 'simple' \| EmptyProps` | `'simple'` | - | - |
| `getKey` | 数据项 `key` 的取值 | `string \| (item: unknown) => string \| number` | - | - | 默认取数据的 `key` 属性 |
| `mode` | 穿梭框模式 | `'default' \| 'immediate'` | `'default'` | - | `'immediate'` 模式为勾选即触发穿梭，不展示穿梭操作按钮 |
| `pagination` | 数据列表分页配置 | `boolean \| TransferPaginationProps` | `false` | ✅ | 仅使用默认列表底部时可用 |
| `scroll` | 穿梭框列表滚动配置项，可以指定滚动区域的宽、高 | `TransferScroll` | - | - |
| `searchable` | 数据列表是否可搜索 | `boolean \| { source: boolean, target: boolean }` | `false` | ✅ | - |
| `searchFn` | 搜索的判断函数 | `SearchFn` | - | - |
| `showSelectAll` | 是否展示全选框 | `boolean` | `true` | ✅ | - |
| `spin` | 数据列表的加载状态 | `boolean \| { source: boolean, target: boolean }` | `false` | - | - |
| `virtual` | 是否开启虚拟滚动 | `boolean` | `false` | - | 需要设置 `scroll.height` |
| `onChange` | 已选数据改变回调函数 | `(keys: VKey[], oldKeys: Vkey[]) => void` | - | - | - |
| `onScroll` | 数据列表滚动事件 | `(isSource: boolean, evt: Event) => void` | - | - | 仅使用默认列表并开启 `virtual` 下可用 |
| `onScrolledChange` | 数据列表滚动的位置发生变化 | `(isSource: boolean, startIndex: number, endIndex: number, visibleNodes: unknown[]) => void` | - | - | 仅使用默认列表并开启 `virtual` 下可用 |
| `virtualScrollMode` | 虚拟滚动的滚动模式 | `'native' \| 'simulated'` | `'native'` | - | - |
| `onScrolledBottom` | 数据列表滚动到底部时触发 | `(isSource: boolean) => void` | - | - | 仅使用默认列表并开启 `virtual` 下可用 |
| `onSearch` | 穿梭框搜索触发回调函数 | `(isSource: boolean, searchValue: string \| undefined) => void` | - | - | - |
| `onSelectAll` | 数据列表全部勾选回调函数 | `(isSource: boolean, checked: boolean) => void` | - | - | - |
| `onClear` | 已选数据清除的回调函数 | `(isSource: boolean) => void` | - | - | - |

```ts
export interface TransferData {
  key?: VKey
  label?: string
  disabled?: boolean
  [key: string]: unknown
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
```

#### TransferSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `clearIcon` | 清除按钮 | - | - |
| `default` | 穿梭框列表主体 | `TransferListSlotParams` | - |
| `empty` | 穿梭框列表空状态 | `EmptyProps` | 仅在使用默认列表时生效 |
| `header` | 穿梭框列表头部 | `TransferListSlotParams` | - |
| `footer` | 穿梭框列表底部 | `TransferListSlotParams` | - |
| `headerLabel` | 穿梭框列表头部标签 | `{ data: TransferData[], isSource: boolean }` | - |
| `headerSuffix` | 穿梭框列表头部后缀 | `{ isSource: boolean }` | - |
| `label` | 穿梭框列表label | `{ item: TransferData, isSource: boolean }` | 仅在使用默认列表时生效 |
| `operations` | 穿梭框操作按钮区域 | `TransferOperationsContext` | - |

```ts
export interface TransferListSlotParams<T extends TransferData = TransferData> {
  // 是否是源数据列表（待选框）
  isSource: boolean
  // 分割好的数据
  data: T[]
  // 过滤后的数据
  filteredData: T[]
  // 分页处理过后的数据
  paginatedData: T[]
  // 源数据
  dataSource: T[]
  // 数据key与数据项对应Map
  dataKeyMap: Map<VKey, T>
  // 过滤后的源数据
  filteredDataSource: T[]
  // 分页后的源数据
  paginatedDataSource: T[]
  // 已选数据key
  selectedKeys: VKey[]
  // 已选数据key集合
  selectedKeySet: Set<VKey>
  // 已勾选数据
  selectedKeys: VKey[]
  // 已勾选数据集合
  selectedKeySet: Set<VKey>
  // 禁用数据key集合
  disabledKeys: Set<VKey>
  // 全部勾选禁用状态
  selectAllDisabled: boolean
  // 全部勾选状态
  selectAllStatus: { checked: boolean; indeterminate: boolean }

  // 是否展示全部勾选框
  showSelectAll: boolean
  // 是否可搜索
  searchable: boolean

  // 分页配置
  pagination: PaginationProps | null

  // 触发数据添加
  triggerAppend: (keys: VKey[]) => void
  // 触发数据移除
  triggerRemove: (keys: VKey[]) => void
  // 勾选状态改变触发函数
  handleSelectChange: (keys: Set<VKey> | VKey[]) => void
  // 全部勾选触发函数
  selectAll: (selected?: boolean) => void

  // 搜索placeholder
  searchPlaceholder: string
  // 搜索输入
  searchValue: string
  // 搜索输入触发函数
  handleSearchChange: (value: string) => void
  // 获取数据key
  getRowKey: (item: TransferData) => VKey
}
```

```ts
export interface TransferOperationsSlotParams {
  // 数据添加禁用状态
  appendDisabled: boolean
  // 数据移除禁用状态
  removeDisabled: boolean
  // 添加全部数据禁用状态
  appendAllDisabled: boolean
  // 清除已选数据禁用状态
  clearDisabled: boolean
  // 触发数据添加
  triggerAppend: (keys?: VKey[]) => void
  // 触发数据移除
  triggerRemove: (keys?: VKey[]) => void
  // 触发添加全部数据
  triggerAppendAll: () => void
  // 触发清除已选数据
  triggerClear: () => void
}
```

#### TransferMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `scrollTo` | 滚动到指定位置 | `(isSource: boolean, option?: number \| VirtualScrollToOptions) => void` | 仅在开启 `virtual` 时可用 |
