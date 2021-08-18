---
category: components
type: 数据展示
title: Table
subtitle: 表格
order: 0
single: true
---

## API

### ix-table

#### TableProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:expandedRowKeys` | 展开行的 `key` 数组 | `(string \| number)[]` | - | - | - |
| `v-model:selectedRowKeys` | 选中行的 `key` 数组 | `(string \| number)[]` | - | - | - |
| `borderless` | 是否无边框 | `boolean` | `false` | ✅ | - |
| `columns` | 表格列的配置描述 | `[TableColumn](#TableColumn)[]` | - | - | - |
| `dataSource` | 表格数据数组 | `object[]` | - | - | - |
| `empty` | 空数据时的内容 | `string \| EmptyProps \| #empty` | - | - | - |
| `extra` | 表格扩展配置 | `[TableExtra](#TableExtra)` | - | - | 可以用于管理列的显隐、排序 |
| `headless` | 是否隐藏表头 | `boolean` | `false` | - |- |
| `pagination` | 配置分页器 | `TablePagination \| null` | - | ✅ | 设置 `null` 时表示不显示分页 |
| `rowClassName` | 表格行的类名 | `(record, index: number) => string` | - | - | - |
| `rowKey` | 表格行 `key` 的取值 | `string \| record => string \| number` | `id` | ✅ | - |
| `scroll` | 表格滚动配置项，可以指定滚动区域的宽、高 | `[TableScrollable](#TableScrollable)` | - | - | - |
| `size` | 表格大小 | `'large' \| 'medium' \| 'small'` | `medium` | ✅ |- |
| `spin` | 表格是否加载中 | `boolean \| SpinProps` | - | - | - |
| `tableLayout` | 表格元素的 [table-layout](https://developer.mozilla.org/zh-CN/docs/Web/CSS/table-layout) 属性 | `'auto' \| 'fixed'` | - | - | 固定表头/列或设置了 `column.ellipsis` 时，默认值为 `fixed` |
| `tags` | 覆盖默认的表格元素 | `TableTags` | - | - | - |

#### TableColumn

表格列的配置描述，`T` 为 `dataSource` 的数据类型。

```ts
export type TableColumn<T = unknown> = TableColumnBase<T> | TableColumnExpandable<T> | TableColumnSelectable<T>
```

#### TableColumnCommon

列配置的公用属性。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `additional` | 列的扩展属性 | `object` | - | 可以用于设置列的 `class`, `style` 或者其他属性 |
| `align` | 文本对齐方式 | `'start' \| 'right' \| 'end'` | `'start'` | ✅ | - |
| `colSpan` | 计算列的 `colSpan` | `(record: T, index: number) => number` | - | - | 返回为 `0` 时，不渲染, 通常用于列合并 |
| `fixed` | 是否固定 | `'start' \| 'end'` | - | - | - |
| `responsive` | 响应式 breakpoint 配置列表 | `BreakpointKey[]` | - | - | - |
| `rowSpan` | 计算列的 `rowSpan` | `(record: T, index: number) => number` | - | - | 返回为 `0` 时，不渲染, 通常用于行合并 |
| `titleColSpan` | 设置表头的 `colSpan` | - | - | - | 为 `0` 时，不渲染 |
| `width` | 列宽度 | `string \| number` | - | - | - |

#### TableColumnBase

普通列配置的属性，继承 `TableColumnCommon` 。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `children` | 子列的配置项 | `TableColumnBase[]` | - | - | 用于设置分组表头 |
| `customRender` | 自定义列内容 | `string \| TableColumnRenderFn<any, T>` | - | - | 类型为 `string` 时，对应插槽名 |
| `customTitle` | 自定义列头 | `string \| TableColumnTitleFn` | - | - | 类型为 `string` 时，对应插槽名 |
| `dataKey` | 数据在数据项中对应的路径 | `string \| string[]` | - | - | 支持通过数组查询嵌套路径 |
| `editable` | 是否可编辑 | `boolean` | `false` | - | - |
| `ellipsis` | 超过宽度将自动省略 | `boolean` | `false` | - | 不支持和排序筛选一起使用 |
| `key` | 表格列 `key` 的取值 | `string \| number` | - | - | 默认为 `dataKey` |
| `sortable` | 是否可排序 | `[TableColumnSortable](#TableColumnSortable)` | - | - | - |
| `title` | 列头的文本 | `string` | - | - | - |

```ts
export interface TableColumnRenderOption<V = any, T = unknown> {
  value: V
  record: T
  index: number
}
export type TableColumnRenderFn<V = any, T = unknown> = (options: TableColumnRenderOption<V, T>) => VNodeTypes
export type TableColumnTitleFn = (options: { title?: string }) => VNodeTypes
```

#### TableColumnExpandable

可展开列配置的属性，继承 `TableColumnCommon`

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `type` | 列类型 | `'expandable'` | - | - | `type` 设置为 `expandable`,即为展开列 |
| `customExpand` | 自定义展开内容 | `string \| TableColumnExpandableExpandFn<T>` | - | - | 类型为 `string` 时，对应插槽名 |
| `customIcon` | 自定义展开图标 | `string \| TableColumnExpandableIconFn<T>` | - | - | 类型为 `string` 时，对应插槽名 |
| `enabled` |  设置是否允许行展开 | `(record:T, index: number) => boolean` | - | - | - |
| `icon` | 展开按钮图标 | `[string, string]` | `['plus', 'minus']` | ✅ | - |
| `indent` | 展示树形数据时，每层缩进的宽度 | `number` | `12` | - | - |
| `trigger` | 不通过图标，触发行展开的方式 | `'click' \| 'doubleClick'` | - | - | - |
| `onChange` | 展开状态发生变化时触发 | `(expendedRowKeys: (string | number)[]) => void` | - | - | - |
| `onExpand` | 点击展开图标，或通过 `trigger` 触发 | `(expanded: boolean, record: T) => void` | - | - | - |

```ts
export type TableColumnExpandableExpandFn<T = unknown> = (options: { record: T; index: number }) => VNodeTypes
export type TableColumnExpandableIconFn<T = unknown> = (options: {
  expanded: boolean
  record: T
  onExpand: () => void
}) => VNodeTypes
```

#### TableColumnSelectable

可选择列配置的属性，继承 `TableColumnCommon`

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `type` | 列类型 | `'selectable'` | - | - | `type` 设置为 `selectable`,即为选择列 |
| `enabled` |  设置是否允许行选择 | `(record: T, index: number) => boolean` | - | - | - |
| `multiple` | 是否支持多选 | `boolean` | `true` | - | - |
| `options` | 自定义列头选择项 | `boolean \| TableSelectableSelection[]` | `false` | - | 为 `false` 时，不显示，为 `true` 时，显示默认的选择项 |
| `trigger` | 不通过 `type`，触发行选择的方式 | `'click' \| 'doubleClick'` | - | - | - |
| `onChange` | 选中状态发生变化时触发 | `(selectedRowKeys: (string | number)[]) => void` | - | - | - |
| `onSelect` | 点击选择框，或通过 `trigger` 触发 | `(selected: boolean, record: T) => void` | - | - | - |
| `onSelectAll` | 选择所有行时触发 | `(selectedRowKeys: (string | number)[]) => void` | - | - | - |
| `onSelectInvert` | 反选时触发 | `(selectedRowKeys: (string | number)[]) => void` | - | - | - |
| `onSelectNone` | 清空选择时触发 | `() => void` | - | - | - |

```ts
export interface TableColumnSelectableOption {
  key: string | number
  text: string
  onClick: (selectedRowKeys: (string | number)[]) => void
}
```

#### TableColumnSortable

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `directions` | 支持的排序方式 | `Array<'ascend' \| 'descend' \| null>` | `['ascend', 'descend', null]` | ✅ | - |
| `order` | 筛选菜单可见状态变化时调用 | `'ascend' \| 'descend' \| null` | - | - | - |
| `showTooltip` | 是否显示下一次排序的 `tooltip` 提示 | `boolean` | `true` | ✅ | - |
| `sorter` | 本地模式下，排序的运行函数 | `(curr: T, next: T) => number` | - | - | 参考 [`Array.sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) |

#### TableExtra

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `dropdown` | 自定义扩展菜单 | `(options: TableExtraDropdownOptions) => VNode \| #extraDropdown="TableExtraDropdownOptions"` | - | - | - |
| `dropdownVisible` | 扩展菜单是否可见 | `boolean` | `false` | - | - |
| `icon` |  图标 | `string \| #extraIcon` | `'ellipsis'` | - | ✅ |
| `options` | 扩展菜单选项 | `TableExtraOption[]` | - | - | - |
| `onDropDownVisibleChange` | 筛选菜单可见状态变化时调用 | `(visible) => void` | - | - | - |

#### TablePagination

```ts
export interface TablePagination extends PaginationProps {
  position: TablePaginationPosition
}
export type TablePaginationPosition = 'topStart' | 'top' | 'topEnd' | 'bottomStart' | 'bottom' | 'bottomEnd'

```

#### TableScroll

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `toTopOnChange` |  当分页、排序、筛选变化后是否滚动到表格顶部 | `boolean` | `false` | - | - |
| `x` |  设置横向滚动，也可用于指定滚动区域的宽 | `string \| number \| boolean` | - | - | 可以设置为像素值，百分比， `max-content` 和 `true` |
| `y` |  设置纵向滚动，也可用于指定滚动区域的高 | `string \| number` | - | - | 可以设置为像素值 |

#### TableSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `footer` | 表格尾部 | - | - |
| `header` | 表格头部 | - | - |
| `summary` | 表格总结栏 | - | - |
