### IxBadge

#### BadgeProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `count` | 数值徽标的值 | `number \| string` | `0` | - | - |
| `dot` | 是否显示圆点徽标 | `boolean \| 'inline'` | `false`  | - | - |
| `overflowCount` | 最大数值徽标的值 | `number` | `99` | ✅ | 超出以`${overflowCount}+`显示 |
| `showZero`| 数值为 0 时是否显示 | `boolean` | `false` | ✅ | - |
| `status`| 徽标状态 | `'success' \| 'info' \| 'error' \| 'warning'` | `'error'` | - | - |
| `processing` | 标记当前正在处理中 | `boolean` | `false` | - | - |
| `title` | 自定义徽标的 title | `number` | - | - | 默认显示 `count` 的值 |

#### BadgeSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 需要添加徽标的内容 | - | 如果没有就为独立使用的模式 |
| `count`   | 自定义徽标 | - | - |
