---
category: components
type: 数据录入
title: DatePicker
subtitle: 日期选择器
order: 0
---

## API

### 共同的 API

以下 `Props` 为 `IxDatePicker`、`IxDateRangePicker` 共享的属性。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:open` | 日期面板是否展开 | `boolean` | - | - | - |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `cellTooltip` | 日期节点的tooltip | `(cell: { value: Date, disabled: boolean }) => string | void` | - | - | - |
| `allowInput` | 允许输入模式 | `boolean \| 'overlay'` | `false` | - | `'overlay'` 时在浮层内输入 |
| `autofocus` | 默认获取焦点 | `boolean` | `false` | - | - |
| `borderless` | 是否无边框 | `boolean` | `false` | ✅ | - |
| `clearable` | 是否显示清除图标 | `boolean` | `false` | ✅ | - |
| `clearIcon` | 清除按钮图标 |`string \| #clearIcon` | `'close-circle'` | ✅ | - |
| `disabled` | 是否禁用状态 | `boolean` | `false` | - | 使用 `control` 时，此配置无效 |
| `disabledDate` | 不可选择的日期 | `(date: Date) => boolean` | - | - | - |
| `format` | 展示的格式 | `string` | - | ✅ | 默认值参见 `defaultFormat`, 更多用法参考[date-fns](https://date-fns.org/v2.27.0/docs/format) |
| `timeFormat` | `'datetime'`下的时间格式 | `string` | - | ✅ | 全局配置同`TimePicker`的format, 仅在`'datetime'`类型下生效，可用于配置时间面板的列显示，参考[TimePicker](/components/time-picker/zh) |
| `dateFormat` | `'datetime'`下的日期格式 | `string` | - | ✅ | 全局配置同`DatePicker`的`'date'`类型format, 仅在`'datetime'`类型下生效 |
| `overlayClassName` | 日期面板的 `class`  | `string` | - | - | - |
| `overlayContainer` | 自定义浮层容器节点 | `string \| HTMLElement \| () => string \| HTMLElement` | - | ✅ | - |
| `overlayRender` | 自定义日期面板内容的渲染  | `(children:VNode[]) => VNodeChild` | - | - | - |
| `readonly` | 只读模式 | `boolean` | - | - | - |
| `size` | 设置选择器大小 | `'sm' \| 'md' \| 'lg'` | `md` | ✅ | - |
| `suffix` | 设置后缀图标 | `string \| #suffix` | `'calendar'` | ✅ | - |
| `type` | 设置选择器类型 | `'date' \| 'week' \| 'month' \| 'quarter' \| 'year' \| 'datetime'` | `'date'` | - | - |
| `onClear` | 清除图标被点击后的回调 | `(evt: MouseEvent) => void` | - | - | - |
| `onFocus` | 获取焦点后的回调 | `(evt: FocusEvent) => void` | - | - | - |
| `onBlur` | 失去焦点后的回调 | `(evt: FocusEvent) => void` | - | - | - |

```ts
const defaultFormat = {
  date: 'yyyy-MM-dd',
  week: 'RRRR-II',
  month: 'yyyy-MM',
  quarter: "yyyy-'Q'Q",
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
}
```

以下 `Slots` 为 `IxDatePicker`、`IxDateRangePicker` 共享的插槽。

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `footer` | 自定义日期面板中的页脚 | - | - |
| `cell` | 自定义日期面板中的单元格 | `{date: Date}` | - |

以下 `Methods` 为 `IxDatePicker`、`IxDateRangePicker` 共享的方法。

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `blur` | 移除焦点 | `(options?: FocusOptions) => void` | - |
| `focus` | 获取焦点 | `() => void` | - |

### IxDatePicker

#### DatePickerProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 当前选中的日期 | `number \| string \| Date` | - | - | 如果传入 `string` 类型，会根据 `format` 解析成 `Date`，使用 `control` 时，此配置无效  |
| `footer` | 自定义底部按钮 | `boolean \| ButtonProps[] \| VNode \| #footer` | `false` | - | 默认会根据 `type` 的不同渲染相应的按钮，如果传入 `false` 则不显示 |
| `placeholder` | 选择框默认文本 | `string \| #placeholder` | - | - | 可以通过国际化配置默认值 |
| `timePanelOptions` | 时间选择面板配置 | `PickerTimePanelOptions` | - | - | 仅在 `type='datetime'` 时生效 |
| `onChange` | 值改变后的回调 | `(value: Date, oldValue: Date) => void` | - | - | - |
| `onInput` | 输入后的回调 | `(evt: Event) => void` | - | - | - |

#### PickerTimePanelOptions

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `disabledHours` | 禁用部分小时选项 | `(selectedAmPm: string | undefined) => number[]` | ``() => []`` | - | - |
| `disabledMinutes` | 禁用部分分钟选项 | `(selectedHour: number | undefined, selectedAmPm: string | undefined) => number[]` | `() => []` | - | - |
| `disabledSeconds` | 禁用部分秒选项 | `(selectedHour: number | undefined, selectedMinute: number | undefined, selectedAmPm: string | undefined)=>number[]` | `() => []` | - | - |
| `hideDisabledOptions` | 隐藏禁止选择的options |`boolean` |`false` | - | - |
| `hourStep` | 小时选项的间隔 | `number` | `1` | - | - |
| `minuteStep` | 分钟选项的间隔 | `number` | `1` | - | - |
| `secondStep` | 秒选项的间隔 | `number` | `1` | - | - |

### IxDateRangePicker

#### DateRangePickerProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 当前选中的日期 | `Array<number \| string \| Date>` | - | - | 如果传入 `string` 类型，会根据 `format` 解析成 `Date`，使用 `control` 时，此配置无效 |
| `footer` | 自定义底部按钮 | `boolean \| ButtonProps[] \| VNode \| #footer` | `false` | - | 默认会根据 `type` 的不同渲染相应的按钮，如果传入 `false` 则不显示 |
| `placeholder` | 选择框默认文本 | `string[] \| #placeholder=placement:'start'\|'end'` | - | - | 默认使用 `i18n` 配置 |
| `separator` | 自定义分隔符图标 | `string \| VNode \| #separator` | - | ✅ | - |
| `timePanelOptions` | 时间选择面板配置 | `PickerTimePanelOptions \| PickerTimePanelOptions[]` | - | - | 如果需要对前后的时间选择器使用不同配置，可以传入一个数组 |
| `onChange` | 值改变后的回调 | `(value: Date[], oldValue: Date[]) => void` | - | - | - |
| `onInput` | 输入后的回调 | `(isFrom: boolean, evt: Event) => void` | - | - | - |

### IxDatePickerPanel

#### DatePickerPanelProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:activeValue` | 当前激活状态的日期 | `Date` | - | - | 配合键盘操作使用 |
| `cellTooltip` | 日期节点的tooltip | `(cell: { value: Date, disabled: boolean }) => string | void` | - | - | - |
| `disabledDate` | 不可选择的日期 | `(date: Date) => boolean` | - | - | - |
| `type` | 设置选择器面板类型 | `'date' \| 'week' \| 'month' \| 'quarter' \| 'year' \| 'datetime'` | `'date'` | - | - |
| `timePanelOptions` | 时间选择面板配置 | `TimePanelOptions` | - | - | - |
| `visible` | 当前可见的面板 | `'datePanel' \| 'timePanel' \| visible` | - | - | 在非 `datetime` 类型时，`timepanel` 无效 |
| `onChange` | 值改变后的回调 | `(value: Date | undefined) => void` | - | - | - |

### IxDateRangePickerPanel

#### DateRangePickerPanelProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:activeValue` | 当前激活状态的日期 | `Date[]` | - | - | 配合键盘操作使用 |
| `cellTooltip` | 日期节点的tooltip | `(cell: { value: Date, disabled: boolean }) => string | void` | - | - | - |
| `disabledDate` | 不可选择的日期 | `(date: Date) => boolean` | - | - | - |
| `type` | 设置选择器面板类型 | `'date' \| 'week' \| 'month' \| 'quarter' \| 'year' \| 'datetime'` | `'date'` | - | - |
| `timePanelOptions` | 时间选择面板配置 | `TimePanelOptions \| TimePanelOptions[]` | - | - | 如果需要对前后的时间选择器使用不同配置，可以传入一个数组 |
| `visible` | 当前可见的面板 | `'datePanel' \| 'timePanel' \| boolean` | - | - | 在非 `datetime` 类型时，`timepanel` 无效 |
| `onChange` | 值改变后的回调 | `(value: Date[] | undefined) => void` | - | - | - |

#### TimePanelOptions

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `disabledHours` | 禁用部分小时选项 | `(selectedAmPm: string | undefined) => number[]` | ``() => []`` | - | - |
| `disabledMinutes` | 禁用部分分钟选项 | `(selectedHour: number | undefined, selectedAmPm: string | undefined) => number[]` | `() => []` | - | - |
| `disabledSeconds` | 禁用部分秒选项 | `(selectedHour: number | undefined, selectedMinute: number | undefined, selectedAmPm: string | undefined)=>number[]` | `() => []` | - | - |
| `hideDisabledOptions` | 隐藏禁止选择的options |`boolean` |`false` | - | - |
| `hourStep` | 小时选项的间隔 | `number` | `1` | - | - |
| `minuteStep` | 分钟选项的间隔 | `number` | `1` | - | - |
| `secondStep` | 秒选项的间隔 | `number` | `1` | - | - |
| `hourEnabled` | 是否显示小时选择列 | `boolean` | `true` | - | - |
| `minuteEnabled` | 是否显示分钟选择列 | `boolean` | `true` | - | - |
| `secondEnabled` | 是否显示秒选择列 | `boolean` | `true` | - | - |
| `use12Hours` | 是否显示AM\PM选择列 | `boolean` | `false` | - | - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | default | seer | 备注 |
| --- | --- | --- | --- |
| `@date-picker-line-height` | `@form-line-height` | - | - |
| `@date-picker-color` | `@form-color` | - | - |
| `@date-range-picker-trigger-separator-margin` | `@spacing-xl` | - | - |
| `@date-panel-font-size` | `@font-size-md` | - | - |
| `@date-panel-color` | `@text-color` | - | - |
| `@date-panel-color-inverse` | `@text-color-inverse` | - | - |
| `@date-panel-active-color` | `@color-primary` | - | - |
| `@date-panel-in-range-color` | `@color-blue-l50` | - | - |
| `@date-panel-disabled-color` | `@text-color-disabled` | - | - |
| `@date-panel-disabled-background-color` | `@color-graphite-l50` | - | - |
| `@date-panel-background-color` | `@background-color-component` | - | - |
| `@date-panel-border-width` | `@border-width-sm` | - | - |
| `@date-panel-border-style` | `@border-style` | - | - |
| `@date-panel-border-color` | `@border-color` | - | - |
| `@date-panel-header-padding` | `0 0 @spacing-xs 0` | - | - |
| `@date-panel-header-height` | `@height-md` | - | - |
| `@date-panel-header-item-padding` | `0 @spacing-xs` | - | - |
| `@date-panel-header-border-bottom` | `none` | - | - |
| `@date-panel-header-button-font-size` | `@font-size-lg` | - | - |
| `@date-panel-header-button-font-weight` | `@font-weight-lg` | - | - |
| `@date-panel-header-content-spacing` | `@spacing-lg` | - | - |
| `@date-panel-header-padding-lg` | `0 0 @spacing-2xl` | - | - |
| `@date-panel-body-padding` | `0` | - | - |
| `@date-panel-body-padding-lg` | `0` | - | - |
| `@date-panel-body-font-size` | `@font-size-md` | - | - |
| `@date-panel-body-header-margin-bottom` | `@spacing-md` | - | - |
| `@date-panel-body-header-font-weight` | `@font-weight-md` | - | - |
| `@date-panel-body-header-background-color` | `@color-graphite-l50` | - | - |
| `@date-panel-cell-width` | `28px` | - | - |
| `@date-panel-cell-height` | `28px` | - | - |
| `@date-panel-cell-width-lg` | `52px` | - | - |
| `@date-panel-cell-height-lg` | `24px` | - | - |
| `@date-panel-cell-padding` | `2px 0` | - | - |
| `@date-panel-cell-inner-padding` | `4px` | - | - |
| `@date-panel-cell-padding-lg` | `@spacing-lg 0` | - | - |
| `@date-panel-cell-inner-padding-lg` | `0` | - | - |
| `@date-panel-cell-trigger-width` | `20px` | - | - |
| `@date-panel-cell-trigger-height` | `20px` | - | - |
| `@date-panel-cell-trigger-width-lg` | `52px` | - | - |
| `@date-panel-cell-trigger-height-lg` | `24px` | - | - |
| `@date-panel-cell-border-radius` | `@border-radius-full` | - | - |
| `@date-panel-cell-border-radius-lg` | `@border-radius-sm` | - | - |
| `@date-panel-cell-hover-background-color` | `@color-graphite-l50` | - | - |
| `@date-panel-cell-hover-color` | `@color-primary` | - | - |
| `@date-panel-cell-current-border-color` | `@color-blue-l40` | - | - |
| `@date-panel-cell-current-color` | `@color-primary` | - | - |
| `@date-picker-overlay-footer-border-width` | `@form-border-width` | - | - |
| `@date-picker-overlay-footer-border-style` | `@form-border-style` | - | - |
| `@date-picker-overlay-footer-border-color` | `@form-border-color` | - | - |
| `@date-picker-overlay-footer-padding` | `@spacing-sm @spacing-lg` | - | - |
| `@date-picker-overlay-footer-button-margin-left` | `@spacing-sm` | - | - |
| `@date-picker-overlay-zindex` | `@zindex-l4-3` | - | - |
| `@date-picker-overlay-width` | `252px` | - | - |
| `@date-picker-overlay-border-radius` | `@border-radius-sm` | - | - |
| `@date-picker-overlay-box-shadow` | `@shadow-bottom-md` | - | - |
| `@date-picker-overlay-date-input-width` | `120px` | - | - |
| `@date-picker-overlay-time-input-width` | `96px` | - | - |
| `@date-picker-overlay-input-gap` | `@spacing-xs` | - | - |
| `@date-picker-overlay-padding` | `@spacing-lg @spacing-lg @spacing-lg @spacing-lg` | - | - |
| `@date-picker-overlay-body-padding` | `0` | - | - |
| `@date-picker-overlay-inputs-margin-bottom` | `@spacing-sm` | - | - |
| `@date-range-picker-overlay-padding` | `@spacing-lg @spacing-lg 0 @spacing-lg` | - | - |
| `@date-range-picker-overlay-body-padding` | `0 0 @spacing-sm 0` | - | - |
| `@date-range-picker-overlay-separator-width` | `@spacing-2xl` | - | - |
| `@date-range-picker-overlay-separator-padding` | `1px 0 0 0` | - | - |
| `@date-range-picker-overlay-separator-font-size` | `@font-size-md` | - | - |
| `@date-range-picker-overlay-footer-border-width` | `@date-picker-overlay-footer-border-width` | - | - |
| `@date-range-picker-overlay-footer-border-style` | `@date-picker-overlay-footer-border-style` | - | - |
| `@date-range-picker-overlay-footer-border-color` | `@color-graphite-l30` | - | - |
| `@date-range-picker-overlay-footer-padding` | `@spacing-sm 0` | - | - |
| `@date-range-picker-overlay-footer-button-margin-left` | `@date-picker-overlay-footer-button-margin-left` | - | - |
| `@date-picker-panel-width` | `220px` | - | - |
| `@date-picker-panel-max-height` | `260px` | - | - |
| `@date-range-picker-panel-width` | `220px` | - | - |
| `@date-range-picker-panel-max-height` | `260px` | - | - |
| `@date-range-picker-panel-border-width` | `0` | - | - |
| `@date-range-picker-panel-border-style` | `none` | - | - |
| `@date-range-picker-panel-border-color` | `none` | - | - |
| `@date-range-picker-panel-border-radius` | `0` | - | - |
| `@date-range-picker-panel-separator-margin` | `0 @spacing-lg` | - | - |
| `@date-range-picker-panel-separator-width` | `1px` | - | - |
| `@date-range-picker-panel-separator-color` | `@date-panel-border-color` | - | - |
<!--- insert less variable end  --->