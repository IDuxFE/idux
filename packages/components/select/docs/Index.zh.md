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
| `v-model:value` | 当前选中的 option 的值 | `any \| any[]` | - | - | 当 `mode` 为 `multiple` 或 `tags` 时，`value` 为数组 |
| `v-model:open` | 下拉菜单是否展开 | `boolean` | - | - | - |
| `allowInput` | 允许输入模式 | `boolean` | `false` | - | - |
| `autofocus` | 默认获取焦点 | `boolean` | `false` | - | - |
| `borderless` | 是否无边框 | `boolean` | `false` | ✅ | - |
| `childrenKey` | 分组选项的 key | `string` | `children` | ✅ | 仅在使用 `options` 时有效 |
| `clearable` | 是否显示清除图标 | `boolean` | `false` | - | - |
| `compareWith` | 用于自定义判断两个 `option` 的值是否相同 | `(o1: any, o2: any) => boolean` | `(o1: any, o2: any) => o1 === o2` | - | 通常用于 `option` 的为对象的情况 |
| `disabled` | 是否禁用状态 | `boolean` | `false` | - | - |
| `empty` | 自定义当下拉列表为空时显示的内容 | `string \| EmptyProps \| #empty` | - | - | - |
| `labelKey` | 选项 label 的 key | `string` | `label` | ✅ | 仅在使用 `options` 时有效 |
| `maxLabelCount` | 最多显示多少个标签 | `number` | - | - | - |
| `multiple` | 多选模式 | `boolean` | `false` | - | - |
| `multipleLimit` | 最多选中多少项 | `number` | - | - | - |
| `options` | 选项列表，可以取代 `IxSelectOption` | `SelectOption[]` | - | - | 推荐使用此配置替换 `template`, 性能会更好 |
| `overlayClassName` | 下拉菜单的 `class`  | `string` | - | - | - |
| `overlayRender` | 自定义下拉菜单内容的渲染  | `(children:VNode[]) => VNodeTypes` | - | - | - |
| `placeholder` | 选择框默认文本 | `string \| #placeholder` | - | - | - |
| `readonly` | 只读模式 | `boolean` | - | - | - |
| `searchable` | 是否可搜索 | `boolean` | `false` | - | - |
| `searchFilter` | 根据搜索的文本进行筛选 | `boolean \| SelectFilterFn` | `true` | - | 为 `true` 时使用默认的搜索规则, 如果使用远程搜索，应该设置为 `false` |
| `size` | 设置选择器大小 | `'sm' \| 'md' \| 'lg'` | `md` | ✅ | - |
| `suffix` | 设置后缀图标 | `string \| #suffix` | `down` | ✅ | - |
| `target` | 自定义浮层容器节点 | `string \| HTMLElement \| () => string \| HTMLElement` | - | ✅ | - |
| `valueKey` | 选项 value 的 key | `string` | `value` | ✅ | - |
| `virtual` | 是否开启虚拟滚动 | `boolean` | `false` | - | - |
| `onScroll` | 滚动事件 | `(evt: Event) => void` | - | - | - |
| `onScrolledChange` | 滚动的位置发生变化 | `(startIndex: number, endIndex: number, visibleNodes: TreeNode[]) => void` | - | - | 仅 `virtual` 模式下可用 |
| `onScrolledBottom` | 滚动到底部时触发 | `() => void` | - | - | 仅 `virtual` 模式下可用 |

```ts
export interface SelectOption {
  additional?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    class?: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    style?: any
    [key: string]: unknown
  }
  disabled?: boolean
  key?: VKey
  label?: string
  options?: SelectOption[]
  slots?: Slots | Record<string, (...args: any[]) => VNode>
  value?: any
  [key: string]: any
}

export type SelectFilterFn = (searchValue: string, selectOption: SelectOptionProps) => boolean
```

#### SelectSlots

| 名称 | 说明 | 参数类型 | 备注 |
|  -- | -- | -- | -- |
|  `default` | 选项内容 | - | - |
|  `label` | 自定义选中的标签 | `option: SelectOption` |  |
|  `maxLabel` | 自定义超出最多显示多少个标签的内容 | `options: SelectOption[]` | 参数为超出的数组 |

#### SelectMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `blur` | 失去焦点 | - | - |
| `focus` | 获取焦点 | - | - |
| `scrollTo` | 滚动到指定位置 | `(option?: number \| VirtualScrollToOptions) => void` | 仅 `virtual` 模式下可用 |

### IxSelectOption

#### SelectOptionProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `disabled` | 是否禁用 | `boolean` | `false` | - | - |
| `label` | 显示的文本 | `string \| #default` | - | - | - |
| `value` | option 的值 | `string \| number \| object` | - | - | - |

### IxSelectOptionGroup

#### SelectOptionGroupProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `label` | 分组名 | `string \| #label` | - | - | 必填项 |

#### SelectOptionGroupSlots

| 名称 | 说明 | 参数类型 | 备注 |
|  -- | -- | -- | -- |
|  `default` | 选项内容 | - | - |
