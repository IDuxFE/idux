---
category: components
type: 导航
title: Breadcrumb
subtitle: 面包屑
order: 0
---

## API

### IxBreadcrumb

#### BreadcrumbProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `separator` | 分隔符 | `string` | `/` | - | - |

#### BreadcrumbItemProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `separator` | 分隔符 | `string \| #separator` | - | - | `separator slot` 优先级最高，其次为 `separator prop`。 |
