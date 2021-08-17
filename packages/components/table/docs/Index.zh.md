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

```ts
export type TableColumn<T = unknown> = TableColumnBase<T> | TableColumnExpandable<T> | TableColumnSelectable<T>
```

#### TableColumnCommon

```ts
export type TableColumn<T = unknown> = TableColumnBase<T> | TableColumnExpandable<T> | TableColumnSelectable<T>
```

#### TableColumnBase

列配置的公用属性。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `additional` | 列的扩展属性 | `object` | - | 可以用于设置列的 `class`, `style` 或者其他属性 |
| `align` | 文本对齐方式 | `'start' \| 'right' \| 'end'` | `'start'` | ✅ | - |
| `colSpan` | 计算列的 `colSpan` | `(record: T, index: number) => number` | - | - | 返回为 `0` 时，不渲染, 通常用于列合并 |
| `fixed` | 是否固定 | `'start' \| 'end'` | - | - | - |
| `rowSpan` | 计算列的 `rowSpan` | `(record: T, index: number) => number` | - | - | 返回为 `0` 时，不渲染, 通常用于行合并 |
| `titleColSpan` | 设置表头的 `colSpan` | - | - | - | 为 `0` 时，不渲染 |
| `width` | 列宽度 | `string \| number` | - | - | - |

```ts
export interface TablePagination extends PaginationProps {
  position: 'topStart' | 'top' | 'topEnd' | 'bottomStart' | 'bottom' | 'bottomEnd'
}

export interface TableTags {
  table?: VNodeTypes
  head?: {
    thead?: VNodeTypes
    tr?: VNodeTypes
    th?: VNodeTypes
  }
  body?: {
    tbody?: VNodeTypes
    tr?: VNodeTypes
    td?: VNodeTypes
  }
}
```

#### TableSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `footer` | 表格尾部 | - | - |
| `header` | 表格头部 | - | - |
| `summary` | 表格总结栏 | - | - |

#### TableExpandable

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `enabled` |  设置是否允许行展开 | `(record, index) => boolean` | - | - | - |
| `fixed` |  列是否固定 | `'left' \| 'right'` | - | - | - |
| `icon` | 展开按钮图标 | `[string, string] \| (options:TableExpandIconRenderOptions)=> VNodeTypes  \| #expandIcon="TableExpandIconRenderOptions"` | - | - | - |
| `indent` | 展示树形数据时，每层缩进的宽度 | `number` | `12` | - | - |
| `index` | 自定义展开按钮的列顺序 | `number` | `0` | - | `< 0` 时不展示 |
| `rowKeys` | 展开行的 `key` | `(string | number)[]` | - | - | - |
| `render` | 展开内容的渲染函数 | `(options:TableExpandRenderOptions)=> VNodeTypes \| #expandRender="TableExpandRenderOptions"` | - | - | - |
| `trigger` | 不通过图标，触发行展开的方式 | `'click' \| 'doubleClick'` | - | - | - |
| `width` | 列宽度 | `string \| number` | - | - | - |
| `onChange` | 展开状态发生变化时触发 | `(expendedRowKeys, expendedRecords) => void` | - | - | - |
| `onExpand` | 点击展开图标，或通过 `trigger` 触发 | `(expanded:boolean, record) => void` | - | - | - |

#### TableExtra

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `dropdown` | 自定义扩展菜单 | `(options: TableExtraDropdownOptions) => VNode \| #extraDropdown="TableExtraDropdownOptions"` | - | - | - |
| `dropdownVisible` | 扩展菜单是否可见 | `boolean` | `false` | - | - |
| `icon` |  图标 | `string \| #extraIcon` | `'ellipsis'` | - | ✅ |
| `options` | 扩展菜单选项 | `TableExtraOption[]` | - | - | - |
| `onDropDownVisibleChange` | 筛选菜单可见状态变化时调用 | `(visible) => void` | - | - | - |

