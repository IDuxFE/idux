---
category: components
type: 导航
title: Menu
subtitle: 导航菜单
order: 0
single: true
---

为页面和功能提供导航的菜单列表。

## 何时使用

导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转，一般分为顶部导航和侧边导航。

- 顶部导航提供全局性的类目和功能
- 侧边导航提供多级结构来收纳和排列网站架构。

## API

### ix-menu

#### MenuProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:openedIds` | 当前展开的 `ix-sub-menu` 的 `cid` 数组 | `Array<string \| number>` | `[]` | - | - |
| `v-model:selectedIds` | 当前选中的 `ix-menu-item` 的 `cid` 数组 | `Array<string \| number>` | `[]` | - | - |
| `collapsed` | 菜单收起状态 | `boolean` | `false` | - | - |
| `indent` | `inline` 模式时的菜单缩进宽度 | `string \| number` | `24px` | ✅ | 仅支持 `inline` 模式 |
| `mode` | 菜单模式，现在支持垂直、水平和内嵌 | `vertical \| horizontal \| inline` | `vertical` | - | - |
| `multiple` | 是否支持多选 | `boolean` | `false` | - | - |
| `selectable` | 是否允许选中 | `boolean` | `true` | - | - |
| `theme` | 主题颜色 | `light` | `light \| dark` | ✅ | - |

#### MenuEmits

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `click` | 点击 `ix-menu-item` 后的回调 | `{ evt: Event, cid: string \| number, item: MenuItemProps }` | - |

### ix-menu-item

#### MenuItemProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `cid` | 唯一标识 | `sting \| number` | `uid` | - | 如果需要切换 `mode` 或者 `collapsed`, 请手动指定 `cid` |
| `disabled` | 是否禁用 | `boolean` | `false` | - | - |
| `icon` | 菜单图标| `string \| v-slot:icon` | - | - |
| `title` | 菜单标题 | `string \| v-slot:default`  | - | - |

### ix-sub-menu

#### SubMenuProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `cid` | 唯一标识 | `sting \| number` | `uid` | - | 如果需要切换 `mode` 或者 `collapsed`, 请手动指定 `cid` |
| `disabled` | 是否禁用 | `boolean` | `false` | - | - |
| `icon` | 菜单图标| `string \| v-slot:icon` | - | - | - |
| `overlayClass` | 悬浮层的自定义 `class` | `string` | - | - | - |
| `suffix` | 后缀图标 | `string` | `right` | ✅ | - |
| `suffixRotates` | 展开收起时后缀图标旋转角度 | `[number, number]` | `[-90, 90]` | ✅ | 仅 `inline` 模式下生效 |
| `title` | 菜单标题 | `string \| v-slot:title`  | - | - |

#### SubMenuEmits

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `click` | 点击子菜单标题后的回调 | `{ evt: Event, cid: string \| number }` | - |

### ix-menu-group

#### MenuGroupProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `icon` | 菜单图标| `string \| v-slot:icon` | - | - |
| `title` | 菜单标题 | `string \| v-slot:title`  | - | - |

### ix-menu-divider

菜单分割线。
