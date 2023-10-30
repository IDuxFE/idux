
### IxProSearch

#### ProSearchProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 选中的搜索值 | - | - | - | - |
| `v-model:errors` | 校验错误 | `{ index: number, message: string }` | - | - | - |
| `clearable` | 是否可清除 | `boolean` | `true` | ✅ | - |
| `clearIcon` | 清除图标 | `string \| VNode \| #clearIcon` | `close-circle` | ✅ | - |
| `customNameLabel` | 自定义搜索项名称下拉选择label | `string \| ((searchField: SearchField) => VNodeChild \| #nameLabel` | - | - | - |
| `disabled` | 是否禁用 | `boolean` | `false` | - | - |
| `overlayContainer` | 自定义浮层容器节点  | `string \| HTMLElement \| (trigger?: Element) => string \| HTMLElement` | - | ✅ | - |
| `placeholder` | 默认文本 | `string` | - | - | - |
| `searchFields` | 搜索选项 | `SearchField[]` | - | - | 用于配置支持那些搜索条件 |
| `size` | 尺寸 | `'md' \| 'sm'` | `'md'` | ✅ | - |
| `onChange` | 搜索条件改变之后的回调 | `(value: searchValue[] \| undefined, oldValue: searchValue[] \| undefined) => void` | - | - | - |
| `onClear` | 清除搜索条件的回调 | `() => void` | - | - | - |
| `onItemRemove` | 搜索条件删除时的回调 | `(item: SearchValue) => void` | - | - | - |
| `onItemConfirm` | 搜索条件确认时触发的回调 | `(item: SearchItemConfirmContext) => void` | - | - | - |
| `onItemCreate` | 搜索条件创建时触发的回调 | `(item: SearchItemCreateContext) => void` | - | - | - |
| `onSearch` | 搜索按钮触发的回调 | `(value: searchValue[] \| undefined) => void` | - | - | - |
| `onFocus` | 获取焦点后的回调 | `(evt: FocusEvent) => void` | - | - | - |
| `onBlur` | 失去焦点后的回调 | `(evt: FocusEvent) => void` | - | - | - |

#### ProSearchMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `blur` | 移除焦点 | - | - |
| `focus` | 获取焦点 | `(options?: FocusOptions) => void` | - |

#### ProSearchSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `clearIcon` | 清除图标 | - | - |
| `shortcuts` | 快捷面板快捷栏 | `SearchField[]` | 参数为默认可支持快捷创建搜索项的field数组 |
| `shortcut` | 快捷标签 | `SearchField` | 自定义单个快捷标签 |
| `shortcutLabel` | 快捷标签文字 | `SearchField` | 自定义单个快捷标签文字 |
| `shortcutIcon` | 快捷标签图标 | `SearchField` | 自定义单个快捷标签图标 |

