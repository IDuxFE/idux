---
category: components
type: 通用
title: Header
subtitle: 页头
order: 0
---

## API

### IxHeader

#### HeaderProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `avatar` | 自定义头像 | `string \| AvatarProps \| #avatar` | - | - | 传入 `string` 时，为头像的图标  |
| `description` | 标题下方的说明文字 | `string \| #description` | - | - | - |
| `disabled` | 是否禁用 | `boolean` | `false` | - | - |
| `prefix` | 标题前缀图标 | `string \| VNode \| #prefix` | - | - | - |
| `size` | 标题大小 | `'xl' \| 'lg' \| 'md' \| 'sm'` | `'md'` | - | - |
| `showBar` | 是否显示标题前的竖条 | `boolean` | `false` | - | - |
| `subTitle` | 二级标题文字 | `string \| #subTitle` | - | - | - |
| `suffix` | 标题后缀图标 | `string \| VNode \| #suffix` | - | - | 通常用于额外操作 |
| `title` | 标题文字 | `string \| #default` | - | - | - |
| `onPrefixClick` | 前缀图标被点击 | `(evt: MouseEvent) => void` | - | - | - |
| `onSuffixClick` | 后缀图标被点击 | `(evt: MouseEvent) => void` | - | - | - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@header-line-height` | `@line-height-base` | - | - |
| `@header-height-xl` | `@height-xl` | - | - |
| `@header-height-lg` | `@height-xl` | - | - |
| `@header-height-md` | `@height-lg` | - | - |
| `@header-height-sm` | `@height-md` | - | - |
| `@header-font-size` | `@font-size-md` | - | - |
| `@header-color` | `@text-color` | - | - |
| `@header-background-color` | `@background-color-component` | - | - |
| `@header-disabled-color` | `@disabled-color` | - | - |
| `@header-bar-width` | `@spacing-xs` | - | - |
| `@header-bar-margin` | `@spacing-sm 0` | - | - |
| `@header-bar-background-color` | `@color-primary` | - | - |
| `@header-prefix-margin-right` | `@spacing-sm` | - | - |
| `@header-prefix-padding-right` | `@spacing-sm` | - | - |
| `@header-prefix-border-right` | `@border-width-sm @border-style @border-color` | - | - |
| `@header-prefix-font-size` | `@font-size-lg` | - | - |
| `@header-prefix-active-color` | `@color-primary` | - | - |
| `@header-avatar-margin-right` | `@spacing-lg` | - | - |
| `@header-title-color` | `@color-graphite-d40` | - | - |
| `@header-title-font-weight` | `@font-weight-xl` | - | - |
| `@header-title-margin-right` | `@spacing-lg` | - | - |
| `@header-title-font-size-xl` | `@font-size-3xl` | - | - |
| `@header-title-font-size-lg` | `@font-size-2xl` | - | - |
| `@header-title-font-size-md` | `@font-size-xl` | - | - |
| `@header-title-font-size-sm` | `@font-size-lg` | - | - |
| `@header-sub-title-color` | `@text-color-secondary` | - | - |
| `@header-suffix-color` | `@text-color-secondary` | - | - |
| `@header-suffix-padding` | `0 @spacing-xs 0 @spacing-sm` | - | - |
| `@header-suffix-active-color` | `@header-title-color` | - | - |
| `@header-suffix-font-size` | `@font-size-lg` | - | - |
| `@header-suffix-font-size-sm` | `@font-size-md` | - | - |
| `@header-description-color` | `@text-color` | - | - |
| `@header-icon-font-size` | `@font-size-lg` | - | - |
<!--- insert less variable end  --->