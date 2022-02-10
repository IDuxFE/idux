## 组件定义

给予用户当前系统执行中任务运行状态的反馈。

## 使用场景

多用于运行一段时间的场景，有效减轻用户在等待中产生的焦虑感。

## 组件类型

| 名称 | 说明  |
| --- | ---  |
| 标准进度条 | 进度条常见的形式，分为基础进度条、含有读数的进度条、含图标的进度条等。|
| 环形进度条 | 分为基础进度环、含读数进度环、含图标进度环等；相较于标准进度条占用更多的空间，但是视觉效果更强。当需要展示一个项目的多个指标且空间足够时，可以使用环形进度条。 |
| 微型进度条 | 常用于表示图片上传进度。|

## 组件状态

| 名称 | 说明  |
| --- | ---  |
| 表示进度 | 展示当前任务的进展，包括百分比进度和成功/失败等状态。 |
| 表示使用率、容量 | 表示某项数据的当前值占总值的比例，不同的数据段可采用不同的颜色展示（可选）。 |

### 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@progress-normal-background-color` | `@color-success` | - | - |
| `@progress-success-background-color` | `@color-success` | - | - |
| `@progress-exception-background-color` | `@color-error` | - | - |
| `@progress-active-background-color` | `@color-success` | - | - |
| `@progress-trail-background-color` | `@color-graphite-l40` | - | - |
| `@progress-text-width` | `36px` | - | - |
| `@progress-border-radius` | `100px` | - | - |
| `@progress-text-color` | `@text-color` | - | - |
| `@progress-line-height-lg` | `8px` | - | - |
| `@progress-line-height-md` | `6px` | - | - |
| `@progress-line-height-sm` | `2px` | - | - |
| `@progress-line-font-size-lg` | `@font-size-md` | - | - |
| `@progress-line-font-size-md` | `@font-size-md` | - | - |
| `@progress-line-font-size-sm` | `@font-size-sm` | - | - |
| `@progress-line-text-padding` | `0 0 0 @spacing-sm` | - | - |
| `@progress-circle-width` | `120px` | - | - |
| `@progress-circle-font-size-md` | `@font-size-2xl` | - | - |
