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
 | `disabledHours` | 禁用部分小时选项 | `(selectedAmPm: string | undefined) => number[]` | ``() => []`` | - | - |
 | `disabledMinutes` | 禁用部分分钟选项 | `(selectedHour: number | undefined, selectedAmPm: string | undefined) => number[]` | `() => []` | - | - |
 | `disabledSeconds` | 禁用部分秒选项 | `(selectedHour: number | undefined, selectedMinute: number | undefined, selectedAmPm: string | undefined)=>number[]` | `() => []` | - | - |
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
 | `clearIcon` | 清除按钮图标 |`string \| #clearIcon` | `close-circle` | ✅ | - |
 | `clearText` | hover到clearIcon上，显示的title |`string` | clear | ✅ | - |
 | `size` | 尺寸大小 | `lg \| md \| sm` | `md` | ✅ | - |
 | `disabledHours` | 禁用部分小时选项 | `(selectedAmPm: string | undefined) => number[]` | ``() => []`` | - | - |
 | `disabledMinutes` | 禁用部分分钟选项 | `(selectedHour: number | undefined, selectedAmPm: string | undefined) => number[]` | `() => []` | - | - |
 | `disabledSeconds` | 禁用部分秒选项 | `(selectedHour: number | undefined, selectedMinute: number | undefined, selectedAmPm: string | undefined)=>number[]` | `() => []` | - | - |
 | `hideDisabledOptions` | 隐藏禁止选择的options |`boolean` |`false` | - | - |
 | `hourStep` | 小时选项的间隔 | `number` | `1` | - | - |
 | `minuteStep` | 分钟选项的间隔 | `number` | `1` | - | - |
 | `secondStep` | 秒选项的间隔 | `number` | `1` | - | - |
 | `defaultOpenValue` | 打开面板时默认高亮的值 | `[Date \| string \| number, Date \| string \| number]` | - | - | 如果value不为空，则高亮value的值 |
 | `overlayClassName` | 浮层的类名 |`string` | - | - | - |
 | `overlayContainer` | 自定义浮层容器节点 | `string \| HTMLElement \| () => string \| HTMLElement` | - | ✅ | - |
 | `onChange` | 时间选择回调函数 |`(value: [Date \| undefined, Date \| undefined]) => void` | - | - | - |
 | `onClear` | 清除事件回调函数 |`(evt: MouseEvent) => void` | - | - | - |
 | `onFocus` | focus事件回调函数 |`(evt: FocusEvent) => void` | - | - | - |
 | `onBlur` | blur事件回调函数 |`(evt: FocusEvent) => void` | - | - | - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | default | seer | 备注 |
| --- | --- | --- | --- |
| `@time-picker-color` | `@form-color` | - | - |
| `@time-picker-line-height` | `@form-line-height` | - | - |
| `@time-range-picker-trigger-separator-margin` | `@spacing-xl` | - | - |
| `@time-picker-overlay-zindex` | `@zindex-l4-3` | - | - |
| `@time-picker-overlay-width` | `200px` | - | - |
| `@time-picker-overlay-padding` | `@spacing-sm @spacing-sm 0 @spacing-sm` | - | - |
| `@time-picker-overlay-body-padding` | `0 0 @spacing-sm 0` | - | - |
| `@time-picker-overlay-box-shadow` | `@shadow-bottom-md` | - | - |
| `@time-picker-overlay-background-color` | `@form-background-color` | - | - |
| `@time-picker-overlay-input-margin-bottom` | `@spacing-sm` | - | - |
| `@time-range-picker-overlay-padding` | `@spacing-lg @spacing-lg 0 @spacing-lg` | - | - |
| `@time-range-picker-overlay-body-padding` | `0 0 @spacing-lg 0` | - | - |
| `@time-range-picker-overlay-board-width` | `184px` | - | - |
| `@time-range-picker-overlay-separator-width` | `@spacing-2xl` | - | - |
| `@time-range-picker-overlay-separator-padding` | `1px 0 0 0` | `2px 8px` | - |
| `@time-range-picker-overlay-separator-font-size` | `@font-size-md` | `@font-size-sm` | - |
| `@time-range-picker-board-width` | `184px` | - | - |
| `@time-range-picker-board-panel-border-width` | `@form-border-width` | - | - |
| `@time-range-picker-board-panel-border-style` | `@form-border-style` | - | - |
| `@time-range-picker-board-panel-border-color` | `@form-border-color` | - | - |
| `@time-range-picker-board-panel-border-radius` | `@border-radius-sm` | - | - |
| `@time-picker-overlay-footer-border-width` | `@form-border-width` | - | - |
| `@time-picker-overlay-footer-border-style` | `@form-border-style` | - | - |
| `@time-picker-overlay-footer-border-color` | `@form-border-color` | - | - |
| `@time-picker-overlay-footer-padding` | `@spacing-sm @spacing-lg` | - | - |
| `@time-picker-overlay-footer-button-margin-left` | `@spacing-sm` | - | - |
| `@time-range-picker-overlay-footer-border-width` | `@time-picker-overlay-footer-border-width` | - | - |
| `@time-range-picker-overlay-footer-border-style` | `@time-picker-overlay-footer-border-style` | - | - |
| `@time-range-picker-overlay-footer-border-color` | `@color-graphite-l30` | - | - |
| `@time-range-picker-overlay-footer-padding` | `@spacing-sm 0` | - | - |
| `@time-range-picker-overlay-footer-button-margin-left` | `@time-picker-overlay-footer-button-margin-left` | - | - |
<!--- insert less variable end  --->