## 组件定义

为页面和功能提供导航的菜单列表。

## 构成方式

用户依赖导航在各个页面中进行跳转，一般分为顶部导航和侧边导航。

- 顶部导航提供全局性的类目和功能
- 侧边导航提供多级结构来收纳和排列网站架构。

### 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@menu-text-color` | `@text-color` | - | - |
| `@menu-bg-color` | `@background-color-component` | - | - |
| `@menu-highlight-color` | `@color-primary` | - | - |
| `@menu-highlight-bg-color` | `~colorPalette('@{color-primary}', -50)` | - | - |
| `@menu-disabled-color` | `@disabled-color` | - | - |
| `@menu-disabled-bg-color` | `transparent` | - | - |
| `@menu-border-width` | `@border-width-sm` | - | - |
| `@menu-border-style` | `@border-style` | - | - |
| `@menu-border-color` | `@border-color-split` | - | - |
| `@menu-font-size` | `@font-size-md` | - | - |
| `@menu-item-height` | `@height-lg` | - | - |
| `@menu-item-padding-left` | `@spacing-md` | - | - |
| `@menu-item-padding-right` | `@spacing-xl` | - | - |
| `@menu-item-margin` | `@spacing-xs 0` | - | - |
| `@menu-item-icon-margin-right` | `@spacing-sm` | - | - |
| `@menu-item-border-right-width` | `@border-width-lg` | - | - |
| `@menu-item-border-bottom-width` | `@border-width-md` | - | - |
| `@menu-item-group-text-color` | `@text-color-secondary` | - | - |
| `@menu-item-group-content-padding-left` | `@spacing-xl` | - | - |
| `@menu-item-horizontal-padding` | `0 @spacing-xs` | - | - |
| `@menu-item-divider-margin` | `@spacing-xs` | - | - |
| `@menu-sub-suffix-icon-right` | `8px` | - | - |
| `@menu-overlay-zindex` | `@zindex-l4-3` | - | - |
| `@menu-overlay-min-width` | `128px` | - | - |
| `@menu-overlay-border-radius` | `@border-radius-md` | - | - |
| `@menu-overlay-box-shadow` | `@shadow-bottom-md` | - | - |
| `@menu-dark-disabled-color` | `@disabled-color-dark` | - | - |
| `@menu-dark-color` | `@text-color-dark` | - | - |
| `@menu-dark-bg-color` | `@background-color-component-dark` | - | - |
| `@menu-dark-highlight-bg-color` | `fade(@color-white, 6%)` | - | - |
| `@menu-collapsed-font-size` | `@font-size-lg` | - | - |
| `@menu-collapsed-width` | `64px` | - | - |
