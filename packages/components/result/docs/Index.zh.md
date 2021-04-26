---
category: components
type: 反馈
title: Result
subtitle: 结果
cover:
---

用于反馈一系列操作任务的处理结果。

## 何时使用

当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用。

## API

### `ix-result`

#### Props

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `icon` | 自定义图标 | `string \| v-slot: icon` | - | - | - |
| `status` | 当前结果的状态 | `ResultStatus` | - | ✅ | 结果的状态，决定图标和颜色 |
| `subtitle` | subtitle 文字 | `string \| v-slot: subtitle` | - | - | `slot`形式优先级高于`prop` |
| `title` | title文字 | `string \| v-slot: title` | - | - | `slot`形式优先级高于`prop` |

```typescript
type ResultStatus = 'success' | 'error' | 'info' | 'warning'
```

#### Slots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 复杂的情况说明，用于显示更多的信息 | - | - |
| `extra` | 操作区 | - | - |

### 主题变量

| 变量名 | default 主题| 说明 |
| --- | --- | --- |
| @result-padding | @spacing-gutter *6 @spacing-gutter* 4 | - |
| @result-text-align | `center` | - |
| @result-icon-margin | @margin-xl | - |
| @result-icon-size | @font-size-xl * 4 | - |
| @result-title-font-size | @font-size-2xl | - |
| @result-title-color | @black | - |
| @result-title-line-height | 1.8 | - |
| @result-subtitle-font-size | @font-size-md | - |
| @result-subtitle-color | @text-color-secondary | - |
| @result-subtitle-line-height | 1.6 | - |
| @result-extra-margin | @margin-xl | - |
| @result-extra-children-margin | @margin-sm | - |
| @result-content-margin | @margin-xl | - |
| @result-content-padding | @padding-xl @spacing-gutter * 5 | - |
| @result-content-background | @grey-l50 | - |
| @result-success | @green | - |
| @result-warning | @yellow | - |
| @result-error | @red | - |
| @result-info | @blue | - |
