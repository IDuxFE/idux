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
