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

整体采用了css grid布局，容器的整体布局设置为：

``` css
grid-template-areas:  
 "header header header"
 "sider-start content sider-end"
 "footer footer footer";
```

## API

### IxLayout

#### LayoutProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `outSider` | 表示子组件中的sider是否在最外侧，即页面为左右布局 | `boolean` | `false` | - | - |

### IxLayoutSider

#### LayoutSiderProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `placement` | 侧边栏的位置 | `start \| end` | `start` | - | - |
| `breakpoint` | 触发响应式布局的断点 | `xs`, `sm`, `md`, `lg`, `xl` | - | - |  - |
| `v-model: collapsed` | 当前收起状态 | `boolean` | - | - |  不建议`breakpoint`和`v-model: collapsed`同时存在，若存在则以`breakpoint`的值为默认折叠状态 |
| `showTrigger` | 是否展示trigger | `boolean` | `false` | - |  配合`breakpoint`或者`v-model: collapsed` 一起使用 |
| `onCollapse` | 展开-收起时的回调函数，有点击 trigger 以及响应式反馈两种方式可以触发 | `(collapsed: boolean, type: 'breakpoint\|trigger') => {}` | - | - |  - |

#### LayoutSiderSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| trigger | 当存在折叠状态时，自定义`trigger` | - | - |
