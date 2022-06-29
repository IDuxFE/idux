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
| `headerMenu` | 顶部菜单组件的更多配置 | `MenuProps` | - | - | 例如：`getKey` |
| `menus` | 菜单数据 | `MenuData[]` | `[]` | - | - |
| `compress` | 展开侧边栏是否压缩右侧内容区域 | `boolean` | `true` | - | 设置为 `false`时必须设置 `IxProLayout` 高度 |
| `sider` | 侧边栏的更多配置 | `LayoutSiderProps` | - | - | 例如：可以配置响应式断点：`breakpoint` |
| `siderHover` | 鼠标悬浮侧边栏时展开 | `boolean \| SiderHover` | `-` | - | `delay`单位为 `ms` |
| `siderMenu` | 侧边栏菜单组件的更多配置 | `MenuProps` | - | - | 例如：`getKey`, `indent` 和 `mode` |
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
interface SiderHover {
  delay: number
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

| 名称 | default | seer | 备注 |
| --- | --- | --- | --- |
| `@pro-layout-height` | `100%` | - | - |
| `@pro-layout-header-light-color` | `@text-color` | - | - |
| `@pro-layout-header-light-hover-color` | `@text-color` | - | - |
| `@pro-layout-header-light-hover-background-image` | `none` | - | - |
| `@pro-layout-header-light-background-color` | `@color-white` | - | - |
| `@pro-layout-header-light-hover-background-color` | `@color-primary-l50` | - | - |
| `@pro-layout-header-light-active-color` | `@text-color` | - | - |
| `@pro-layout-header-light-active-box-shadow` | `none` | - | - |
| `@pro-layout-header-light-active-background-color` | `@color-graphite-l40` | - | - |
| `@pro-layout-header-light-box-shadow` | `inset 0 -1px 0 0 @color-graphite-l30` | - | - |
| `@pro-layout-header-dark-color` | `@color-white` | - | - |
| `@pro-layout-header-dark-hover-color` | `@color-white` | - | - |
| `@pro-layout-header-dark-hover-background-image` | `linear-gradient(  180deg,  rgba(28, 110, 255, 0.1) 0%,  rgba(28, 110, 255, 0) 100%)` | - | - |
| `@pro-layout-header-dark-background-color` | `@color-graphite-d40` | - | - |
| `@pro-layout-header-dark-hover-background-color` | `@color-graphite-d40` | - | - |
| `@pro-layout-header-dark-active-color` | `@color-white` | - | - |
| `@pro-layout-header-dark-active-box-shadow` | `inset 0 2px 0 0 @color-primary` | - | - |
| `@pro-layout-header-dark-active-background-color` | `@color-graphite-d30` | - | - |
| `@pro-layout-header-dark-box-shadow` | `none` | - | - |
| `@pro-layout-header-height` | `@layout-header-height` | `44px` | - |
| `@pro-layout-header-menu-item-line-height` | `@pro-layout-header-height - 2` | - | - |
| `@pro-layout-header-logo-width` | `@pro-layout-sider-width - 24px` | `@pro-layout-sider-width - 16px` | - |
| `@pro-layout-header-extra-width` | `256px` | - | - |
| `@pro-layout-header-item-margin` | `0` | - | - |
| `@pro-layout-header-item-padding` | `0 @spacing-lg` | `0 20px` | - |
| `@pro-layout-header-vertical-menu-item-font-size` | `@font-size-sm` | - | - |
| `@pro-layout-header-vertical-menu-item-height` | `32px` | - | - |
| `@pro-layout-header-vertical-menu-item-line-height` | `32px` | - | - |
| `@pro-layout-sider-light-color` | `@text-color` | - | - |
| `@pro-layout-sider-light-hover-color` | `@text-color` | - | - |
| `@pro-layout-sider-light-background-color` | `@color-graphite-l50` | - | - |
| `@pro-layout-sider-light-hover-background-color` | `@color-primary-l50` | - | - |
| `@pro-layout-sider-light-active-color` | `@color-primary` | - | - |
| `@pro-layout-sider-light-active-background-color` | `@color-primary-l50` | - | - |
| `@pro-layout-sider-light-active-color-secondary` | `@color-graphite-d50` | - | - |
| `@pro-layout-sider-light-active-icon-color` | `@color-graphite-d20` | - | - |
| `@pro-layout-sider-light-collapsed-active-color` | `@color-primary` | - | - |
| `@pro-layout-sider-light-collapsed-active-background-color` | `@color-primary-l50` | - | - |
| `@pro-layout-sider-light-icon-color` | `@color-graphite` | - | - |
| `@pro-layout-sider-light-border-right` | `1px solid @color-graphite-l30` | - | - |
| `@pro-layout-sider-light-divider-color` | `@color-white` | - | - |
| `@pro-layout-sider-dark-color` | `@color-graphite-l10` | - | - |
| `@pro-layout-sider-dark-hover-color` | `@color-graphite-l10` | - | - |
| `@pro-layout-sider-dark-background-color` | `@color-graphite-d40` | - | - |
| `@pro-layout-sider-dark-hover-background-color` | `@color-graphite-d50` | - | - |
| `@pro-layout-sider-dark-active-color` | `@color-white` | - | - |
| `@pro-layout-sider-dark-active-background-color` | `@color-primary` | - | - |
| `@pro-layout-sider-dark-active-color-secondary` | `@color-white` | - | - |
| `@pro-layout-sider-dark-active-icon-color` | `@color-white` | - | - |
| `@pro-layout-sider-dark-collapsed-active-color` | `@color-white` | - | - |
| `@pro-layout-sider-dark-collapsed-active-background-color` | `@color-primary` | - | - |
| `@pro-layout-sider-dark-icon-color` | `@color-graphite` | - | - |
| `@pro-layout-sider-dark-border-right` | `none` | - | - |
| `@pro-layout-sider-dark-divider-color` | `@color-graphite-d30` | - | - |
| `@pro-layout-sider-width` | `@layout-sider-width` | - | - |
| `@pro-layout-sider-collapsed-width` | `@layout-sider-collapsed-width` | - | - |
| `@pro-layout-sider-box-shadow` | `0 2px 8px 0 rgba(0, 0, 0, 0.08)` | - | - |
| `@pro-layout-sider-header-height` | `@height-xl` | - | - |
| `@pro-layout-sider-footer-height` | `@height-xl` | - | - |
| `@pro-layout-sider-trigger-font-size` | `@font-size-lg` | - | - |
| `@pro-layout-sider-trigger-background` | `inherit` | - | - |
| `@pro-layout-sider-trigger-color` | `@text-color` | - | - |
| `@pro-layout-sider-trigger-active-color` | `@color-primary` | - | - |
| `@pro-layout-sider-menu-sub-inline-font-size` | `@font-size-sm` | - | - |
| `@pro-layout-sider-menu-group-label-font-size` | `@font-size-sm` | - | - |
| `@pro-layout-sider-menu-span-margin-left` | `@spacing-sm` | - | - |
<!--- insert less variable end  --->
