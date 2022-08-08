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
