---
category: components
type: 数据录入
title: Select
subtitle: 选择器
order: 0
---

## API

### IxSelect

#### SelectProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `v-model:value` | 当前选中的 option 的值 | `any \| any[]` | - | - | 当 `multiple=true` 时，`value` 为数组，使用 `control` 时，此配置无效 |
| `v-model:open` | 下拉菜单是否展开 | `boolean` | - | - | - |
| `allowInput` | 允许输入模式 | `boolean` | `false` | - | - |
| `autofocus` | 默认获取焦点 | `boolean` | `false` | - | - |
| `borderless` | 是否无边框 | `boolean` | `false` | ✅ | - |
| `childrenKey` | 分组选项的 key | `string` | `children` | ✅ | 仅在使用 `dataSource` 时有效 |
| `clearable` | 是否显示清除图标 | `boolean` | `false` | - | - |
| `clearIcon` | 设置清除图标 | `string \| #clearIcon` | `'close-circle'` | ✅ | - |
| `compareFn` | 用于自定义判断两个 `option` 的值是否相同 | `(o1: any, o2: any) => boolean` | `(o1: any, o2: any) => o1 === o2` | - | 通常用于 `option` 的为对象的情况 |
| `dataSource` | 选项数据源 | `SelectData[]` | - | - | 优先级高于 `default` 插槽, 性能会更好 |
| `disabled` | 是否禁用状态 | `boolean` | `false` | - | 使用 `control` 时，此配置无效 |
| `empty` | 自定义当下拉列表为空时显示的内容 | `string \| EmptyProps \| #empty` | - | - | - |
| `labelKey` | 选项 label 的 key | `string` | `label` | ✅ | 仅在使用 `dataSource` 时有效 |
| `maxLabelCount` | 最多显示多少个标签 | `number` | - | - | - |
| `multiple` | 多选模式 | `boolean` | `false` | - | - |
| `multipleLimit` | 最多选中多少项 | `number` | - | - | - |
| `overlayClassName` | 下拉菜单的 `class`  | `string` | - | - | - |
| `overlayRender` | 自定义下拉菜单内容的渲染  | `(children:VNode[]) => VNodeTypes` | - | - | - |
| `placeholder` | 选择框默认文本 | `string \| #placeholder` | - | - | - |
| `readonly` | 只读模式 | `boolean` | - | - | - |
| `searchable` | 是否可搜索 | `boolean \| 'overlay'` | `false` | - | 当为 `true` 时搜索功能集成在选择器上，当为 `overlay` 时，搜索功能集成在悬浮层上 |
| `searchFn` | 根据搜索的文本进行筛选 | `boolean \| SelectSearchFn` | `true` | - | 为 `true` 时使用默认的搜索规则, 如果使用远程搜索，应该设置为 `false` |
| `size` | 设置选择器大小 | `'sm' \| 'md' \| 'lg'` | `md` | ✅ | - |
| `suffix` | 设置后缀图标 | `string \| #suffix` | `down` | ✅ | - |
| `target` | 自定义浮层容器节点 | `string \| HTMLElement \| () => string \| HTMLElement` | - | ✅ | - |
| `valueKey` | 选项 value 的 key | `string` | `value` | ✅ | 仅在使用 `dataSource` 时有效 |
| `virtual` | 是否开启虚拟滚动 | `boolean` | `false` | - | - |
| `onChange` | 选中值发生改变后的回调 | `(value: any, oldValue: any) => void` | - | - | - |
| `onClear` | 清除图标被点击后的回调 | `(evt: MouseEvent) => void` | - | - | - |
| `onSearch` | 开启搜索功能后，输入后的回调 | `(searchValue: string) => void` | - | - | 通常用于服务端搜索 |
| `onScroll` | 滚动事件 | `(evt: Event) => void` | - | - | - |
| `onScrolledChange` | 滚动的位置发生变化 | `(startIndex: number, endIndex: number, visibleData: SelectData[]) => void` | - | - | 仅 `virtual` 模式下可用 |
| `onScrolledBottom` | 滚动到底部时触发 | `() => void` | - | - | 仅 `virtual` 模式下可用 |

```ts
export type SelectData = SelectOptionProps | SelectOptionGroupProps

export type SelectSearchFn = (data: SelectData, searchValue: string) => boolean
```

#### SelectCommonProps

`SelectData` 的通用属性

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `key` | 唯一标识 | `VKey` | - | - | 不传时使用 `index` 代替 |
| `additional` | 选项的扩展属性 | `object` | - | - | 可以传入 `class`, `style` 等原生 DOM 属性 |
| `label` | 选项的文本 | `string` | - | - | - |

#### SelectOptionProps

继承自 `SelectCommonProps`

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `disabled` | 是否禁用 | `boolean` | `false` | - | - |
| `value` | option 的值 | `string \| number \| object` | - | - | - |
| `customLabel` | 自定义文本内容 | `string \| ((data: SelectOptionProps) => VNodeChild)` | - | - | 类型为 `string` 时，对应插槽名 |

#### SelectOptionGroupProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `children` | 子选项 | `SelectOptionProps[]` | - | - | - |
| `customLabel` | 自定义文本内容 | `string \| ((data: SelectOptionGroupProps) => VNodeChild)` | - | - | 类型为 `string` 时，对应插槽名 |

#### SelectSlots

| 名称 | 说明 | 参数类型 | 备注 |
|  -- | -- | -- | -- |
|  `default` | 选项内容 | - | - |
|  `selectedLabel` | 自定义选中的标签 | `data: SelectOption` |  |
|  `overflowedLabel` | 自定义超出最多显示多少个标签的内容 | `data: SelectOption[]` | 参数为超出的数组 |
|  `optionLabel` | 自定义选项的文本 | `data: SelectOption` | - |
|  `optionGroupLabel` | 自定义选项组的文本 | `data: SelectOptionGroup` | - |

#### SelectMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `blur` | 失去焦点 | - | - |
| `focus` | 获取焦点 | - | - |
| `scrollTo` | 滚动到指定位置 | `(option?: number \| VirtualScrollToOptions) => void` | 仅 `virtual` 模式下可用 |

### IxSelectOption

在 `template` 中设置 `SelectOptionProps`。

### IxSelectOptionGroup

在 `template` 中设置 `SelectOptionGroupProps`。

<!--- insert less variable begin  --->
## 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@select-font-size-sm` | `@form-font-size-sm` | - | - |
| `@select-font-size-md` | `@form-font-size-md` | - | - |
| `@select-font-size-lg` | `@form-font-size-lg` | - | - |
| `@select-line-height` | `@form-line-height` | - | - |
| `@select-height-sm` | `@form-height-sm` | - | - |
| `@select-height-md` | `@form-height-md` | - | - |
| `@select-height-lg` | `@form-height-lg` | - | - |
| `@select-padding-horizontal-sm` | `@form-padding-horizontal-sm` | - | - |
| `@select-padding-horizontal-md` | `@form-padding-horizontal-md` | - | - |
| `@select-padding-horizontal-lg` | `@form-padding-horizontal-lg` | - | - |
| `@select-padding-vertical-sm` | `@form-padding-vertical-sm` | - | - |
| `@select-padding-vertical-md` | `@form-padding-vertical-md` | - | - |
| `@select-padding-vertical-lg` | `@form-padding-vertical-lg` | - | - |
| `@select-border-width` | `@form-border-width` | - | - |
| `@select-border-style` | `@form-border-style` | - | - |
| `@select-border-color` | `@form-border-color` | - | - |
| `@select-border-radius` | `@border-radius-sm` | - | - |
| `@select-color` | `@form-color` | - | - |
| `@select-color-secondary` | `@form-color-secondary` | - | - |
| `@select-background-color` | `@form-background-color` | - | - |
| `@select-placeholder-color` | `@form-placeholder-color` | - | - |
| `@select-hover-color` | `@form-hover-color` | - | - |
| `@select-active-color` | `@form-active-color` | - | - |
| `@select-active-box-shadow` | `@form-active-box-shadow` | - | - |
| `@select-disabled-color` | `@form-disabled-color` | - | - |
| `@select-disabled-background-color` | `@form-disabled-background-color` | - | - |
| `@select-option-font-size` | `@font-size-md` | - | - |
| `@select-option-height` | `@height-md` | - | - |
| `@select-option-padding` | `@spacing-sm @spacing-md` | - | - |
| `@select-option-color` | `@text-color` | - | - |
| `@select-option-disabled-color` | `@text-color-disabled` | - | - |
| `@select-option-active-background-color` | `@color-graphite-l50` | - | - |
| `@select-option-selected-color` | `@color-primary` | - | - |
| `@select-option-selected-background-color` | `@color-primary-l50` | - | - |
| `@select-option-selected-font-weight` | `@font-weight-xl` | - | - |
| `@select-option-label-margin-left` | `@spacing-sm` | - | - |
| `@select-option-group-border` | `@border-width-sm @border-style @border-color` | - | - |
| `@select-option-group-color` | `@color-graphite` | - | - |
| `@select-option-group-margin` | `0 @spacing-md` | - | - |
| `@select-option-group-padding-left` | `0` | - | - |
| `@select-option-grouped-padding-left` | `@spacing-xl` | - | - |
| `@select-option-container-zindex` | `@zindex-l4-3` | - | - |
| `@select-option-container-padding` | `@spacing-sm 0` | - | - |
| `@select-option-container-background-color` | `@background-color-component` | - | - |
| `@select-option-container-border-radius` | `@border-radius-sm` | - | - |
| `@select-option-container-box-shadow` | `@shadow-bottom-md` | - | - |
| `@select-overlay-input-padding` | `0 @spacing-md @spacing-sm` | - | - |
| `@select-icon-font-size` | `@font-size-sm` | - | - |
| `@select-icon-margin-right` | `@spacing-xs` | - | - |
| `@select-icon-color` | `@select-placeholder-color` | - | - |
| `@select-icon-hover-color` | `@select-color-secondary` | - | - |
| `@select-icon-background-color` | `@select-background-color` | - | - |
| `@select-multiple-padding` | `@select-padding-vertical-md` | - | - |
| `@select-multiple-item-padding` | `0 @spacing-xs` | - | - |
| `@select-multiple-item-background-color` | `@color-graphite-l40` | - | - |
| `@select-multiple-item-disabled-color` | `@select-disabled-color` | - | - |
| `@select-multiple-item-disabled-border-color` | `@select-border-color` | - | - |
| `@select-multiple-item-border-width` | `@border-width-sm` | - | - |
| `@select-multiple-item-border` | `@select-multiple-item-border-width @border-style @border-color-split` | - | - |
| `@select-multiple-item-border-radius` | `@select-border-radius` | - | - |
| `@select-multiple-item-label-margin-left` | `@spacing-xs` | - | - |
| `@select-multiple-item-remove-icon-font-size` | `@font-size-xs` | - | - |
| `@select-multiple-item-remove-icon-color` | `@color-graphite` | - | - |
| `@select-multiple-item-remove-icon-hover-color` | `@color-graphite-d10` | - | - |
<!--- insert less variable end  --->