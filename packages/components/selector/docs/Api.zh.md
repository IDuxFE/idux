
### IxSelector

#### SelectorProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `allowInput` | 是否允许输入 | `boolean \| 'searchable'` | - | - | 配置为 `'searchable'` 表示可搜索 |
| `autocomplete` | 是否自动补全 | `boolean` | - | - | - |
| `autofocus` | 是否自动聚焦 | `boolean` | - | - | - |
| `borderless` | 是否无边框 | `boolean` | - | - | - |
| `clearable` | 是否可清除 | `boolean` | - | - | - |
| `clearIcon` | 清除图标 | `string \| #clearIcon` | `'close-circle'` | - | - |
| `dataSource` | 选择框数据 | `SelectorData[]` | - | - | - |
| `disabled` | 是否禁用 | `boolean` | - | - | - |
| `focused` | 是否聚焦 | `boolean` | - | - | - |
| `getKey` | 获取数据的唯一标识 | `string \| (data: any) => VKey` | `key` | - | - |
| `labelKey` | 选项 label 的 key | `string` | `label` | - | - |
| `maxLabel` | 最多显示多少个标签 | `number \| 'responsive'` | - | - | 响应式模式会对性能产生损耗 |
| `multiple` | 是否多选 | `boolean` | - | - | - |
| `monitorFocus` | 是否监听内部的focus | `boolean` | `true` | - | 如果不监听，则 `onFocus` 和 `onBlur` 事件不会真正生效 |
| `opened` | 是否处于打开的状态 | `boolean` | `false` | - | 由于选择框主要用于带有下拉面板的场景，该状态是为了配合表现面板打开的状态效果 |
| `placeholder` | 占位符 | `string` | - | - | - |
| `readonly` | 是否是只读 | `boolean` | - | - | - |
| `size` | 设置选择框大小 | `'sm' \| 'md' \| 'lg'` | `md` | - | - |
| `status` | 手动指定校验状态 | `valid \| invalid \| validating` | - | - | - |
| `suffix` | 设置后缀图标 | `string \| #suffix` | `down` | - | - |
| `suffixRotate` | 后缀图标的旋转角度 | `string \| number \| boolean` | - | - | 配置为 `false` 则不会旋转 |
| `onClear` | 清除图标被点击后的回调 | `(evt: MouseEvent) => void` | - | - | - |
| `onFocus` | 获取焦点后的回调 | `(evt: FocusEvent) => void` | - | - | - |
| `onBlur` | 失去焦点后的回调 | `(evt: FocusEvent) => void` | - | - | - |
| `onCompositionStart` | 输入框的 `compositionstart` 事件 | `(evt: CompositionEvent) => void` | - | - | - |
| `onCompositionEnd` | 输入框的 `compositionend` 事件 | `(evt: CompositionEvent) => void` | - | - | - |
| `onInput` | 输入框的 `input` 事件 | `(evt: Event) => void` | - | - | - |
| `onInputValueChange` | 输入的内容变化后的回调事件 | `(value: string) => void` | - | - | 该事件区别于 `onInput` 在于，只会在输入的值变更之后触发，`composition` 阶段不触发 |
| `onItemRemove` | 选项被移除的回调事件 | `(value: any) => void` | - | - | - |

```ts
interface SelectorData<K = VKey> {
  disabled?: boolean
  key?: K
  label?: string | number
  value?: any
  rawData?: any // 原始数据，不提供则认为数据本身是原始数据，提供给插槽作为参数
  customLabel?: string | ((data: SelectorData<K>) => VNodeChild)

  [key: string]: any
}
```

#### SelectorSlots

| 名称 | 说明 | 参数类型 | 备注 |
|  -- | -- | -- | -- |
| `suffix` | 自定义后缀 |  - | - |
| `clearIcon` | 自定义清除图标 |  - | - |
| `placeholder` | 自定义占位符 |  - | - |
| `selectedItem` | 自定义选中项 | `data: SelectedItemProps` | 使用该插槽后`selectedLabel`将无效 |
| `selectedLabel` | 自定义选中的标签 | `data: SelectorData` |  |
| `overflowedLabel` | 自定义超出最多显示多少个标签的内容 | `data: SelectOption[]` | 参数为超出的数组 |

```ts
interface SelectedItemProps {
  disabled: boolean
  key: VKey
  prefixCls: string
  removable: boolean
  label: string
  value: unknown
  onRemove: (key: VKey) => void
}
```

#### SelectorMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `blur` | 失去焦点 | - | - |
| `focus` | 获取焦点 | - | - |
| `clearInput` | 清除输入 | `() => void` | - |
