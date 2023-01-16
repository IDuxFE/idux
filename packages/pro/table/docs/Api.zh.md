
### IxProTable

#### ProTableProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `columns` | 表格列的配置描述 | `ProTableColumn[]` | - | - |  参见[ProTableColumn](#ProTableColumn)  |
| `layoutTool` | 是否显示布局设置工具按钮 | `boolean \| ProTableLayoutToolProps` | `true` | - | 当设置为 `false` 时，你也可以使用 `IxProTableLayoutTool` 来自定义它的位置和展示形式 |
| `toolbar` | 表格的工具栏 | `VNode[] \| #toolbar` | - | - | - |
| `onColumnsChange` | 表格列的配置发生改变后的回调 | `(columns: ProTableColumn[]) => void` | - | - | - |

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
| `layoutable` | 是否在布局设置菜单中显示此列 | `boolean` | - | - | 为 `false` 时，将不显示此列 |
| `changeFixed` | 是否可以改变列的固定状态 | `boolean` | - | - | 为 `false` 时，此列将不能调整固定状态，但依旧可以设置 `fixed` |
| `changeIndex` | 是否可以改变列的顺序 | `boolean` | - | - | 为 `false` 时，将不可调整列的顺序 |
| `changeVisible` | 是否可以改变列的显示状态 | `boolean` | - | - | 为 `false` 时，此列将不能调整显示状态，但依旧可以设置 `visible` |
| `visible` | 是否在表格中渲染此列 | `boolean` | - | - | 为 `false` 时，将不渲染此列 |

##### ProTableColumnResizable

配置列的列宽调整相关设置。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `maxWidth` | 列的最大宽度 | `number` | - | - | - |
| `minWidth` | 列的最小宽度 | `number` | - | - | - |
| `resizable` | 是否开启列宽调整 | `boolean` | `false` | - | 如果设为 `true`, 请同时设置一个非百分比的 `column.width` |

##### ProTableColumnBase

普通列配置的属性，继承 `TableColumnBase, ProTableColumnLayoutConfig, ProTableColumnResizable`

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `children` | 子列的配置项 | `ProTableColumnBase[]` | - | - | 用于设置分组表头 |

##### ProTableColumnExpandable

可展开列配置的属性，继承 `TableColumnExpandable, ProTableColumnBase`

##### ProTableColumnSelectable

可选择列配置的属性，继承 `TableColumnSelectable, ProTableColumnLayoutConfig, ProTableColumnResizable`

### IxProTableLayoutTool

表格布局设置组件，大部分情况下，你都不需要使用它。

只有当你设置了 `layoutTool='false'` 时，并需要在表格的其他位置来控制表格的布局时使用。

例如: 在自定义 `header` 的时候设置它, 参见 [自定义头部](#pro-table-demo-CustomHeader).

#### ProTableLayoutToolProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:searchValue` | 搜索的文本 | `string` | - | - | - |
| `placeholder` | 搜索框的占位符 | `string` | ✅ | - | 通过 locale 全局配置 |
| `searchable` | 是否开启搜索功能 | `boolean` | ✅ | - | - |
