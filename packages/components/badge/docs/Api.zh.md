
### IxBadge

#### BadgeProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `dot` | 圆点徽标 | `boolean` | `false`  | ✅ | - |
| `count` | 数值徽标的值 | `number` | `0` | - | - |
| `overflowCount` | 最大数值徽标的值 | `number` | `99` | ✅ | 超出以`${overflowCount}+`显示 |
| `showZero`| 数值为 0 时是否显示 | `boolean` | `false` | ✅ | - |
| `color` | 徽标的颜色 | `string` | - | - | 数值徽标和圆点徽标为设置背景色，组件徽标为字体颜色 |

#### BadgeSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 需要添加徽标的内容 | - | - |
| `count`   | 自定义徽标 | - | - |
