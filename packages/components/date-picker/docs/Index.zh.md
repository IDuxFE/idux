---
category: components
type: 数据录入
title: DatePicker
subtitle: 日期选择器
order: 0
---

日期点选择可用于选择一个指定日期或指定日期的具体时间点。

### 什么情况下使用？

- 适用于明确的单时间点设置，例如系统时间设置、开始同步时间点等。用于用户只需要选择一个指定日期的值。

## API

### 共同的 API

以下 `Props` 为 `IxDatePicker`、`IxDateRangePicker` 共享的属性。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `v-model:open` | 日期面板是否展开 | `boolean` | - | - | - |
| `autofocus` | 默认获取焦点 | `boolean` | `false` | - | - |
| `borderless` | 是否无边框 | `boolean` | `false` | ✅ | - |
| `clearable` | 是否显示清除图标 | `boolean` | `false` | ✅ | - |
| `clearIcon` | 清除按钮图标 |`string` | `'close-circle'` | ✅ | - |
| `disabled` | 是否禁用状态 | `boolean` | `false` | - | - |
| `disabledDate` | 不可选择的日期 | `(date: Date) => boolean` | - | - | - |
| `format` | 展示的格式 | `string` | - | ✅ | 默认值参见 `defaultFormat`, 更多用法参考[date-fns](https://date-fns.org/v2.27.0/docs/format) |
| `overlayClassName` | 日期面板的 `class`  | `string` | - | - | - |
| `overlayRender` | 自定义日期面板内容的渲染  | `(children:VNode[]) => VNodeTypes` | - | - | - |
| `readonly` | 只读模式 | `boolean` | - | - | - |
| `size` | 设置选择器大小 | `'sm' \| 'md' \| 'lg'` | `md` | ✅ | - |
| `suffix` | 设置后缀图标 | `string \| #suffix` | `'calendar'` | ✅ | - |
| `type` | 设置选择器类型 | `'date' \| 'week' \| 'month' \| 'quarter' \| 'year'` | `'date'` | - | - |
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
| `v-model:value` | 当前选中的日期 | `number \| string \| Date` | - | - | 如果传入 `string` 类型，会根据 `format` 解析成 `Date`  |
| `defaultOpenValue` | 打开面板时默认选中的值 | `number \| string \| Date` | - | - | `value` 为空时，高亮的值 |
| `placeholder` | 选择框默认文本 | `string \| #placeholder` | - | - | 默认使用 `i18n` 配置 |
| `timePicker` | 是否显示时间选择器 | `boolean \| TimePickerProps` | `false` | - | 仅在 `type='date'` 时生效 |
| `onChange` | 值改变后的回调 | `(value: Date, oldValue: Date) => void` | - | - | - |

### IxDateRangePicker

#### DateRangePickerProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 当前选中的日期 | `Array<number \| string \| Date>` | - | - | 当传入 `string` 类型时，请指定时区信息 |
| `defaultOpenValue` | 打开面板时默认选中的值 | `Array<number \| string \| Date>` | - | - | `value` 为空时，高亮的值 |
| `placeholder` | 选择框默认文本 | `string[] \| #placeholder=placement:'start'\|'end'` | - | - | 默认使用 `i18n` 配置 |
| `separator` | 自定义分隔符图标 | `string \| VNode \| #separator` | `'swap-right'` | ✅ | - |
| `timePicker` | 是否显示时间选择器 | `boolean \| TimePickerProps \| TimePickerProps[]` | `false` | - | 如果需要对前后的时间选择器配置不同的禁用条件，可以传入一个数组 |
| `onChange` | 值改变后的回调 | `(value: Date[], oldValue: Date[]) => void` | - | - | - |
