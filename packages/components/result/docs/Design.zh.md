## 介绍

用于反馈各类操作任务结果的页面。

## 使用场景

- 当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用。
- 遇到特殊情况导致无法反馈结果时，会反馈错误原因：服务器错误、页面未找到等

## 构成

### 图标（必选）

表示当前结果的图标，一般有：成功、失败、告警、普通信息等，根据业务可加入自定义图标。

### 结果标题（必选）

用简要的文案告知用户当前的结果。

### 结果文案（可选）

辅助说明当前结果的详细信息的文案。

### 按钮（可选）

根据当前结果可以进行的后续操作。

### 主题变量

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
| `@result-content-background` | `@color-grey-l50` | - | - |
| `@result-success` | `@color-success` | - | - |
| `@result-warning` | `@color-warning` | - | - |
| `@result-error` | `@color-error` | - | - |
| `@result-info` | `@color-info` | - | - |
