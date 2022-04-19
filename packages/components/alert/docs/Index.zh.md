---
category: components
type: 反馈
title: Alert
subtitle: 警告提示
---

## API

### IxAlert

#### Props

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `closable` | 信息提示是否可关闭 | `boolean` | `false` | ✅ |- |
| `closeIcon` | 自定义关闭按钮 | `string \| #closeIcon` | `close` | - | - |
| `description` | 辅助性文字介绍 | `string \| #description` | - | - |- |
| `icon` | 自定义图标 | `string \| #icon` | - | ✅ | 若要隐藏图标则传空串 |
| `pagination` | 是否开启分页切换 | `boolean \| AlertPagination` | `false` | - | - |
| `type` | 设置提示类型 | `'success' \| 'info' \| 'warning' \| 'error'` | `'info'` | - |- |
| `title` | 信息提示内容 | `string \| string[] \| #default` | - | - |- |
| `onBeforeClose` | 关闭提示前会触发的回调函数 | `() => boolean \| Promise<boolean>` | - | - | - |
| `onClose` | 关闭提示会触发的回调函数 | `() => void` | - | - | - |

```ts
export interface AlertPagination {
  pageIndex?: number
  onChange?: (pageIndex: number) => void
}
```

<!--- insert less variable begin  --->
## 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@alert-success-color` | `@color-success-d10` | - | - |
| `@alert-info-color` | `@color-info-d10` | - | - |
| `@alert-warning-color` | `@color-warning-d10` | - | - |
| `@alert-error-color` | `@color-error-d10` | - | - |
| `@alert-success-background-color` | `@color-success-l50` | - | - |
| `@alert-info-background-color` | `@color-info-l50` | - | - |
| `@alert-warning-background-color` | `@color-warning-l50` | - | - |
| `@alert-error-background-color` | `@color-error-l50` | - | - |
| `@alert-color` | `@text-color` | - | - |
| `@alert-color-secondary` | `@text-color-secondary` | - | - |
| `@alert-disabled-color` | `@disabled-color` | - | - |
| `@alert-font-size` | `@font-size-md` | - | - |
| `@alert-line-height` | `@line-height-base` | - | - |
| `@alert-border-radius` | `@border-radius-sm` | - | - |
| `@alert-margin-bottom` | `@spacing-lg` | - | - |
| `@alert-padding` | `@spacing-sm @spacing-lg` | - | - |
| `@alert-icon-margin-right` | `@spacing-sm` | - | - |
| `@alert-icon-font-size-with-description` | `@font-size-xl` | - | - |
| `@alert-icon-margin-right-with-description` | `@spacing-lg` | - | - |
| `@alert-title-font-size-with-description` | `@font-size-lg` | - | - |
| `@alert-title-margin-bottom-with-description` | `@spacing-xs` | - | - |
| `@alert-pagination-text-padding` | `0 @spacing-xs` | - | - |
| `@alert-action-margin-left` | `@spacing-lg` | - | - |
| `@alert-icon-font-size` | `@font-size-lg` | - | - |
<!--- insert less variable end  --->