```typescript
interface SearchValue<V = unknown> {
  key: VKey // 对应SearchData的key
  name?: string // 对应SearchField的label
  value: V // 搜索值
  operator?: string // 搜索操作符
}
interface SearchItemConfirmContext<V = unknown> extends Partial<SearchValue<V>> {
  nameInput?: string // 搜索字段名称输入
  operatorInput?: string // 操作符输入
  valueInput?: string // 值输入
  removed: boolean // 是否被移除
}
interface SearchItemCreateContext<V = unknown> extends Partial<SearchValue<V>> {
  nameInput?: string // 搜索字段名称输入
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
| `quickSelect` | 是否在快捷面板中展示 | `boolean \| SearchFieldQuickSelect` | - | - | 是否启用快捷面板, `multiple` 的搜索项该配置不生效。 |
| `keywordFallback` | 在搜索项名称输入过滤结果为空时支持以该搜索项进行搜索 | `boolean` | - | - | - |
| `operators` | 搜索条件的中间操作符 | `string[]` | - | - | 提供时，会在搜索词条名称中间增加一个操作符，如 `'='`, `'!='` |
| `defaultOperator` | 默认的操作符 | `string` | - | - | 提供时，会自动填入默认的操作符 |
| `defaultValue` | 默认值 | - | - | - | 提供时，会自动填入默认值 |
| `customOperatorLabel` | 自定义操作符下拉选择label | `string \| ((operator: string) => VNodeChild)` | - | - | - |
| `inputClassName` | 输入框class | `string` | - | - | 用于自定义输入框样式 |
| `containerClassName` | 面板所在容器class | `string` | - | - | 用于自定义浮层样式或快捷面板容器样式 |
| `placeholder` | 输入框placeholder | `string` | - | - | 搜索值输入框的占位符 |
| `operatorPlaceholder` | 操作符输入框placeholder | `string` | - | - | 搜索值操作符输入框的占位符 |
| `validator` | 搜索项校验函数 | `(value: SearchValue) => { message?: string } | undefined` | - | - | 返回错误信息 |
| `onPanelVisibleChange` | 面板 | `(visible: boolean) => void` | - | - | 面板的展开与隐藏状态改变的回调函数 |

```ts
interface SearchFieldQuickSelect {
  searchable: boolean // 是否开启搜索功能
}
```

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
| `searchable` | 是否支持筛选 | `boolean` | `false` | - | 默认不支持 |
| `searchFn` | 搜索函数 | `(data: SelectPanelData, searchText: string) => boolean` | - | - | 默认模糊匹配 |
| `separator` | 多选分隔符 | `string` | `'|'` | - | - |
| `showSelectAll` | 是否支持全选 | `boolean` | `true` | - | - |
| `concludeAllSelected` | 是否在值被全选时显示 "全部" | `boolean` | - | - | - |
| `virtual` | 是否支持虚拟滚动 | `boolean` | `false` | - | 默认不支持 |
| `onSearch` | 搜索回调函数 | `(searchValue: string) => void | ((searchValue: string) => void)[]` | - | - | 在触发搜索值改变时执行 |

> 注：使用 `Ctrl + Enter` 在多选下切换面板中选项选中状态

```typescript
type SelectPanelData = Required<Pick<SelectData, 'key' | 'label'>> & SelectData
```

#### TreeSelectSearchField

树选择类型

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `type` | 类型 | `'treeSelect'` | - | - | 固定为 `'select'` |
| `fieldConfig` | 配置 | `TreeSelectSearchFieldConfig` | - | - | - |

TreeSelectSearchFieldConfig

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `dataSource` | 类型 | `TreeSelectPanelData[]` | - | - | 继承自`TreeSelectNode`，但`key`和`label`为必填,不支持可配，且`childrenKey`固定为`'children'`，详情参考[Tree](/components/tree/zh) |
| `multiple` | 是否为多选 | `boolean` | - | - | 默认为单选 |
| `checkable` | 是否可勾选 | `boolean` | - | - | 默认不可勾选 |
| `cascaderStrategy` | 级联策略 | `CascaderStrategy` | - | - | 详情参考[Tree](/components/tree/zh) |
| `draggable` | 是否可拖拽 | `boolean` | - | - | 详情参考[Tree](/components/tree/zh) |
| `draggableIcon` | 拖拽图标 | `string` | - | - | 详情参考[Tree](/components/tree/zh) |
| `customDraggableIcon` | 拖拽图标自定义渲染 | `string \| () => VNodeChild` | - | - | 值为string时为对应名称的插槽 |
| `expandIcon` | 展开收起图标 | `string \| TreeExpandIconRenderer \| [string, string]` | - | - | 详情参考[Tree](/components/tree/zh) |
| `defaultExpandedKeys` | 默认展开的节点Key | `VKey[]` | - | - | - |
| `customExpandIcon` | 展开收起图标自定义渲染 | `string \| TreeExpandIconRenderer` | - | - | 值为string时为对应名称的插槽 |
| `showLine` | 是否展示连线 | `boolean` | - | - | 详情参考[Tree](/components/tree/zh) |
| `searchable` | 是否支持筛选 | `boolean` | `false` | - | 默认不支持 |
| `searchFn` | 搜索函数 | `(node: TreeSelectPanelData, searchValue?: string) => boolean` | - | - | 默认模糊匹配 |
| `separator` | 多选分隔符 | `string` | `'|'` | - | - |
| `virtual` | 是否支持虚拟滚动 | `boolean` | `false` | - | 默认不支持 |
| `onCheck` | 勾选回调函数 | `((checked: boolean, node: TreeSelectPanelData) => void) \| ((checked: boolean, node: TreeSelectPanelData) => void)[]` | - | - | 详情参考[Tree](/components/tree/zh) |
| `onDragstart` | `dragstart` 触发时调用 | `((options: TreeDragDropOptions<any>) => void) \| ((options: TreeDragDropOptions<any>) => void)[]` | - | - | 详情参考[Tree](/components/tree/zh) |
| `onDragend` | `dragend` 触发时调用 | `((options: TreeDragDropOptions<any>) => void) \| ((options: TreeDragDropOptions<any>) => void)[]` | - | - | 详情参考[Tree](/components/tree/zh) |
| `onDragenter` | `dragenter` 触发时调用 | `((options: TreeDragDropOptions<any>) => void \| ((options: TreeDragDropOptions<any>) => void)[]` | - | - | 详情参考[Tree](/components/tree/zh) |
| `onDragleave` | `dragleave` 触发时调用 | `((options: TreeDragDropOptions<any>) => void) \| ((options: TreeDragDropOptions<any>) => void)[]` | - | - | 详情参考[Tree](/components/tree/zh) |
| `onDragover` | `dragover` 触发时调用 | `((options: TreeDragDropOptions<any>) => void) \| ((options: TreeDragDropOptions<any>) => void)[]` | - | - | 详情参考[Tree](/components/tree/zh) |
| `onDrop` | `drop` 触发时调用 | `((options: TreeDragDropOptions<any>) => void) \| ((options: TreeDragDropOptions<any>) => void)[]` | - | - | 详情参考[Tree](/components/tree/zh) |
| `onExpand` | 点击展开图标时触发 | `((expanded: boolean, node: TreeSelectPanelData) => void) \| ((expanded: boolean, node: TreeSelectPanelData) => void)[]` | - | - | 详情参考[Tree](/components/tree/zh) |
| `onSelect` | 选中状态发生变化时触发 | `((selected: boolean, node: TreeSelectPanelData) => void) \| ((selected: boolean, node: TreeSelectPanelData) => void)[]` | - | - | 详情参考[Tree](/components/tree/zh) |
| `onSearch` | 搜索回调函数 | `((searchValue: string) => void) \| ((searchValue: string) => void)[]` | - | - | 在触发搜索值改变时执行 |
| `onLoaded` | 子节点加载完毕时触发 | `((loadedKeys: any[], node: TreeSelectPanelData) => void) \| ((loadedKeys: any[], node: TreeSelectPanelData) => void)[]` | - | - | 详情参考[Tree](/components/tree/zh) |

```typescript
type TreeExpandIconRenderer = (data: { key: VKey; expanded: boolean; node: TreeNode<any> }) => VNodeChild | string

type TreeSelectPanelData = TreeSelectNode &
  Required<Pick<TreeSelectNode, 'key' | 'label'>> & {
    children?: TreeSelectPanelData[]
  }
```

#### CascaderSearchField

级联选择类型

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `type` | 类型 | `'cascader'` | - | - | 固定为 `'cascader'` |
| `fieldConfig` | 配置 | `'CascaderSearchFieldConfig'` | - | - | - |

CascaderSearchFieldConfig

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `dataSource` | 类型 | `CascaderPanelData[]` | - | - | 继承自`CascaderData`，但`key`和`label`为必填,不支持可配，且`childrenKey`固定为`'children'`，详情参考[Cascader](/components/cascader/zh) |
| `cascaderStrategy` | 级联策略 | `CascaderStrategy` | `''` | - | 详情参考[Cascader](/components/cascader/zh) |
| `multiple` | 是否为多选 | `boolean` | - | - | 默认为单选 |
| `disableData` | 动态禁用某些项 | `(data: CascaderPanelData) => boolean` | - | - | 详情参考[Cascader](/components/cascader/zh) |
| `expandIcon` | 展开图标 | `string` | - | - | 详情参考[Cascader](/components/cascader/zh) |
| `customExpandIcon` | 展开收起图标自定义渲染 | `string \| (options: { key: VKey, expanded: boolean, data: CascaderPanelData }) => VNodeChild` | - | - | 值为string时为对应名称的插槽 |
| `expandTrigger` | 触发展开的方式 | ``'click' \| 'hover'` | - | - | 详情参考[Cascader](/components/cascader/zh) |
| `fullPath` | 选中后的值是否包含全部路径 | `boolean` | - | `false` | 详情参考[Cascader](/components/cascader/zh) |
| `pathSeparator` | 设置分割符 | `string` | - | - | 详情参考[Cascader](/components/cascader/zh) |
| `searchable` | 是否支持筛选 | `boolean` | false | - | 默认不支持 |
| `searchFn` | 搜索函数 | `(node: TreeSelectPanelData, searchValue?: string) => boolean` | - | - | 默认模糊匹配 |
| `separator` | 多选分隔符 | `string` | `'|'` | - | -
| `virtual` | 是否支持虚拟滚动 | `boolean` | `false` | - | 默认不支持 |
| `onExpand` | 点击展开图标时触发 | `((expanded: boolean, data: CascaderPanelData) => void) \| ((expanded: boolean, data: CascaderPanelData) => void>)[]` | - | - | 详情参考[Cascader](/components/cascader/zh) |
| `onSearch` | 开启搜索功能后，输入后的回调 | `((searchValue: string) => void) \| ((searchValue: string) => void)[]` | - | - | 详情参考[Cascader](/components/cascader/zh) |
| `onLoaded` | 子节点加载完毕时触发 | `((loadedKeys: any[], node: TreeSelectPanelData) => void) \| ((loadedKeys: any[], node: TreeSelectPanelData) => void)[]` | - | - | 详情参考[Cascader](/components/cascader/zh) |

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
| `name` | 自定义的段名称 | `string` | - | - | - |
| `extends` | 继承已有的类型 | `string` | - | - | 上述所有的field类型 |
| `customPanel` | 自定义面板渲染 | `string \| (context: PanelRenderContext) => VNodeChild` | - | - | 如果有面板则需要提供，类型为`string`时指代插槽名称 |
| `format` | 数据格式化函数 | `(value: unknown) => string` | - | - | 必填，用于将指定的类型转换成字符串输入 |
| `parse` | 输入解析函数 | `(input: string) => unknown | null` | - | - | 必填，用于将输入的字符串解析到指定的类型 |
| `placeholder` | 段占位符 | `string` | - | - | - |
| `visible` | 段显示隐藏控制 | `(states: SegmentState[]) => boolean` | - | - | 当前搜索项全部段的状态，返回`true`或者`false`控制段的显示隐藏 |

#### MultiSegmentSearchField

多段输入类型搜索项

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `type` | 类型 | `'multiSegment'` | - | - | 固定为 `'multiSegment'` |
| `fieldConfig` | 配置 | `{ segments: CustomSearchFieldConfig[] }` | - | - | - |

```typescript
interface PanelRenderContext<V = unknown> {
  input: string // 输入的字符串
  value: V // 值
  slots: Slots // 组件插槽
  ok: () => void // 确认
  cancel: () => void // 取消
  setValue: (value: V) => void // 设置搜索值
  setOnKeyDown: (onKeyDown: ((evt: KeyboardEvent) => boolean) | undefined) => void // 设置 `keydown` 回调函数
}
```

### IxProSearchShortcut

快捷标签组件，用于自定义快捷栏的展示，但仅可以在 `IxProSearch` 下使用。

#### ProSearchShortcutProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `fieldKey` | 快捷标签对应的fieldKey | `VKey` | - | - | - |
| `icon` | 快捷标签图标 | `string` | - | - | 默认为field中的`icon`属性 |

#### ProSearchShortcutSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 快捷标签 | `SearchField` | 自定义单个快捷标签 |
| `label` | 快捷标签文字 | `SearchField` | 自定义单个快捷标签文字 |
| `icon` | 快捷标签图标 | `SearchField` | 自定义单个快捷标签图标 |
