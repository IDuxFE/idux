
### IxSelect

#### SelectProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `control` | 控件控制器 | `string \| number \| (string \| number)[] \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `v-model:value` | 当前选中的 option 的值 | `any \| any[]` | - | - | 当 `multiple=true` 时，`value` 为数组，使用 `control` 时，此配置无效 |
| `v-model:open` | 下拉菜单是否展开 | `boolean` | - | - | - |
| `allowInput` | 允许输入模式 | `boolean` | `false` | - | - |
| `autocomplete` | 设置选择器的 `autocomplete` | `string` | `off` | - | - |
| `autofocus` | 默认获取焦点 | `boolean` | `false` | - | - |
| `borderless` | 是否无边框 | `boolean` | `false` | ✅ | - |
| `childrenKey` | 分组选项的 key | `string` | `children` | ✅ | 仅在使用 `dataSource` 时有效 |
| `clearable` | 是否显示清除图标 | `boolean` | `false` | - | - |
| `clearIcon` | 设置清除图标 | `string \| #clearIcon` | `'close-circle'` | ✅ | - |
| `customAdditional` | 自定义下拉选项的额外属性 | `SelectCustomAdditional` | - | - | 例如 `class`, 或者原生事件 |
| `dataSource` | 选项数据源 | `SelectData[]` | - | - | 优先级高于 `default` 插槽, 性能会更好 |
| `disabled` | 是否禁用状态 | `boolean` | `false` | - | 使用 `control` 时，此配置无效 |
| `dndSortable` | 拖拽排序配置 | `boolean` | `SelectDndSortable` | `false` | - |
| `empty` | 自定义当下拉列表为空时显示的内容 | `'default' \| 'simple' \| EmptyProps` | `'simple'` | - | - |
| `getKey` | 获取数据的唯一标识 | `string \| (data: SelectData) => VKey` | `key` | ✅ | 为了兼容之前的版本，默认值也会支持 `value` |
| `labelKey` | 选项 label 的 key | `string` | `label` | ✅ | 仅在使用 `dataSource` 时有效 |
| `maxLabel` | 最多显示多少个标签，响应式模式会对性能产生损耗 | `number \| 'responsive'` | - | - | - |
| `multiple` | 多选模式 | `boolean` | `false` | - | - |
| `multipleLimit` | 最多选中多少项 | `number` | - | - | - |
| `offset` | 浮层相对目标元素的偏移量 | `[number, number]` | `[0, 4]` | ✅ | 第一个元素是水平偏移量，第二个元素是垂直偏移量 |
| `overlayClassName` | 下拉菜单的 `class`  | `string` | - | - | - |
| `overlayContainer` | 自定义下拉框容器节点  | `string \| HTMLElement \| (trigger?: Element) => string \| HTMLElement` | - | ✅ | - |
| `overlayMatchWidth` | 下拉菜单和选择器同宽  | `boolean \| 'minWidth'` | `true` | ✅ | - |
| `overlayRender` | 自定义下拉菜单内容的渲染  | `(children:VNode[]) => VNodeTypes` | - | - | - |
| `overlayTabindex` | 自定义浮层tabindex | `number` | - | ✅ | - |
| `placeholder` | 选择框默认文本 | `string \| #placeholder` | - | - | - |
| `readonly` | 只读模式 | `boolean` | - | - | - |
| `searchable` | 是否可搜索 | `boolean \| 'overlay'` | `false` | - | 当为 `true` 时搜索功能集成在选择器上，当为 `overlay` 时，搜索功能集成在悬浮层上 |
| `searchFn` | 根据搜索的文本进行筛选 | `boolean \| SelectSearchFn` | `true` | - | 为 `true` 时使用默认的搜索规则, 如果使用远程搜索，应该设置为 `false` |
| `size` | 设置选择器大小 | `'sm' \| 'md' \| 'lg'` | `md` | ✅ | - |
| `spin` | 是否显示加载中状态 | `boolean \| SpinProps` | `undefined` | - | - |
| `status` | 手动指定校验状态 | `valid \| invalid \| validating` | - | - | - |
| `suffix` | 设置后缀图标 | `string \| #suffix` | `down` | ✅ | - |
| `virtual` | 是否开启虚拟滚动 | `boolean` | `false` | - | - |
| `virtualScrollMode` | 虚拟滚动的滚动模式 | `'native' \| 'simulated'` | `'native'` | - | - |
| `onChange` | 选中值发生改变后的回调 | `(value: any, oldValue: any) => void` | - | - | - |
| `onClear` | 清除图标被点击后的回调 | `(evt: MouseEvent) => void` | - | - | - |
| `onSearch` | 开启搜索功能后，输入后的回调 | `(searchValue: string) => void` | - | - | 通常用于服务端搜索 |
| `onScroll` | 滚动事件 | `(evt: Event) => void` | - | - | - |
| `onScrolledChange` | 滚动的位置发生变化 | `(startIndex: number, endIndex: number, visibleData: SelectData[]) => void` | - | - | 仅 `virtual` 模式下可用 |
| `onScrolledBottom` | 滚动到底部时触发 | `() => void` | - | - | 仅 `virtual` 模式下可用 |
| `onScrolledChange` | 滚动的位置发生变化 | `(startIndex: number, endIndex: number, visibleData: SelectData[]) => void` | - | - | 仅 `virtual` 模式下可用 |
| `onDndSortReorder` | 数据重排序之后的回调 | `(reorderInfo: DndSortableReorderInfo) => void` | - | - | - |
| `onDndSortChange` | 数据排序改变之后的回调 | `(newData: SelectData[], oldData: SelectData[]) => void` | - | - | - |

