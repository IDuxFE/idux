---
category: components
type: 数据录入
title: TimePicker
subtitle: 时间选择器
order: 0
---

## API

### ix-time-picker

#### TimePickerProps

 | 名称 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
 | ----- | ------ | ------ | ------- | -------- | ----- |
 | `v-model:value` | 当前选择的时间 | `Date \| string \| number` | - | - | - |
 | `v-model:open` | 是否打开picker |`boolean` |`false` | - | - |
 | `control` | 控件控制器 | `string \| AbstractControl` | - | - | 当存在 control 时, 控件将由 AbstractControl 完全控制，此时 value 会失效 |
 | `format` | 展示的格式 | `string` | - | ✅ | 更多用法参考[date-fns](https://date-fns.org/v2.27.0/docs/format) |
 | `placeholder` | 值为空时展示的提示 | `string` | 请选择时间 | - | - |
 | `disabled` | 禁用全部操作 | `boolean` |`false` | - | - |
 | `readonly` | 只读状态 |`boolean` |`false` | - | - |
 | `clearable` | 是否展示清除按钮 |`boolean` |`true` | ✅ | - |
 | `borderless` | 是否为无边框 |`boolean` |`false` | ✅ | - |
 | `suffix` | 后缀图标 |`string \| #suffix` | `clock-circle` | ✅ | - |
 | `target` | 自定义浮层容器节点 | `string \| HTMLElement \| () => string \| HTMLElement` | - | ✅ | - |
 | `clearIcon` | 清除按钮图标 |`string \| #clearIcon` | `close-circle` | ✅ | - |
 | `clearText` | hover到clearIcon上，显示的title |`string` | clear | ✅ | - |
 | `size` | 尺寸大小 | `lg \| md \| sm` | `md` | ✅ | - |
 | `disabledHours` | 禁用部分小时选项 | `()=>number[]` | ``() => []`` | - | - |
 | `disabledMinutes` | 禁用部分分钟选项 | `(selectedHour: number)=>number[]` | `() => []` | - | - |
 | `disabledSeconds` | 禁用部分秒选项 | `(selectedHour: number, selectedMinute: number)=>number[]` | `() => []` | - | - |
 | `hideDisabledOptions` | 隐藏禁止选择的options |`boolean` |`false` | - | - |
 | `hourStep` | 小时选项的间隔 | `number` | `1` | - | - |
 | `minuteStep` | 分钟选项的间隔 | `number` | `1` | - | - |
 | `secondStep` | 秒选项的间隔 | `number` | `1` | - | - |
 | `defaultOpenValue` | 打开面板时默认高亮的值 | `Date \| string \| number` | - | - | 如果value不为空，则高亮value的值 |
 | `overlayClassName` | 浮层的类名 |`string` | - | - | - |
 | `onChange` | 时间选择回调函数 |`(value: Date \| undefined) => void` | - | - | - |
 | `onClear` | 清除事件回调函数 |`(evt: MouseEvent) => void` | - | - | - |
 | `onFocus` | focus事件回调函数 |`(evt: FocusEvent) => void` | - | - | - |
 | `onBlur` | blur事件回调函数 |`(evt: FocusEvent) => void` | - | - | - |

#### TimeRangePickerProps

 | 名称 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
 | ----- | ------ | ------ | ------- | -------- | ----- |
 | `v-model:value` | 当前选择的时间 | `[Date \| string \| number, Date \| string \| number]` | - | - | - |
 | `v-model:open` | 是否打开picker |`boolean` |`false` | - | - |
 | `control` | 控件控制器 | `string \| AbstractControl` | - | - | 当存在 control 时, 控件将由 AbstractControl 完全控制，此时 value 会失效 |
 | `format` | 展示的格式 | `string` | - | ✅ | 更多用法参考[date-fns](https://date-fns.org/v2.27.0/docs/format) |
 | `placeholder` | 值为空时展示的提示 | `[string, string]` | `['起始时间', '结束时间']` | - | - |
 | `disabled` | 禁用全部操作 | `boolean` |`false` | - | - |
 | `readonly` | 只读状态 |`boolean` |`false` | - | - |
 | `separator` | 分隔符 |`string \| VNode \| #separator` | 至 | - | - |
 | `clearable` | 是否展示清除按钮 |`boolean` |`true` | ✅ | - |
 | `borderless` | 是否为无边框 |`boolean` |`false` | ✅ | - |
 | `suffix` | 后缀图标 |`string \| #suffix` | `clock-circle` | ✅ | - |
 | `target` | 自定义浮层容器节点 | `string \| HTMLElement \| () => string \| HTMLElement` | - | ✅ | - |
 | `clearIcon` | 清除按钮图标 |`string \| #clearIcon` | `close-circle` | ✅ | - |
 | `clearText` | hover到clearIcon上，显示的title |`string` | clear | ✅ | - |
 | `size` | 尺寸大小 | `lg \| md \| sm` | `md` | ✅ | - |
 | `disabledHours` | 禁用部分小时选项 | `()=>number[]` | ``() => []`` | - | - |
 | `disabledMinutes` | 禁用部分分钟选项 | `(selectedHour: number)=>number[]` | `() => []` | - | - |
 | `disabledSeconds` | 禁用部分秒选项 | `(selectedHour: number, selectedMinute: number)=>number[]` | `() => []` | - | - |
 | `hideDisabledOptions` | 隐藏禁止选择的options |`boolean` |`false` | - | - |
 | `hourStep` | 小时选项的间隔 | `number` | `1` | - | - |
 | `minuteStep` | 分钟选项的间隔 | `number` | `1` | - | - |
 | `secondStep` | 秒选项的间隔 | `number` | `1` | - | - |
 | `defaultOpenValue` | 打开面板时默认高亮的值 | `[Date \| string \| number, Date \| string \| number]` | - | - | 如果value不为空，则高亮value的值 |
 | `overlayClassName` | 浮层的类名 |`string` | - | - | - |
 | `onChange` | 时间选择回调函数 |`(value: [Date \| undefined, Date \| undefined]) => void` | - | - | - |
 | `onClear` | 清除事件回调函数 |`(evt: MouseEvent) => void` | - | - | - |
 | `onFocus` | focus事件回调函数 |`(evt: FocusEvent) => void` | - | - | - |
 | `onBlur` | blur事件回调函数 |`(evt: FocusEvent) => void` | - | - | - |

<!--- insert less variable begin  --->
## 主题变量

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
<!--- insert less variable end  --->
