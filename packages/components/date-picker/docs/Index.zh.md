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
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `v-model:open` | 日期面板是否展开 | `boolean` | - | - | - |
| `autofocus` | 默认获取焦点 | `boolean` | `false` | - | - |
| `borderless` | 是否无边框 | `boolean` | `false` | ✅ | - |
| `clearable` | 是否显示清除图标 | `boolean` | `false` | ✅ | - |
| `clearIcon` | 清除按钮图标 |`string \| #clearIcon` | `'close-circle'` | ✅ | - |
| `disabled` | 是否禁用状态 | `boolean` | `false` | - | 使用 `control` 时，此配置无效 |
| `disabledDate` | 不可选择的日期 | `(date: Date) => boolean` | - | - | - |
| `format` | 展示的格式 | `string` | - | ✅ | 默认值参见 `defaultFormat`, 更多用法参考[date-fns](https://date-fns.org/v2.27.0/docs/format) |
| `overlayClassName` | 日期面板的 `class`  | `string` | - | - | - |
| `overlayRender` | 自定义日期面板内容的渲染  | `(children:VNode[]) => VNodeTypes` | - | - | - |
| `readonly` | 只读模式 | `boolean` | - | - | - |
| `size` | 设置选择器大小 | `'sm' \| 'md' \| 'lg'` | `md` | ✅ | - |
| `suffix` | 设置后缀图标 | `string \| #suffix` | `'calendar'` | ✅ | - |
| `target` | 自定义浮层容器节点 | `string \| HTMLElement \| () => string \| HTMLElement` | - | ✅ | - |
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
| `v-model:value` | 当前选中的日期 | `number \| string \| Date` | - | - | 如果传入 `string` 类型，会根据 `format` 解析成 `Date`，使用 `control` 时，此配置无效  |
| `defaultOpenValue` | 打开面板时默认选中的值 | `number \| string \| Date` | - | - | `value` 为空时，高亮的值 |
| `placeholder` | 选择框默认文本 | `string \| #placeholder` | - | - | 可以通过国际化配置默认值 |
| `timePicker` | 是否显示时间选择器 | `boolean \| TimePickerProps` | `false` | - | 仅在 `type='date'` 时生效 |
| `onChange` | 值改变后的回调 | `(value: Date, oldValue: Date) => void` | - | - | - |

### IxDateRangePicker

#### DateRangePickerProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 当前选中的日期 | `Array<number \| string \| Date>` | - | - | 如果传入 `string` 类型，会根据 `format` 解析成 `Date`，使用 `control` 时，此配置无效 |
| `defaultOpenValue` | 打开面板时默认选中的值 | `Array<number \| string \| Date>` | - | - | `value` 为空时，高亮的值 |
| `placeholder` | 选择框默认文本 | `string[] \| #placeholder=placement:'start'\|'end'` | - | - | 默认使用 `i18n` 配置 |
| `separator` | 自定义分隔符图标 | `string \| VNode \| #separator` | `'swap-right'` | ✅ | - |
| `timePicker` | 是否显示时间选择器 | `boolean \| TimePickerProps \| TimePickerProps[]` | `false` | - | 如果需要对前后的时间选择器配置不同的禁用条件，可以传入一个数组 |
| `onChange` | 值改变后的回调 | `(value: Date[], oldValue: Date[]) => void` | - | - | - |

<!--- insert less variable begin  --->
## 主题变量

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
<!--- insert less variable end  --->