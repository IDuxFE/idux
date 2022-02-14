---
category: components
type: 数据展示
title: Empty
subtitle: 空数据
cover:
cols: 1
---

## API

### IxEmpty

#### EmptyProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `description` | 自定义描述内容 | `string \| #description` | - | - | - |
| `icon` | 设置自定义图标 | `string` | `empty` | ✅ | - |
| `image` | 设置自定义图片地址 | `string \| #image` | - | ✅ | 优先级高于 `icon` |

#### EmptySlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 自定义 `content` 区域内容 | - | - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@empty-line-height` | `@line-height-base` | - | - |
| `@empty-margin` | `@spacing-lg 0` | - | - |
| `@empty-image-margin-bottom` | `@spacing-sm` | - | - |
| `@empty-image-icon-opacity` | `0.3` | - | - |
| `@empty-image-icon-font-size` | `64px` | - | - |
| `@empty-image-icon-color` | `@text-color` | - | - |
| `@empty-description-opacity` | `1` | - | - |
| `@empty-description-margin` | `0` | - | - |
| `@empty-description-color` | `@color-graphite-d10` | - | - |
| `@empty-description-font-size` | `@font-size-md` | - | - |
| `@empty-content-margin-top` | `@spacing-lg` | - | - |
| `@empty-content-color` | `@color-graphite` | - | - |
| `@empty-content-font-size` | `@font-size-md` | - | - |
<!--- insert less variable end  --->