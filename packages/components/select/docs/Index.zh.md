---
category: components
type: 数据录入
title: Select
subtitle: 选择器
order: 0
---

下拉选择器。

## 何时使用

弹出一个下拉菜单给用户选择操作，用于代替原生的选择器。

## API

### ix-select

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 当前选中的 option 的值 | `any \| any[]` | - | - | 当 `mode` 为 `multiple` 或 `tags` 时，`value` 为数组 |
| `control` | 控件控制器 | `string \| AbstractControl` | - | - | 当存在 `control` 时, 控件将由 `AbstractControl` 完全控制，此时 `value` 会失效 |
| `v-model:open` | 下拉菜单是否展开 | `boolean` | `false` | - | - |
| `autofocus` | 默认获取焦点 | `boolean` | `false` | - | - |
| `borderless` | 是否无边框 | `boolean` | `false` | ✅ | - |
| `clearable` | 是否显示清除图标 | `boolean` | `false` | ✅ | - |
| `compareWith` | 用于自定义判断两个 `option` 的值是否相同 | `(o1: any, o2: any) => boolean` | `(o1: any, o2: any) => o1 === o2` | - | 通常用于 `option` 的为对象的情况 |
| `disabled` | 是否禁用状态 | `boolean` | `false` | - | - |
| `empty` | 自定义当下拉列表为空时显示的内容 | `string \| v-slot:empty` | - | - | - |
| `filterOption` | 根据搜索的文本进行筛选 | `boolean \| (searchValue: string, option: OptionProps) => boolean` | `true` | - | 为 `true` 时使用 `defaultFilterFn`, 如果使用远程搜索，应该设置为 `false` |
| `inputable` | 允许输入模式 | `boolean` | `false` | - | `Todo` |
| `labelKey` | 标签的 key | `string` | `label` | ✅ | 仅在使用 `options` 时有效 |
| `maxLabelCount` | 最多显示多少个标签 | `number` | - | - | - |
| `multiple` | 多选模式 | `boolean` | `false` | - | - |
| `multipleLimit` | 最多选中多少项 | `number` | - | - | - |
| `overlayClassName` | 下拉菜单的 className 属性 | `string` | - | - | - |
| `options` | 选项列表，可以取代 `ix-option` | `SelectOption[]` | - | - | - |
| `placeholder` | 选择框默认文本 | `string` | - | - | - |
| `searchable` | 是否可搜索 | `boolean` | `false` | ✅ | - |
| `size` | 设置选择器大小 | `large \| medium \| small` | `medium` | ✅ | - |
| `suffix` | 设置后缀图标 | `string \| v-slot:suffix` | - | ✅ | 单选默认为 `down` |

```ts
export interface SelectOption {
  label: string
  value: any
  disabled?: boolean
  groupLabel?: string
  [key: string]: any
}

const defaultFilterFn: SelectFilterFn = (value: string, option: OptionProps) => {
  return option.label.toLowerCase().includes(value.toLowerCase())
}
```

#### SelectSlots

| 名称 | 说明 | 参数类型 | 备注 |
|  -- | -- | -- | -- |
|  `default` | 选项内容 | - | - |
|  `customLabel` | 自定义选中的标签 | `option: OptionProps` | - |
|  `customMaxLabel` | 自定义超出最多显示多少个标签的内容 | `option: OptionProps` | - |
|  `dropdownExtra` | 自定义下拉菜单的扩展内容 | `option: OptionProps` | `Todo` |

#### SelectEmits

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `blur` | blur 时回调 | `() => void` | - |
| `change` | 选中的值发生改变 | `(value: any) => void` | - |
| `clear` | 清除图标被点击 | `(evt: MouseEvent) => void` | - |
| `focus` | focus 时回调 | `() => void` | - |
| `scrollToBottom` | 下拉列表滚动到底部的回调 | `() => void` | `Todo` |
| `inputChange` | 输入框文本发生改变 | `(inputValue: string) => void` | - |

### ix-option

#### OptionProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `disabled` | 是否禁用 | `boolean` | `false` | - | - |
| `label` | 显示的文本 | `string` | - | - | 必填项，同时也是被选中后文本框显示的内容 |
| `value` | option 的值 | `any` | - | - | - |

#### OptionSlots

| 名称 | 说明 | 参数类型 | 备注 |
|  -- | -- | -- | -- |
|  `default` | 显示的文本 | - | - |

### ix-option-group

#### OptionGroupProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `disabled` | 是否禁用组内所有项 | `boolean` | `false` | - | - |
| `label` | 分组名 | `string` | - | - | 必填项 |

#### OptionGroupSlots

| 名称 | 说明 | 参数类型 | 备注 |
|  -- | -- | -- | -- |
|  `default` | Option 内容 | - | - |
|  `label` | 分组名 | - | - |
