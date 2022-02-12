---
category: components
type: 反馈
title: Result
subtitle: 结果
cover:
---

## API

### IxResult

#### ResultProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `icon` | 自定义图标 | `string \| VNode \| #icon` | - | ✅ | - |
| `status` | 当前结果的状态 | `ResultStatus` | - | ✅ | 结果的状态，决定图标和颜色 |
| `subtitle` | subtitle 文字 | `string \| #subtitle` | - | - | `slot`形式优先级高于`prop` |
| `title` | title文字 | `string \| #title` | - | - | `slot`形式优先级高于`prop` |

```typescript
type ResultStatus = 'success' | 'error' | 'info' | 'warning'
```

#### ResultSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 复杂的情况说明，用于显示更多的信息 | - | - |
| `extra` | 操作区 | - | - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@result-padding` | `@spacing-gutter * 6 @spacing-gutter * 4` | - | - |
| `@result-text-align` | `center` | - | - |
| `@result-icon-margin` | `@spacing-lg` | - | - |
| `@result-icon-size` | `@font-size-md * 4` | - | - |
| `@result-title-font-size` | `@font-size-2xl` | - | - |
| `@result-title-color` | `@text-color` | - | - |
| `@result-title-font-weight` | `@font-weight-md` | - | - |
| `@result-title-line-height` | `1.8` | - | - |
| `@result-subtitle-font-size` | `@font-size-md` | - | - |
| `@result-subtitle-color` | `@color-graphite-d10` | - | - |
| `@result-subtitle-font-weight` | `@font-weight-md` | - | - |
| `@result-subtitle-line-height` | `1.6` | - | - |
| `@result-extra-margin` | `@spacing-xl` | - | - |
| `@result-extra-children-margin` | `@spacing-sm` | - | - |
| `@result-content-margin` | `@spacing-xl` | - | - |
| `@result-content-padding` | `@spacing-xl @spacing-gutter * 5` | - | - |
| `@result-content-background-color` | `@color-grey-l50` | - | - |
| `@result-success` | `@color-success` | - | - |
| `@result-warning` | `@color-warning` | - | - |
| `@result-error` | `@color-error` | - | - |
| `@result-info` | `@color-info` | - | - |
<!--- insert less variable end  --->