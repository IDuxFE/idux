---
category: components
type: 导航
title: Menu
subtitle: 导航菜单
order: 0
single: true
---

为页面和功能提供导航的菜单列表。

用户依赖导航在各个页面中进行跳转，一般分为顶部导航和侧边导航。

- 顶部导航提供全局性的类目和功能
- 侧边导航提供多级结构来收纳和排列网站架构。

## API

### IxMenu

#### MenuProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:expandedKeys` | 当前展开的 `IxMenuSub` 的 `key` 数组 | `Array<string \| number>` | - | - | - |
| `v-model:selectedKeys` | 当前选中的 `IxMenuItem` 的 `key` 数组 | `Array<string \| number>` | - | - | - |
| `collapsed` | 菜单收起状态 | `boolean` | `false` | - | - |
| `collapsedWidth` | 菜单收起时的宽度 | `string \| number` | `64` | ✅ | `horizontal` 模式时无效 |
| `indent` | `inline` 模式时的菜单缩进宽度 | `string \| number` | `24` | ✅ | 仅支持 `inline` 模式 |
| `mode` | 菜单模式，现在支持垂直、水平和内嵌 | `vertical \| horizontal \| inline` | `vertical` | - | - |
| `multiple` | 是否支持多选 | `boolean` | `false` | - | - |
| `selectable` | 是否允许选中 | `boolean` | `true` | - | - |
| `theme` | 主题颜色 | `light` | `light \| dark` | ✅ | - |
| `onItemClick` | 点击 `IxMenuItem` 后的回调 | `(key: string \| number, evt: Event) => void` | ✅ | - |

### IxMenuItem

#### MenuItemProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `key` | 唯一标识 | `sting \| number` | `uid` | - | - |
| `disabled` | 是否禁用 | `boolean` | `false` | - | - |
| `icon` | 菜单图标| `string \| #icon` | - | - |
| `label` | 菜单文本 | `string \| #default`  | - | - |

### IxMenuSub

#### MenuSubProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `key` | 唯一标识 | `sting \| number` | `uid` | - | - |
| `disabled` | 是否禁用 | `boolean` | `false` | - | - |
| `icon` | 菜单图标| `string \| #icon` | - | - | - |
| `overlayClass` | 悬浮层的自定义 `class` | `string` | - | - | - |
| `suffix` | 后缀图标 | `string` | `right` | ✅ | - |
| `suffixRotates` | 展开收起时后缀图标旋转角度 | `[number, number]` | `[-90, 90]` | ✅ | 仅 `inline` 模式下生效 |
| `label` | 菜单文本 | `string \| #label`  | - | - |

### IxMenuItemGroup

#### MenuItemGroupProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `icon` | 菜单图标| `string \| #icon` | - | - |
| `label` | 菜单文本 | `string \| #label`  | - | - |

### IxMenuDivider

菜单分割线。