```ts
export interface DndSortableReorderInfo {
  sourceIndex: number
  targetIndex: number
  sourceKey: VKey
  targetKey: VKey
  sourceData: SelectData
  targetData: SelectData
  operation: 'insertBefore' | 'insertAfter' | 'insertChild'
}
```

```ts
export type SelectData = SelectOptionProps | SelectOptionGroupProps

export type SelectCustomAdditional = (options: { data: SelectData; index: number }) => Record<string, any> | undefined

export type SelectSearchFn = (data: SelectData, searchValue: string) => boolean
```

#### SelectOptionProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `key` | 唯一标识, 也是选项的值 | `VKey` | - | - | 可以通过 `getKey` 来指定其他值 |
| `disabled` | 是否禁用 | `boolean` | `false` | - | - |
| `label` | 选项的文本 | `string` | - | - | - |
| `customLabel` | 自定义文本内容 | `string \| ((data: SelectOptionProps) => VNodeChild)` | - | - | 类型为 `string` 时，对应插槽名 |

#### SelectOptionGroupProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `key` | 唯一标识 | `VKey` | - | - | 可以通过 `getKey` 来指定其他值 |
| `children` | 子选项 | `SelectOptionProps[]` | - | - | - |
| `label` | 选项的文本 | `string` | - | - | - |
| `customLabel` | 自定义文本内容 | `string \| ((data: SelectOptionGroupProps) => VNodeChild)` | - | - | 类型为 `string` 时，对应插槽名 |

#### SelectSlots

| 名称 | 说明 | 参数类型 | 备注 |
|  -- | -- | -- | -- |
| `empty` | 自定义空状态 |  - | - |
| `selectedItem` | 自定义选中项 | `data: SelectedItemProps` | 使用该插槽后`selectedLabel`将无效 |
| `selectedLabel` | 自定义选中的标签 | `data: SelectOption` |  |
| `overflowedLabel` | 自定义超出最多显示多少个标签的内容 | `data: SelectOption[]` | 参数为超出的数组 |
| `optionLabel` | 自定义选项的文本 | `data: SelectOption` | - |
| `optionGroupLabel` | 自定义选项组的文本 | `data: SelectOptionGroup` | - |

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

#### SelectMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `blur` | 失去焦点 | - | - |
| `focus` | 获取焦点 | - | - |
| `scrollTo` | 滚动到指定位置 | `(option?: number \| VirtualScrollToOptions) => void` | 仅 `virtual` 模式下可用 |

### IxSelectPanel

#### SelectPanelProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `activeValue` | 当前处于激活状态的Key | `VKey` | - | 用于配合搜索和键盘操作 |
| `selectedKeys` | 当前选中的 option 的值 | `any \| any[]` | - | - | 当 `multiple=true` 时，`value` 为数组，使用 `control` 时，此配置无效 |
| `childrenKey` | 分组选项的 key | `string` | `children` | ✅ | 仅在使用 `dataSource` 时有效 |
| `customAdditional` | 自定义下拉选项的额外属性 | `SelectCustomAdditional` | - | - | 例如 `class`, 或者原生事件 |
| `dataSource` | 选项数据源 | `SelectData[]` | - | - | IxSelectPanel仅支持使用dataSource，不支持通过插槽配置 |
| `empty` | 自定义当下拉列表为空时显示的内容 | `'default' \| 'simple' \| EmptyProps` | `'simple'` | - | - |
| `getKey` | 获取数据的唯一标识 | `string \| (data: SelectData) => VKey` | `key` | ✅ | 为了兼容之前的版本，默认值也会支持 `value` |
| `labelKey` | 选项 label 的 key | `string` | `label` | ✅ | 仅在使用 `dataSource` 时有效 |
| `multiple` | 多选模式 | `boolean` | `false` | - | - |
| `multipleLimit` | 最多选中多少项 | `number` | - | - | - |
| `virtual` | 是否开启虚拟滚动 | `boolean` | `false` | - | - |
| `onScroll` | 滚动事件 | `(evt: Event) => void` | - | - | - |
| `onScrolledChange` | 滚动的位置发生变化 | `(startIndex: number, endIndex: number, visibleData: SelectData[]) => void` | - | - | 仅 `virtual` 模式下可用 |
| `onScrolledBottom` | 滚动到底部时触发 | `() => void` | - | - | 仅 `virtual` 模式下可用 |

#### SelectPanelSlots

| 名称 | 说明 | 参数类型 | 备注 |
|  -- | -- | -- | -- |
| `empty` | 自定义空状态 |  - | - |

#### SelectPanelMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `changeActiveIndex` | 切换当前处于激活状态的选项 | `(offset: 0 | 1 | -1) => void` | 用于配合键盘操作 |
| `scrollTo` | 滚动到指定位置 | `(option?: number \| VirtualScrollToOptions) => void` | 仅 `virtual` 模式下可用 |

### IxSelectOption

在 `template` 中设置 `SelectOptionProps`。

### IxSelectOptionGroup

在 `template` 中设置 `SelectOptionGroupProps`。
