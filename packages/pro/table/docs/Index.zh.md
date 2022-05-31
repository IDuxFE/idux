---
category: pro
type: 数据展示
order: 0
title: ProTable
subtitle: 高级表格
---

## API

### IxProTable

#### ProTableProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `columns` | 表格列的配置描述 | `ProTableColumn[]` | - | - |  参见[ProTableColumn](#ProTableColumn)  |
| `toolbar` | 表格的工具栏 | `ProTableToolbar[] \| #toolbar` | `['layout']` | ✅ | - |
| `onColumnsChange` | 表格列的配置发生改变后的回调 | `(columns: ProTableColumn[]) => void` | `['layout']` | ✅ | - |

更多属性请参考 [TableProps](/components/table/zh#TableProps).

#### ProTableColumn

表格列的配置描述，`T` 为 `dataSource` 的数据类型, `V` 为对应列的值类型，`CT` 为对应列的单元格类型。

```ts
export type ProTableColumn<T = any, V = any, CT = 'input'> =
  | ProTableColumnBase<T, V, CT>
  | ProTableColumnExpandable<T, V, CT>
  | ProTableColumnSelectable<T>
  | ProTableColumnIndexable<T, V>
```

##### ProTableColumnLayoutConfig

配置列的布局相关设置。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `changeFixed` | 是否可以改变列的固定状态 | `boolean` | - | - | 为 `false` 时，此列将不能调整固定状态，但依旧可以设置 `fixed` |
| `changeIndex` | 是否可以改变列的顺序 | `boolean` | - | - | 为 `false` 时，将不可调整列的顺序 |
| `changeVisible` | 是否可以改变列的显示状态 | `boolean` | - | - | 为 `false` 时，此列将不能调整显示状态，但依旧可以设置 `visible` |
| `visible` | 是否显示此列 | `boolean` | - | - | 为 `false` 时，将不显示此列 |

##### ProTableColumnBase

普通列配置的属性，继承 `TableColumnBase, ProTableColumnLayoutConfig`

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `children` | 子列的配置项 | `ProTableColumnBase[]` | - | - | 用于设置分组表头 |

##### ProTableColumnExpandable

可展开列配置的属性，继承 `TableColumnExpandable, ProTableColumnBase`

##### ProTableColumnSelectable

可选择列配置的属性，继承 `TableColumnSelectable, ProTableColumnLayoutConfig`

##### ProTableColumnIndexable

序号列配置的属性，继承 `ProTableColumnBase`

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `type` | 列类型 | `'indexable'` | - | - | 必填 |

其他的所有属性都支持全局配置，其默认配置如下：

```ts
export const defaultConfig: ProGlobalConfig = {
  table: {
    columnIndexable: {
      width: 40,
      align: 'center',
      customCell: ({ rowIndex }) => rowIndex,
    },
  },
}
```

### IxProTableLayoutTool

表格布局设置组件，通常在自定义 `header` 的时候设置它, 参见 [自定义头部](#pro-table-demo-CustomHeader).
