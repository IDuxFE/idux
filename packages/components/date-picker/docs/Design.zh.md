## 组件定义

以输入或点选面板的方式选择日期的控件。

## 使用场景

用于需要选择指定日期，例如设置系统时间、检查任务等。

## 组件构成

| 名称 | 说明  |
| --- | ---  |
| 日期选择框 | 日期选择器默认选择今天（如果是带时间的，就是此时此刻），业务可根据情况改变默认时间。但业务若需要默认不显示时间，则默认显示提示文字“选择时间”或更明确的提示文案，例如“选择风险发现时间”。 |
| 日期输入框 | 此处可输入日期数值来选择日期，当输入框有信息时，鼠标悬停出现删除按钮。 |
| 时间点面板 | 在面板上点选指定日期。 |
| 时间选择框（可选） | 此处可输入时间数值来选择时间，当输入框有信息时，鼠标悬停出现删除按钮。当对时间点有明确要求时，例如选项间隔30分钟、1小时等，此处可使用【下拉选择器】。 |

## 组件类型

| 名称 | 说明  |
| --- | --- |
| 日期选择-仅选择日期 | 若用户仅需选择日期，设计时请选用【日期选择-仅选择日期】 |
| 日期选择-需选择时刻 | 若用户还需选择精确时间，设计时请选用【日期选择-需选择时刻】 |

### 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@date-picker-font-size-sm` | `@form-font-size-sm` | - | - |
| `@date-picker-font-size-md` | `@form-font-size-md` | - | - |
| `@date-picker-font-size-lg` | `@form-font-size-lg` | - | - |
| `@date-picker-line-height` | `@form-line-height` | - | - |
| `@date-picker-height-sm` | `@form-height-sm` | - | - |
| `@date-picker-height-md` | `@form-height-md` | - | - |
| `@date-picker-height-lg` | `@form-height-lg` | - | - |
| `@date-picker-padding-horizontal-sm` | `@form-padding-horizontal-sm` | - | - |
| `@date-picker-padding-horizontal-md` | `@form-padding-horizontal-md` | - | - |
| `@date-picker-padding-horizontal-lg` | `@form-padding-horizontal-lg` | - | - |
| `@date-picker-padding-vertical-sm` | `@form-padding-vertical-sm` | - | - |
| `@date-picker-padding-vertical-md` | `@form-padding-vertical-md` | - | - |
| `@date-picker-padding-vertical-lg` | `@form-padding-vertical-lg` | - | - |
| `@date-picker-border-width` | `@form-border-width` | - | - |
| `@date-picker-border-style` | `@form-border-style` | - | - |
| `@date-picker-border-color` | `@form-border-color` | - | - |
| `@date-picker-border-radius` | `@border-radius-md` | - | - |
| `@date-picker-color` | `@form-color` | - | - |
| `@date-picker-color-secondary` | `@form-color-secondary` | - | - |
| `@date-picker-background-color` | `@form-background-color` | - | - |
| `@date-picker-placeholder-color` | `@form-placeholder-color` | - | - |
| `@date-picker-hover-color` | `@form-hover-color` | - | - |
| `@date-picker-active-color` | `@form-active-color` | - | - |
| `@date-picker-active-box-shadow` | `@form-active-box-shadow` | - | - |
| `@date-picker-disabled-color` | `@form-disabled-color` | - | - |
| `@date-picker-disabled-background-color` | `@form-disabled-background-color` | - | - |
| `@date-picker-panel-font-size` | `@font-size-md` | - | - |
| `@date-picker-panel-color` | `@text-color` | - | - |
| `@date-picker-panel-color-inverse` | `@text-color-inverse` | - | - |
| `@date-picker-panel-active-color` | `@color-primary` | - | - |
| `@date-picker-panel-disabled-color` | `@text-color-disabled` | - | - |
| `@date-picker-panel-disabled-background-color` | `@background-color-disabled` | - | - |
| `@date-picker-panel-background-color` | `@background-color-component` | - | - |
| `@date-picker-panel-border-width` | `@border-width-sm` | - | - |
| `@date-picker-panel-border-style` | `@border-style` | - | - |
| `@date-picker-panel-border-color` | `@border-color` | - | - |
| `@date-picker-panel-header-padding` | `0 @spacing-lg` | - | - |
| `@date-picker-panel-header-height` | `@height-lg` | - | - |
| `@date-picker-panel-header-item-padding` | `0 @spacing-xs` | - | - |
| `@date-picker-panel-header-font-weight` | `@font-weight-lg` | - | - |
| `@date-picker-panel-body-padding` | `@spacing-sm @spacing-lg` | - | - |
| `@date-picker-panel-body-padding-lg` | `@spacing-sm @spacing-lg` | - | - |
| `@date-picker-panel-body-header-font-weight` | `@font-weight-md` | - | - |
| `@date-picker-panel-cell-size` | `24px` | - | - |
| `@date-picker-panel-cell-padding` | `@spacing-xs 0` | - | - |
| `@date-picker-panel-cell-padding-lg` | `@padding-sm 0` | - | - |
| `@date-picker-panel-cell-inner-padding-lg` | `0 @padding-lg` | - | - |
| `@date-picker-panel-cell-border-radius` | `@border-radius-full` | - | - |
| `@date-picker-panel-cell-border-radius-lg` | `@border-radius-md` | - | - |
| `@date-picker-panel-cell-hover-background-color` | `@background-color-hover` | - | - |
| `@date-picker-panel-footer-padding` | `0 @spacing-sm` | - | - |
| `@date-picker-overlay-zindex` | `@zindex-l4-3` | - | - |
| `@date-picker-overlay-width` | `256px` | - | - |
| `@date-picker-overlay-border-radius` | `@border-radius-sm` | - | - |
| `@date-picker-overlay-box-shadow` | `@shadow-bottom-md` | - | - |
