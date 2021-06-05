---
category: components
type: 数据展示
title: Collapse
subtitle: 折叠面板
order: 0
---

可以展开和折叠的区域

## 何时使用

- 对较复杂区域进行分组和隐藏，保持简洁
- **手风琴**模式，只允许单个展开

## API

### `ix-collapse`

#### Props

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `accordion` | 是否开启手风琴模式 | `boolean` | `false` | ✅ | 开启手风琴，每次只能展开一个 tab |
| `active(v-model)` | 当前激活面板对应的 name | `string[] \| string` | - | - |- |
| `borderless` | 是否显示边框 | `boolean` | `true` | - |- |

#### Slots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 面板内容 | - | - | - |

### `ix-collapse-panel`

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `name` | 唯一标识符 | `string` | - | - | - |
| `title` | 折叠面板标题 | `string` | - | - | - |
| `disabled` | 是否禁用该面板 | `boolean` | `false` | - | - |
| `icon` | 自定义左侧图标 | `string` | - | - |- |
