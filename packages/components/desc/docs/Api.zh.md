### IxDesc

#### DescProps

> 除以下表格之外还支持 `IxRow` 的[所有配置](/components/grid/zh?tab=api#RowProps)。  
| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `col` | 每一行展示多少列数据 | `number \| Record<BreakpointKey, number>` | `3` | ✅ | - |
| `colonless` | 配置 `IxDescItem` 的 `colonless` 默认值 | `boolean` | `false` | ✅ | `seer` 主题默认为 `true` |
| `header` | 配置头部信息 | `string \| HeaderProps` | - | - | - |
| `labelAlign` | 配置 `IxDescItem` 的 `labelAlign` 默认值 | `'start' \| 'end'` | `'end'` | ✅ | `seer` 主题默认为 `'start'` <br/> `layout` 为 `vertical` 时无效  |
| `labelWidth` | 配置 `IxDescItem` 的 `labelWidth` 默认值 | `string \| number` | - | - | - |
| `layout` | 描述列表布局 | `'horizontal' \| 'vertical'` | `'horizontal'` | ✅ | - |
| `size` | 描述列表大小 | `'sm' \| 'md' \| 'lg'` | `'md'` | ✅ | - |

#### DescSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 内容区域 | - | - |
| `header` | 自定义头部 | - | - |
| `suffix` | 自定义头部的后缀区域 | - | - |

### IxDescItem

#### DescItemProps

> 除以下表格之外还支持 `IxCol` 的[所有配置](/components/grid/zh?tab=api#ColProps)。
| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `col` | 包含列的数量 | `number \| Record<BreakpointKey, number>` | `1` | - | - |
| `colonless` | 是否不显示 `label` 后面的冒号 | `boolean` | - | - | - |
| `label` | `label` 标签的文本 | `string` | - | - | - |
| `labelAlign` | `label` 标签文本的对齐方式 | `'start' \| 'end'` | - | - | - |
| `labelWidth` | `label` 标签文本的宽度 | `string \| number` | - | - | - |

#### DescItemSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 内容区域 | - | - |
| `label` | 自定义 `label` 标签的文本 | - | - |
