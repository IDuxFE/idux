---
category: components
type: 布局
title: Divider
subtitle: 分割线
cover:
---

## API

### IxDivider

#### DividerProps

| 名称 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `dashed` | 是否虚线 | `boolean` | `false` | ✅ | - |
| `label` | 分割线显示文字 | `string \| #default` | - | - | `vertical` 模式下不可用 |
| `labelPlacement` | 文字显示位置 | `'start' \| 'center' \| 'end'` | `center`| ✅ | - |
| `plain` | 文字是否显示为普通正文样式 | `boolean` | `false` | ✅ | - |
| `size` | 分割线大小 | `'sm' \| 'md' \| 'lg'` | `md` | ✅ | - |
| `vertical` | 是否为垂直分割线 | `boolean` | - | - | - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@divider-border-width` | `@border-width-sm` | - | - |
| `@divider-border-color` | `@border-color` | - | - |
| `@divider-font-size-sm` | `@font-size-lg` | - | - |
| `@divider-font-size-md` | `@font-size-xl` | - | - |
| `@divider-font-size-lg` | `@font-size-xl` | - | - |
| `@divider-horizontal-margin-sm` | `@spacing-md 0` | - | - |
| `@divider-horizontal-margin-md` | `@spacing-lg 0` | - | - |
| `@divider-horizontal-margin-lg` | `@spacing-xl 0` | - | - |
| `@divider-vertical-margin-sm` | `0 @spacing-xs` | - | - |
| `@divider-vertical-margin-md` | `0 @spacing-sm` | - | - |
| `@divider-vertical-margin-lg` | `0 @spacing-md` | - | - |
<!--- insert less variable end  --->