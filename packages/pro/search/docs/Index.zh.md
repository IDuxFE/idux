---
category: pro
type: 数据录入
order: 0
title: ProSearch
subtitle: 复合搜索
---

## API

### IxProSearch

#### ProSearchProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 复合选中的搜索值 | - | - | ✅ | - |
| `clearable` | 是否可清除 | `boolean` | `true` | ✅ | - |
| `clearIcon` | 清除图标 | `string \| VNode \| #clearIcon` | `close-circle` | ✅ | - |
| `disabled` | 是否禁用 | `boolean` | `false` | - | - |
| `overlayContainer` | 自定义浮层容器节点  | `string \| HTMLElement \| () => string \| HTMLElement` | - | ✅ | - |
| `placeholder` | 默认文本 | `string` | - | - | - |
| `searchFields` | 搜索选项 | `SearchField[]` | - | - | 用于配置支持那些搜索条件 |
| `onChange` | 搜索条件改变之后的回调 | `(value: searchValue[] \| undefined, oldValue: searchValue[] \| undefined) => void` | - | - | - |
| `onClear` | 清除搜索条件的回调 | `() => void` | - | - | - |
| `onItemRemove` | 搜索条件删除时的回调 | `(item: SearchValue) => void` | - | - | - |
| `onItemInvalid` | 搜索条件不合法时触发的回调 | `(item: InvalidSearchValue) => void` | - | - | - |
| `onSearch` | 搜索按钮触发的回调 | `(value: searchValue[] \| undefined) => void` | - | - | - |

#### ProSearchSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `clearIcon` | 清除图标 | - | - |

```typescript
interface SearchValue<V = unknown> {
  key: VKey // 对应SearchData的key
  name?: string // 对应SearchField的label
  value: V // 搜索值
  operator?: string // 搜索操作符
}
interface InvalidSearchValue<V = unknown> extends Partial<SearchValue<V>> {
  nameInput?: string // 搜索字段名称输入
  operatorInput?: string // 操作符输入
  valueInput?: string // 值输入
}
```

### SearchField

`SearchField` 根据 `type` 字段不同区分不通的搜索条件类型，除去共同包含的配置之外，分别有不同的配置项

#### SearchFieldBase

基础配置

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `key` | 唯一的key | `VKey` | - | - | 必填 |
| `label` | 搜索条件的词条名称 | `string` | - | - | 必填 |
| `multiple` | 是否允许重复 | `boolean` | - | - | 为 `true` 时，该搜索条件可以被输入多次 |
| `operators` | 搜索条件的中间操作符 | `string[]` | - | - | 提供时，会在搜索词条名称中间增加一个操作符，如 `'='`, `'!='` |
| `defaultOperator` | 默认的操作符 | `string` | - | - | 提供时，会自动填入默认的操作符 |
| `defaultValue` | 默认值 | - | - | - | 提供时，会自动填入默认值 |
| `inputClassName` | 输入框class | `string` | - | - | 用于自定义输入框样式 |

#### InputSearchField

普通输入类型

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `type` | 类型 | `'input'` | - | - | 固定为 `'input'` |
| `fieldConfig` | 配置 | `{ trim?: boolean }` | - | - | - |

#### SelectSearchField

下拉选择类型

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `type` | 类型 | `'select'` | - | - | 固定为 `'select'` |
| `fieldConfig` | 配置 | `SelectSearchFieldConfig` | - | - | - |

SelectSearchFieldConfig

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `dataSource` | 类型 | `SelectPanelData[]` | - | - | 继承自`SelectData`，但`key`和`label`为必填,不支持可配，详情参考[Select](/components/select/zh) |
| `multiple` | 是否为多选 | `boolean` | - | - | 默认为单选 |
| `searchable` | 是否支持筛选 | `boolean` | false | - | 默认不支持 |
| `searchFn` | 搜索函数 | `(data: SelectPanelData, searchText: string) => boolean` | - | - | 默认模糊匹配 |
| `separator` | 多选分隔符 | `string` | `'|'` | - | - |
| `virtual` | 是否支持虚拟滚动 | `boolean` | `false` | - | 默认不支持 |
| `overlayItemWidth` | 选项宽度 | `number` | - | - | - |

> 注：使用 `Ctrl + Enter` 在多选下切换面板中选项选中状态

```typescript
type SelectPanelData = Required<Pick<SelectData, 'key' | 'label'>> & SelectData
```

#### DatePickerSearchField

日期选择类型

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `type` | 类型 | `'datePicker'` | - | - | 固定为 `'datePicker'` |
| `fieldConfig` | 配置 | `'DatePickerSearchFieldConfig'` | - | - | - |

DatePickerSearchFieldConfig

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `format` | 日期输入格式 | `'格式'` | - | ✅ | 详见[DatePicker](/components/date-picker/zh) |
| `type` | 日期选择类型 | `DatePickerType` | `'date'` | - | 同`DatePicker`的`type`， 详见[DatePicker](/components/date-picker/zh) |
| `cellTooltip` | 日期禁用的悬浮提示 | `(cell: { value: Date, disabled: boolean}) => string | void` | - | - | 详见[DatePicker](/components/date-picker/zh) |
| `disabledDate` | 日期禁用判断 | `(date: Date) => boolean` | - | - | 详见[DatePicker](/components/date-picker/zh) |
| `timePanelOptions` | 时间面板配置 | `TimePanelOptions` | - | - | 详见[DatePicker](/components/date-picker/zh) |

#### DateRangePickerSearchField

日期范围选择类型

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `type` | 类型 | `'dateRangePicker'` | - | - | 固定为 `'dateRangePicker'` |
| `fieldConfig` | 配置 | `'DateRangePickerSearchFieldConfig'` | - | - | - |

DateRangePickerSearchFieldConfig

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `format` | 日期输入格式 | `'格式'` | - | ✅ | 详见[DatePicker](/components/date-picker/zh) |
| `separator` | 日期范围之间的分隔符 | `string` | `'~'` | - | - |
| `type` | 日期选择类型 | `DatePickerType` | `'date'` | - | 同`DatePicker`的`type`， 详见[DatePicker](/components/date-picker/zh) |
| `cellTooltip` | 日期禁用的悬浮提示 | `(cell: { value: Date, disabled: boolean}) => string | void` | - | - | 详见[DatePicker](/components/date-picker/zh) |
| `disabledDate` | 日期禁用判断 | `(date: Date) => boolean` | - | - | 详见[DatePicker](/components/date-picker/zh) |
| `timePanelOptions` | 时间面板配置 | `TimePanelOptions` | - | - | 详见[DatePicker](/components/date-picker/zh) |

#### CustomSearchField

自定义类型

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `type` | 类型 | `'custom'` | - | - | 固定为 `'custom'` |
| `fieldConfig` | 配置 | `CustomSearchFieldConfig` | - | - | - |

CustomSearchFieldConfig

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `customPanel` | 自定义面板渲染 | `string \| (context: PanelRenderContext) => VNodeChild` | - | - | 如果有面板则需要提供，类型为`string`时指代插槽名称 |
| `format` | 数据格式化函数 | `(value: unknown) => string` | - | - | 必填，用于将指定的类型转换成字符串输入 |
| `parse` | 输入解析函数 | `(input: string) => unknown | null` | - | - | 必填，用于将输入的字符串解析到指定的类型 |

```typescript
interface PanelRenderContext<V = unknown> {
  input: string // 输入的字符串
  value: V // 值
  ok: () => void // 确认
  cancel: () => void // 取消
  setValue: (value: V) => void // 设置搜索值
}
```