#### TableSelectable

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `enabled` |  设置是否允许行选择 | `(record, index) => boolean` | - | - | - |
| `fixed` |  列是否固定 | `'left' \| 'right'` | - | - | - |
| `multiple` | 是否支持多选 | `boolean` | `true` | - | - |
| `rowKeys` | 已选择行的 `key` | `(string \| number)[]` | - | - | - |
| `selections` | 自定义列头选择项 | `boolean \| TableSelectableSelection[]` | `false` | - | 为 `true` 时，显示默认的选择项 |
| `trigger` | 不通过 `type`，触发行选择的方式 | `'click' \| 'doubleClick'` | - | - | - |
| `width` | 列宽度 | `string \| number` | - | - | - |
| `onChange` | 选中状态发生变化时触发 | `(selectedRowKeys, selectedRecords) => void` | - | - | - |
| `onSelect` | 点击选择框，或通过 `trigger` 触发 | `(selected:boolean, record) => void` | - | - | - |
| `onSelectAll` | 选择所有行时触发 | `(selectedRowKeys) => void` | - | - | - |
| `onSelectInvert` | 反选时触发 | `(selectedRowKeys) => void` | - | - | - |
| `onSelectNone` | 清空选择时触发 | `() => void` | - | - | - |

```ts
export interface TableSelectableSelection {
  key: string | number
  text: string
  onClick: (selectedRowKeys: (string | number)[]) => void
}
```

#### TableScrollable

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `toTopOnChange` |  当分页、排序、筛选变化后是否滚动到表格顶部 | `boolean` | `false` | - | - |
| `x` |  设置横向滚动，也可用于指定滚动区域的宽 | `string \| number \| boolean` | - | - | 可以设置为像素值，百分比， `max-content` 和 `true` |
| `y` |  设置纵向滚动，也可用于指定滚动区域的高 | `string \| number` | - | - | 可以设置为像素值 |

### ix-table-column

#### TableColumnProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `align` | 文本对齐方式 | `'left' \| 'right' \| 'center'` | `'left'` | ✅ | - |
| `colSpan` | 列合并 | `number` | - | - | 设置为 `0` 时，不渲染 |
| `dataKey` | 数据在数据项中对应的路径 | `string \| string[]` | - | - | 支持通过数组查询嵌套路径 |
| `editable` | 是否可编辑 | `boolean` | `false` | - | - |
| `ellipsis` | 超过宽度将自动省略 | `boolean` | `false` | - | 不支持和排序筛选一起使用 |
| `fixed` | 是否固定 | `'left' \| 'right'` | - | - | - |
| `key` | 表格列 `key` 的取值 | `string \| number` | - | - | 默认为 `dataKey` |
| `render` | 自定义 `render` | `(options: TableColumnRenderOptions): VNode | object \| #render="TableColumnRenderOptions"` | - | - | 返回 object 时，可以返回行/列合并的对象。 |
| `responsive` | 响应式 breakpoint 配置列表 | `BreakpointKey[]` | - | - | - |
| `sortable` | 是否可排序 | `[TableColumnSortable](#TableColumnSortable)` | - | - | - |
| `title` | 列头文本 | `string \| #title` | - | - | - |
| `width` | 列宽度 | `string \| number` | - | - | - |

#### TableColumnSortable

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `directions` | 支持的排序方式 | `Array<'ascend' | 'descend'>` | `['ascend', 'descend']` | ✅ | - |
| `order` | 筛选菜单可见状态变化时调用 | `'ascend' \| 'descend'` | - | - | - |
| `showTooltip` | 是否显示下一次排序的 `tooltip` 提示 | `boolean` | `true` | ✅ | - |
| `onSort` | 本地模式下，排序的运行函数 | `(curr, next) => number` | - | - | 参考 [`Array.sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) |

### ix-table-column-group

#### TableColumnGroupProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `title` | 列头文本 | `string \| #title` | - | - | - |
