---
category: pro
type: 布局
title: ProLayout
subtitle: 高级布局
order: 0
single: true
---

## API

### IxProLayout

### ProLayoutProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:activeKey` | 当前激活的菜单 | `VKey` | `menus`第一个叶子节点 | - | - |
| `v-model:collapsed` | 左侧菜单折叠收起 | `boolean` | `false` | - | 仅对于侧边菜单生效 |
| `fixed` | 固定 | `boolean \| {sider: boolean, header: boolean}` | `false` | - | - |
| `menus` | 菜单数据 | `MenuData[]` | `[]` | - | - |
| `sider` | 侧边栏的更多配置 | `LayoutSiderProps` | - | - | 例如：可以配置响应式断点：`breakpoint` |
| `siderMenu` | 侧边栏菜单组件的更多配置 | `MenuProps` | - | - | 例如：可以配置缩进宽度：`indent` 和菜单模式: `mode` |
| `theme` | 主题 | `light \| dark \| {sider: light \| dark, header: light \| dark}` | `light` | - | - |
| `type` | 布局类型 | `'header' \| 'sider' \| 'both' \| 'mixin'` | `mixin` | - | 参见示例：[布局类型](#pro-layout-demo-Type) |
| `onMenuClick` | 点击菜单回调 | `(options: MenuClickOptions) => void>`| - | -  | - |

### ProLayoutSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 页面内容区域  | - | - |
| `logo` | 顶部左侧区域 | - | 一般用于展示 logo 和标题  |
| `headerContent` | 顶部中间区域 | `MenuProps` | 默认会渲染一个 `IxMenu` 组件 |
| `headerExtra` | 顶部右侧区域 | -  | 一般用于展示登录状态、系统消息等  |
| `siderHeader` | 侧边栏顶部区域 | -| 一般用于展示模块名称或者折叠触发器，当 `type=sider` 时，也可以用于展示 logo   |
| `siderContent` | 侧边栏中间区域 | `MenuProps`  | 默认会渲染一个 `IxMenu` 组件 |
| `siderFooter` | 侧边栏底部区域 | -  | 一般用于显示工具类按钮，例如：折叠触发器 |

### IxProLayoutSiderTrigger

侧边栏折叠状态触发器，可以控制侧边栏的折叠状态，只能放在 `IxProLayout` 中。

#### ProLayoutSiderTriggerProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `icon` | 自定义折叠图标 | `Array<string \| VNode> \| #default={collapsed: boolean}` | - | - | 默认为 `[menu-fold, menu-unfold]` |
