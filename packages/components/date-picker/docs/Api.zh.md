
### 共同的 API

以下 `Props` 为 `IxDatePicker`、`IxDateRangePicker` 共享的属性。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:open` | 日期面板是否展开 | `boolean` | - | - | - |
| `control` | 控件控制器 | `string \| number \| (string \| number)[] \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `cellTooltip` | 日期节点的tooltip | `(cell: { value: Date, disabled: boolean }) => string \| void` | - | - | - |
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
| `overlayContainer` | 自定义浮层容器节点 | `string \| HTMLElement \| (trigger?: Element) => string \| HTMLElement` | - | ✅ | - |
| `overlayRender` | 自定义日期面板内容的渲染  | `(children:VNode[]) => VNodeChild` | - | - | - |
| `overlayTabindex` | 自定义浮层tabindex | `number` | - | ✅ | - |
| `readonly` | 只读模式 | `boolean` | - | - | - |
| `size` | 设置选择器大小 | `'sm' \| 'md' \| 'lg'` | `md` | ✅ | - |
| `status` | 手动指定校验状态 | `valid \| invalid \| validating` | - | - | - |
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
| `disabledHours` | 禁用部分小时选项 | `(selectedAmPm: string \| undefined) => number[]` | ``() => []`` | - | - |
| `disabledMinutes` | 禁用部分分钟选项 | `(selectedHour: number \| undefined, selectedAmPm: string \| undefined) => number[]` | `() => []` | - | - |
| `disabledSeconds` | 禁用部分秒选项 | `(selectedHour: number \| undefined, selectedMinute: number \| undefined, selectedAmPm: string \| undefined)=>number[]` | `() => []` | - | - |
| `hideDisabledOptions` | 隐藏禁止选择的options |`boolean` |`false` | - | - |
| `hourStep` | 小时选项的间隔 | `number` | `1` | - | - |
| `minuteStep` | 分钟选项的间隔 | `number` | `1` | - | - |
| `secondStep` | 秒选项的间隔 | `number` | `1` | - | - |

#### DatePickerSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `footer` | 自定义日期面板中的页脚 | - | - |
| `cell` | 自定义日期面板中的单元格 | `{date: Date}` | - |
| `triggerContent` | 自定义日期选择器的触发器内容 | `DatePickerTriggerContentSlotParams` | - |

```ts
interface DatePickerTriggerContentSlotParams {
  inputValue: string
  placeholder: string
  readonly: boolean
  disabled: boolean
  handleInput: (evt: Event) => void
}
```

### IxDateRangePicker

#### DateRangePickerProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 当前选中的日期 | `Array<number \| string \| Date>` | - | - | 如果传入 `string` 类型，会根据 `format` 解析成 `Date`，使用 `control` 时，此配置无效 |
| `footer` | 自定义底部按钮 | `boolean \| ButtonProps[] \| VNode \| #footer` | `false` | - | 默认会根据 `type` 的不同渲染相应的按钮，如果传入 `false` 则不显示 |
| `placeholder` | 选择框默认文本 | `string[] \| #placeholder=placement:'start'\|'end'` | - | - | 默认使用 `i18n` 配置 |
| `separator` | 自定义分隔符图标 | `string \| VNode \| #separator` | - | ✅ | - |
| `shortcuts` | 时间范围快捷选项配置 | `RangeShortcutProp` | - | - | - |
| `timePanelOptions` | 时间选择面板配置 | `PickerTimePanelOptions \| PickerTimePanelOptions[]` | - | - | 如果需要对前后的时间选择器使用不同配置，可以传入一个数组 |
| `onChange` | 选中的日期范围值改变后的回调 | `(value: Date[], oldValue: Date[]) => void` | - | - | - |
| `onInput` | 输入后的回调 | `(isFrom: boolean, evt: Event) => void` | - | - | - |
| `onSelect` | 面板选择的日期范围值改变的回调 | `(dates: (Date \| undefined)[] \| undefined) => void` | - | - | 仅选中起点或终点时也会触发 |

```ts
// 内置支持的快捷选项
type PresetRangeShortcut = 'today' | 'yesterday' | 'last24h' | 'last7d' | 'last30d' | 'last180d' | 'custom'

// 快捷选项对应面板渲染函数的上下文
interface RangeShortcutPanelRenderContext {
  slots: Slots // IxDataRangePicker 的插槽
  setBuffer: (value: [Date, Date] | undefined) => void // 修改临时日期范围值
  setValue: (value: [Date, Date] | undefined) => void // 修改日期范围值
  ok: () => void // 确定
  cancel: () => void // 取消
}
interface RangeShortcutOptions {
  key: VKey // 唯一的Key
  label: string // 在快捷栏中展示的label
  confirmOnSelect?: boolean // 是否在选中快捷选项的时候确认选择，而不是仅仅修改buffer
  selectedLabel?: string // 选中后在选择框中显示的label
  value?: [Date, Date] // 快捷选项对应的日期范围值
  onClick?: (evt: MouseEvent) => void // 点击回调
  panelRenderer?: (context: RangeShortcutPanelRenderContext) => VNodeChild // 自定义快捷选项对应的面板渲染
}

type RangeShortcut = PresetRangeShortcut | RangeShortcutOptions

type RangeShortcutProp =
  | RangeShortcut[]
  | {
      showPanel?: boolean // 是否默认展示面板
      shortcuts: RangeShortcut[] // 快捷选项
    }
```

#### DateRangePickerSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `footer` | 自定义日期面板中的页脚 | - | - |
| `cell` | 自定义日期面板中的单元格 | `{date: Date}` | - |
| `triggerContent` | 自定义日期选择器的触发器内容 | `DateRangePickerTriggerContentSlotParams` | - |

```ts
interface DateRangePickerTriggerContentSlotParams {
  selectedShortcut: RangeShortcutOption | undefined
  inputValue: [string, string]
  placeholder: [string, string]
  readonly: boolean
  disabled: boolean
  handleFromInput: (evt: Event) => void
  handleToInput: (evt: Event) => void
}
```

### IxDatePickerPanel

#### DatePickerPanelProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:activeValue` | 当前激活状态的日期 | `Date` | - | - | 配合键盘操作使用 |
| `cellTooltip` | 日期节点的tooltip | `(cell: { value: Date, disabled: boolean }) => string \| void` | - | - | - |
| `disabledDate` | 不可选择的日期 | `(date: Date) => boolean` | - | - | - |
| `type` | 设置选择器面板类型 | `'date' \| 'week' \| 'month' \| 'quarter' \| 'year' \| 'datetime'` | `'date'` | - | - |
| `timePanelOptions` | 时间选择面板配置 | `TimePanelOptions` | - | - | - |
| `visible` | 当前可见的面板 | `'datePanel' \| 'timePanel' \| visible` | - | - | 在非 `datetime` 类型时，`timepanel` 无效 |
| `onChange` | 值改变后的回调 | `(value: Date \| undefined) => void` | - | - | - |

### IxDateRangePickerPanel

#### DateRangePickerPanelProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:activeValue` | 当前激活状态的日期 | `Date[]` | - | - | 配合键盘操作使用 |
| `cellTooltip` | 日期节点的tooltip | `(cell: { value: Date, disabled: boolean }) => string \| void` | - | - | - |
| `disabledDate` | 不可选择的日期 | `(date: Date) => boolean` | - | - | - |
| `type` | 设置选择器面板类型 | `'date' \| 'week' \| 'month' \| 'quarter' \| 'year' \| 'datetime'` | `'date'` | - | - |
| `timePanelOptions` | 时间选择面板配置 | `TimePanelOptions \| TimePanelOptions[]` | - | - | 如果需要对前后的时间选择器使用不同配置，可以传入一个数组 |
| `visible` | 当前可见的面板 | `'datePanel' \| 'timePanel' \| boolean` | - | - | 在非 `datetime` 类型时，`timepanel` 无效 |
| `onChange` | 值改变后的回调 | `(value: Date[] \| undefined) => void` | - | - | - |
| `onSelect` | 面板选择的日期范围值改变的回调 | `(dates: (Date \| undefined)[] \| undefined) => void` | - | - | 仅选中起点或终点时也会触发 |

#### TimePanelOptions

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `disabledHours` | 禁用部分小时选项 | `(selectedAmPm: string \| undefined) => number[]` | ``() => []`` | - | - |
| `disabledMinutes` | 禁用部分分钟选项 | `(selectedHour: number \| undefined, selectedAmPm: string \| undefined) => number[]` | `() => []` | - | - |
| `disabledSeconds` | 禁用部分秒选项 | `(selectedHour: number \| undefined, selectedMinute: number \| undefined, selectedAmPm: string \| undefined)=>number[]` | `() => []` | - | - |
| `hideDisabledOptions` | 隐藏禁止选择的options |`boolean` |`false` | - | - |
| `hourStep` | 小时选项的间隔 | `number` | `1` | - | - |
| `minuteStep` | 分钟选项的间隔 | `number` | `1` | - | - |
| `secondStep` | 秒选项的间隔 | `number` | `1` | - | - |
| `hourEnabled` | 是否显示小时选择列 | `boolean` | `true` | - | - |
| `minuteEnabled` | 是否显示分钟选择列 | `boolean` | `true` | - | - |
| `secondEnabled` | 是否显示秒选择列 | `boolean` | `true` | - | - |
| `use12Hours` | 是否显示AM\PM选择列 | `boolean` | `false` | - | - |
