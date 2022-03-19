---
category: components
type: 数据录入
order: 0
title: Transfer
subtitle: 穿梭框
---

## API

### 数据说明

#### TransferData

穿梭框源数据类型

```ts
export interface TransferData extends Record<VKey, any> {
  key?: VKey
  label?: string
  disabled?: boolean
  additional?: {
    class?: any
    style?: any
    [key: string]: unknown
  }
}
```

### IxTransfer

#### TransferProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `dataSource` | 源数据数组 | `TransferData[]` | `[]` | - | - |
| `v-model:value` | 已选数据数组 | `VKey[]` | - | - | - |
| `v-model:sourceSelectedKeys` | 源数据列表勾选的keys | `VKey[]` | - | - | - |
| `v-model:targetSelectedKeys` | 目标数据列表勾选的keys | `VKey[]` | - | - | - |
| `disabled` | 是否禁用穿梭框 | `boolean` | `false` | - | - |
| `getKey` | 数据项 `key` 的取值 | `string \| (item: unknown) => string \| number` | - | - | 默认取数据的 `key` 属性 |
| `virtual` | 是否开启虚拟滚动 | `boolean` | `false` | - | 需要设置 `scroll.height` |
| `scroll` | 是否开启虚拟滚动 | `TransferScroll` | - | 仅使用默认列表并开启 `virtual` 下可用 |
| `searchable` | 数据列表是否可搜索 | `boolean \| { source: boolean, target: boolean }` | `false` | ✅ | 仅使用默认列表头部时可用 |
| `searchFn` | 搜索的判断函数 | `SearchFn` | - | - |
| `pagination` | 数据列表分页配置 | `boolean \| TransferPaginationType` | `false` | ✅ | 仅使用默认列表底部时可用 |
| `transferBySelect` | 是否通过源数据的勾选触发穿梭 | `boolean` | `false` | ✅ | 开启后默认不展示操作按钮 |
| `showSelectAll` | 是否展示全选框 | `boolean` | `true` | ✅ | - |
| `spin` | 数据列表的加载状态 | `boolean \| { source: boolean, target: boolean }` | `false` | - | - |
| `empty` | 空状态的配置 | `string \| EmptyProps` | - | - | - |
| `clearable` | 是否可清除 | `boolean` | `true` | ✅ | - |
| `clearIcon` | 清除图标 | `string \| #clearIcon` | `clear` | ✅ | - |
| `onChange` | 已选数据改变回调函数 | `(keys: VKey[], oldKeys: Vkey[]) => void` | - | - | - |
| `onScroll` | 数据列表滚动事件 | `(isSource: boolean, evt: Event) => void` | - | - | 仅使用默认列表并开启 `virtual` 下可用 |
| `onScrolledChange` | 数据列表滚动的位置发生变化 | `(isSource: boolean, startIndex: number, endIndex: number, visibleNodes: unknown[]) => void` | - | - | 仅使用默认列表并开启 `virtual` 下可用 |
| `onScrolledBottom` | 源数据列表滚动到底部时触发 | `(isSource: boolean) => void` | - | - | 仅使用默认列表并开启 `virtual` 下可用 |
| `onSearch` | 穿梭框搜索触发回调函数 | `(isSource: boolean, searchValue: string \| undefined) => void` | - | - | - |
| `onSelectAll` | 数据列表全部勾选回调函数 | `(isSource: boolean, checked: boolean) => void` | - | - | - |
| `onClear` | 已选数据清除的回调函数 | `(isSource: boolean) => void` | - | - | - |

```ts
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

export interface TransferPaginationType {
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
| `default` | 穿梭框列表主体 | `TransferBindings & { isSource: boolean }` | - |
| `headerLabel` | 穿梭框列表头部 | `{ data: TransferData[], isSource: boolean }` | - |
| `headerSuffix` | 穿梭框列表头部 | `{ isSource: boolean }` | - |
| `footer` | 穿梭框列表底部 | `TransferBindings & { isSource: boolean }` | - |
| `operations` | 穿梭框列表底部 | `TransferOperationsContext` | - |
| `label` | 穿梭框列表label | `TransferData` | 仅在使用默认列表时生效 |
| `empty` | 穿梭框列表空状态 | `EmptyProps` | 仅在使用默认列表时生效 |

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
| `scrollTo` | 源数据滚动到指定位置 | `(option?: number \| VirtualScrollToOptions, isSource?: boolean) => void` | 仅使用默认列表并开启 `virtual` 下可用 |
