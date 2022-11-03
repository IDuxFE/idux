### IxCollapse

#### CollapseProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:expandedKeys` | 当前展开面板的 key | `VKey[]` | - | - |- |
| `accordion` | 是否开启手风琴模式 | `boolean` | `false` | ✅ | - |
| `borderless` | 无边框 | `boolean` | `false` | ✅ |- |
| `expandIcon` | 设置展开图标 | `string` | `'right'` | ✅ |- |
| `ghost` | 幽灵模式 | `boolean` | `false` | ✅ | 使折叠面板透明 |
| `size` | 折叠面板大小 | `'sm' \| 'md'` | `'md'` | ✅ | - |

#### CollapseSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `expandIcon` | 自定义展开图标 | `{ key: VKey, expanded: boolean }` | - |

### IxCollapsePanel

#### CollapsePanelProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `key` | 唯一标识符 | `string \| number` | `uid` | - | - |
| `disabled` | 是否禁用该面板 | `boolean` | `false` | - | - |
| `header` | 面板头内容 | `string \| HeaderProps` | - | - |- |

#### CollapsePanelSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `header` | 自定义面板头内容 | `{ expanded: boolean, changeExpand: () => void }` | - |
