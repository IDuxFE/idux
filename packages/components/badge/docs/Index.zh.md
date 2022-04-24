---
category: components
type: 数据展示
title: Badge
subtitle: 徽标数
cover:
---

## API

### IxBadge

#### Props

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `dot` | 圆点徽标 | `boolean` | `false`  | ✅ | - |
| `count` | 数值徽标的值 | `number` | `0` | - | - |
| `overflowCount` | 最大数值徽标的值 | `number` | `99` | ✅ | 超出以`${overflowCount}+`显示 |
| `showZero`| 数值为 0 时是否显示 | `boolean` | `false` | ✅ | - |
| `color` | 徽标的颜色 | `string` | - | - | 数值徽标和圆点徽标为设置背景色，组件徽标为字体颜色 |

### Slots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 需要添加徽标的内容 | - | - |
| `count`   | 自定义徽标 | - | - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | default | seer | 备注 |
| --- | --- | --- | --- |
| `@badge-zindex` | `@zindex-auto` | - | - |
| `@badge-font-size` | `@font-size-sm` | - | - |
| `@badge-line-height` | `14px` | - | - |
| `@badge-size` | `16px` | - | - |
| `@badge-color` | `@color-red` | - | - |
| `@badge-padding` | `0 4px` | - | - |
| `@badge-dot-size` | `6px` | - | - |
| `@badge-border-radius` | `10px` | - | - |
<!--- insert less variable end  --->