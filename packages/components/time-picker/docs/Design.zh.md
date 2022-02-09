## 组件定义

在弹出的面板上选择时间或时间范围，以便完成时间输入的控件。

## 使用场景

- 适用于明确的单时间点设置。例如定期扫描、定期备份等场景。
- 适用于明确的固定时间范围的选择等，通常用于周期性的时间段设置。例如时间计划、限速策略设置等场景。

## 组件构成

| 名称 | 说明 |
| --- | --- |
| 时间选择框 | 业务可根据情况自行设定默认时间，若无默认时间，则展示提示文字“请选择时间” |
| 时间输入框 | 输入时，只允许输入数字，其他符号不允许键入。 |
| 时间面板 | 点击面板中的数字后，输入框内对应的数字也跟着改变；鼠标移入“时、分、秒”的选择区域时出现对应的滚动条；滚轮滚动时，输入框内对应的数字也跟着改变。 |

## 组件类型

| 名称 | 说明 |
| --- | --- |
| 时间点选择 | 适用于明确的单时间点设置。例如定期扫描、定期备份等场景。可设置默认时间为此刻。 |
| 时间范围选择 | 适用于明确的固定时间范围的选择等，通常用于周期性的时间段设置。例如时间计划、限速策略设置等场景。 |

## 组件状态

时间输入框与时间选择面板联动

### 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@time-picker-font-size-sm` | `@form-font-size-sm` | - | - |
| `@time-picker-font-size-md` | `@form-font-size-md` | - | - |
| `@time-picker-font-size-lg` | `@form-font-size-lg` | - | - |
| `@time-picker-line-height` | `@form-line-height` | - | - |
| `@time-picker-height-sm` | `@form-height-sm` | - | - |
| `@time-picker-height-md` | `@form-height-md` | - | - |
| `@time-picker-height-lg` | `@form-height-lg` | - | - |
| `@time-picker-padding-horizontal-sm` | `@form-padding-horizontal-sm` | - | - |
| `@time-picker-padding-horizontal-md` | `@form-padding-horizontal-md` | - | - |
| `@time-picker-padding-horizontal-lg` | `@form-padding-horizontal-lg` | - | - |
| `@time-picker-padding-vertical-sm` | `@form-padding-vertical-sm` | - | - |
| `@time-picker-padding-vertical-md` | `@form-padding-vertical-md` | - | - |
| `@time-picker-padding-vertical-lg` | `@form-padding-vertical-lg` | - | - |
| `@time-picker-border-width` | `@form-border-width` | - | - |
| `@time-picker-border-style` | `@form-border-style` | - | - |
| `@time-picker-border-color` | `@form-border-color` | - | - |
| `@time-picker-border-radius` | `@border-radius-sm` | - | - |
| `@time-picker-color` | `@form-color` | - | - |
| `@time-picker-disabled-color` | `@form-disabled-color` | - | - |
| `@time-picker-transition-duration` | `@form-transition-duration` | - | - |
| `@time-picker-transition-function` | `@form-transition-function` | - | - |
| `@time-picker-overlay-width` | `200px` | - | - |
| `@time-picker-overlay-padding` | `@spacing-sm` | - | - |
| `@time-picker-overlay-box-shadow` | `@shadow-bottom-md` | - | - |
| `@time-picker-overlay-background-color` | `@form-background-color` | - | - |
| `@time-picker-footer-padding` | `@spacing-sm 0` | - | - |
| `@time-picker-footer-margin` | `0 @spacing-lg` | - | - |
| `@time-range-picker-overlay-padding` | `@spacing-lg` | - | - |
| `@time-range-picker-trigger-separator-margin` | `@spacing-xl` | - | - |
| `@time-range-picker-overlay-side-width` | `184px` | - | - |
| `@time-range-picker-overlay-gap-padding` | `5px 8px` | - | - |
| `@time-range-picker-panel-border-width` | `@time-picker-border-width` | - | - |
| `@time-range-picker-panel-border-style` | `@time-picker-border-style` | - | - |
| `@time-range-picker-panel-border-color` | `@color-graphite-l30` | - | - |
| `@time-range-picker-panel-border-radius` | `@time-picker-border-radius` | - | - |
| `@time-picker-input-margin` | `@spacing-sm` | - | - |
| `@time-picker-color` | `@form-color` | - | - |
| `@time-picker-color-secondary` | `@form-color-secondary` | - | - |
| `@time-picker-background-color` | `@form-background-color` | - | - |
| `@time-picker-placeholder-color` | `@form-placeholder-color` | - | - |
| `@time-picker-hover-color` | `@form-hover-color` | - | - |
| `@time-picker-active-color` | `@form-active-color` | - | - |
| `@time-picker-active-box-shadow` | `@form-active-box-shadow` | - | - |
| `@time-picker-disabled-color` | `@form-disabled-color` | - | - |
| `@time-picker-disabled-background-color` | `@form-disabled-background-color` | - | - |
| `@time-picker-icon-font-size` | `@font-size-sm` | - | - |
| `@time-picker-icon-margin-left` | `@spacing-xs` | - | - |
| `@time-picker-icon-margin-right` | `@spacing-xs` | - | - |
| `@time-picker-icon-color` | `@time-picker-placeholder-color` | - | - |
| `@time-picker-clear-icon-color` | `@time-picker-color-secondary` | - | - |
| `@time-picker-icon-background-color` | `@time-picker-background-color` | - | - |
