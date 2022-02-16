---
category: pro
type: 布局
title: ProLayout
subtitle: 高级布局
order: 0
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
| `compress` | 展开侧边栏是否压缩右侧内容区域 | `boolean` | `true` | - | 设置为 `false`时必须设置 `IxProLayout` 高度 |
| `hoverTrigger` | 鼠标悬浮侧边栏时展开 | `HoverTriggerOption` | `{ enable: false, delay: 0 }` | - | `delay`单位为 `ms` |
| `sider` | 侧边栏的更多配置 | `LayoutSiderProps` | - | - | 例如：可以配置响应式断点：`breakpoint` |
| `siderMenu` | 侧边栏菜单组件的更多配置 | `MenuProps` | - | - | 例如：可以配置缩进宽度：`indent` 和菜单模式: `mode` |
| `theme` | 主题 | `light \| dark \| {sider: light \| dark, header: light \| dark}` | `light` | - | - |
| `type` | 布局类型 | `'header' \| 'sider' \| 'both' \| 'mixin'` | `mixin` | - | 参见示例：[布局类型](#pro-layout-demo-Type) |
| `onMenuClick` | 点击菜单回调 | `(options: MenuClickOptions) => void`| - | -  | - |

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

> 为了便于自定义导航菜单，除了上面表格中列举出来的插槽外，还支持 `IxMenu` 的全部插槽，参见 [MenuSlots](/components/menu/zh#MenuSlots).  
> 默认会将 `IxProLayout` 的所有插槽传递给内部的 `IxMenu` 组件，参考示例中的 `itemLabel` 插槽。

```ts
interface HoverTriggerOption {
  enable: boolean
  delay?: number
}
```

### IxProLayoutSiderTrigger

侧边栏折叠状态触发器，可以控制侧边栏的折叠状态，可以放在 `IxProLayout` 中的任意位置。

#### ProLayoutSiderTriggerProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `icon` | 自定义折叠图标 | `Array<string \| VNode> \| #default={collapsed: boolean}` | - | - | 默认为 `[menu-fold, menu-unfold]` |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@pro-layout-height` | `100%` | - | - |
| `@pro-layout-light-color` | `@text-color` | - | - |
| `@pro-layout-dark-color` | `@text-color-dark` | - | - |
| `@pro-layout-light-background-color` | `@background-color-component` | - | - |
| `@pro-layout-dark-background-color` | `@background-color-component-dark` | - | - |
| `@pro-layout-light-hover-color` | `@pro-layout-light-color` | - | - |
| `@pro-layout-dark-hover-color` | `@color-white` | - | - |
| `@pro-layout-light-hover-background-color` | `@color-primary-l50` | - | - |
| `@pro-layout-dark-hover-background-color` | `@color-primary` | - | - |
| `@pro-layout-light-active-color` | `@color-white` | - | - |
| `@pro-layout-dark-active-color` | `@color-white` | - | - |
| `@pro-layout-light-active-background-color` | `@color-primary` | - | - |
| `@pro-layout-dark-active-background-color` | `@color-primary` | - | - |
| `@pro-layout-header-height` | `@layout-header-height` | - | - |
| `@pro-layout-header-box-shadow` | `0 2px 8px 0 rgba(0, 0, 0, 0.08)` | - | - |
| `@pro-layout-header-logo-width` | `@pro-layout-sider-width - 24px` | - | - |
| `@pro-layout-header-extra-width` | `256px` | - | - |
| `@pro-layout-header-item-radius` | `24px` | - | - |
| `@pro-layout-header-item-margin` | `0 @spacing-xs` | - | - |
| `@pro-layout-header-item-padding` | `0 @spacing-md` | - | - |
| `@pro-layout-sider-width` | `@layout-sider-width` | - | - |
| `@pro-layout-sider-collapsed-width` | `@layout-sider-collapsed-width` | - | - |
| `@pro-layout-sider-box-shadow` | `0 2px 8px 0 rgba(0, 0, 0, 0.08)` | - | - |
| `@pro-layout-sider-header-height` | `@height-xl` | - | - |
| `@pro-layout-sider-footer-height` | `@height-xl` | - | - |
| `@pro-layout-sider-trigger-font-size` | `@font-size-lg` | - | - |
| `@pro-layout-sider-trigger-background` | `inherit` | - | - |
| `@pro-layout-sider-trigger-color` | `@text-color` | - | - |
| `@pro-layout-sider-trigger-active-color` | `@color-primary` | - | - |
<!--- insert less variable end  --->