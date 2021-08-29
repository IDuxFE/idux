---
category: components
type: 布局
title: Layout
subtitle: 布局
order: 0
single: true
---
协助进行页面级整体布局。

Layout：布局容器，其下可嵌套 Header Sider Content Footer 或 Layout 本身，可以放在任何父容器中。

Header：顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。

Sider：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 Layout 中。

Content：内容部分，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。

Footer：底部布局，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。

由于整体采用了css grid布局，容器的整体布局设置为：

``` css
grid-template-areas:  
 "header header header"
 "sider-left content sider-right"
 "footer footer footer";
```

所以整体组件的排列顺序与flex布局时的结构不太一样

## API

### IxLayout

#### LayoutProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `siderOut` | 表示子组件中的sider是否在最外侧，即页面为左右布局 | `boolean` | `false` | - | - |

### IxLayoutHeader

#### LayoutHeaderProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `borderless` | 是否无边框 | `boolean` | `false` | - |  - |
| `height` | 顶部高度 | `number` | `80` | - |  - |

### IxLayoutSider

#### LayoutSiderProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `direction` | 侧边栏的位置 | `left \| right` | `left` | - | - |
| `borderless` | 是否无边框 | `boolean` | `false` | - |  - |
| `width` | 侧边栏宽度 | `number` | `272` | - |  - |
| `breakpoint` | 触发响应式布局的断点 | `xs`, `sm`, `md`, `lg`, `xl` | - | - |  - |
| `v-model: collapsed` | 当前收起状态 | `boolean` | - | - |  只有设置了`breakpoint`或者`v-model: collapsed`时，侧边栏才可以折叠；当两者同时存在时，以`v-model: collapsed`的值为默认折叠状态 |
| `collapsedWidth` | 折叠时的宽度 | `number` | `80` | - |  - |
| `trigger` | 自定义 trigger | `VNode` | - | - |  只有存在折叠状态时才有效，同时提供`trigger`插槽，同时存在时，属性值优先 |
| `onBreakpoint` | 触发响应式布局断点时的回调 |`(broken: 'collapsed: boolean') => {}` | - | - |  - |
| `onCollapse` | 展开-收起时的回调函数，有点击 trigger 以及响应式反馈两种方式可以触发 | `(collapsed: boolean, type: 'breakpoint\|trigger') => {}` | - | - |  - |

#### LayoutSiderSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| trigger | 当存在折叠状态时，自定义`trigger` | - | - |

### IxLayoutFooter

#### LayoutFooterProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `borderless` | 是否无边框 | `boolean` | `false` | - |  - |
| `height` | 底部高度 | `number` | `80` | - |  - |
