---
category: components
type: 反馈
title: Progress
subtitle: 进度条
cover:
---

## API

### IxProgress

#### ProgressProps

各类型通用的属性

| 名称 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `type` | 类型，可选 `line` `circle` `dashboard` | `string` | `line` | - | - |
| `format` | 内容的函数模板，支持插槽 | `function(percent, successPercent) \| #format="percent, successPercent"`| percent => percent + '%' | ✅ | - |
| `percent` | 百分比 | `number` | 0  | - | - |
| `status` | 状态，可选：`success` `exception` `normal` `active`(仅限line) | `string` | - | - | - |
| `hideInfo` | 是否显示进度数值或状态图标 | `boolean` | `false` | - | - |
| `success` | 成功进度条相关配置 | `{ percent: number, strokeColor: string }` | - | - | - |
| `trailColor` | 未完成的分段的颜色 | `string` | - | - | - |
| `strokeColor` | 进度条的色彩 | `string` | - | - | - |
| `strokeLinecap` | 进度条的样式，可选：`round` `square`| `string` | `round` | - | - |
| `icons` | 进度条状态图标 | `{ success: string \| VNode, exception: string \| VNode }` | - | ✅ | - |

`type="line"`

| 名称 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `size` | 进度条尺寸 | `lg \| 'md' \| 'sm'` | `'md'` | ✅ | - |
| `strokeColor` | 进度条的色彩，传入 object 时为渐变 | `string` \| { from: string; to: string; direction: string } | - | - | - |
| `strokeWidth` | 进度条线的宽度，单位 px | `number` | 10 | - | - |

`type="circle"`

| 名称 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `width` | 圆形进度条画布宽度，单位 px | `number` | 132 | - | - |
| `strokeColor` | 圆形进度条的色彩，传入 object 时为渐变 | `string \| object` | - | - | - |
| `strokeWidth` | 圆形进度条线的宽度，单位是进度条画布宽度的百分比 | `number` | 6 | - | - |

`type="dashboard"`

| 名称 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `width` | 仪表盘进度条画布宽度，单位 px | `number` | 132 | - | - |
| `strokeWidth` | 仪表盘进度条线的宽度，单位是进度条画布宽度的百分比 | `number` | 6 | - | - |
| `gapDegree` | 仪表盘进度条缺口角度，可取值 0 ~ 360 | `number` | 0 | - | - |
| `gapPosition` | 仪表盘进度条缺口位置，可选 `top` `bottom` `left` `right` | `string` | `top` | - | - |

<!--- insert less variable begin  --->
## 主题变量

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
<!--- insert less variable end  --->