---
category: components
type: 布局
title: Layout
subtitle: 布局
order: 0
---

## API

### IxLayout

布局容器, 其内可放置 `IxLayoutContent`, `IxLayoutFooter`, `IxLayoutHeader` 和 `IxLayoutSider` 等组件。

### IxLayoutContent

内容部分，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 `IxLayout` 中。

### IxLayoutFooter

内容部分，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 `IxLayout` 中。

### IxLayoutHeader

顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 `IxLayout` 中。

### IxLayoutSider

侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 `IxLayout` 中。

#### LayoutSiderProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:collapsed` | 是否折叠状态 | `boolean` | - | - | -  |
| `breakpoint` | 触发响应式布局的断点 | `xs`, `sm`, `md`, `lg`, `xl` | - | - |  - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@layout-header-background-color` | `@background-color-component` | - | - |
| `@layout-header-color` | `@text-color` | - | - |
| `@layout-header-height` | `64px` | - | - |
| `@layout-header-padding` | `0 @spacing-xl` | - | - |
| `@layout-header-box-shadow` | `0 2px 8px 0 rgba(0, 0, 0, 0.08)` | - | - |
| `@layout-footer-background` | `@background-color-component` | - | - |
| `@layout-footer-color` | `@text-color` | - | - |
| `@layout-footer-padding` | `@spacing-xl @spacing-3xl` | - | - |
| `@layout-sider-background` | `@background-color-component` | - | - |
| `@layout-sider-color` | `@text-color` | - | - |
| `@layout-sider-width` | `224px` | - | - |
| `@layout-sider-collapsed-width` | `64px` | - | - |
<!--- insert less variable end  --->