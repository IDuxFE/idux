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
| `separator` | 分隔符 | `string \| #separator` | - | - | - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | default | seer | 备注 |
| --- | --- | --- | --- |
| `@breadcrumb-base-color` | `@text-color-secondary` | - | - |
| `@breadcrumb-link-color` | `@color-graphite` | - | - |
| `@breadcrumb-link-color-hover` | `@color-primary` | - | - |
| `@breadcrumb-separator-color` | `@text-color-secondary` | `@color-graphite-l10` | - |
| `@breadcrumb-last-item-color` | `@color-graphite-d40` | - | - |
| `@breadcrumb-font-size` | `@font-size-base` | - | - |
| `@breadcrumb-separator-margin` | `0 @margin-sm` | `0 @margin-xs` | - |
<!--- insert less variable end  --->