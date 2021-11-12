---
category: components
type: 数据展示
title: Collapse
subtitle: 折叠面板
order: 0
---

可以展开和折叠的区域

- 对较复杂区域进行分组和隐藏，保持简洁
- **手风琴**模式，只允许单个展开

## API

### IxCollapse

#### CollapseProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:expandedKeys` | 当前展开面板的 key | `(string \| number)[]` | - | - |- |
| `accordion` | 是否开启手风琴模式 | `boolean` | `false` | ✅ | - |
| `borderless` | 是否显示边框 | `boolean` | `false` | ✅ |- |
| `expandIcon` | 自定义展开图标 | `string \| #expandIcon="{key, expanded}"` | `'right'` | ✅ |- |
| `ghost` | 幽灵模式 | `boolean` | `false` | ✅ | 使折叠面板透明且无边框 |

### IxCollapsePanel

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `key` | 唯一标识符 | `string \| number` | `uid` | - | - |
| `disabled` | 是否禁用该面板 | `boolean` | `false` | - | - |
| `header` | 面板头内容 | `string \| HeaderProps \| #header="{expanded, onClick}"` | - | - |- |
