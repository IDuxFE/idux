### IxProTagSelect

#### ProTagSelectProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `control` | 控件控制器 | `string \| number \| (string \| number)[] \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `v-model:value` | 当前选中的 tag 的值 | `(string \| number \| symbol)[]` | - | - | 使用 `control` 时，此配置无效 |
| `v-model:open` | 下拉菜单是否展开 | `boolean` | - | - | - |
| `colors` | 标签颜色列表 | `TagSelectColor[]` | - | - | 不提供则使用内置的颜色列表，颜色色值可以通过主题自定义 |
| `clearable` | 是否可清除 | `boolean` | `false` | - | - |
| `clearIcon` | 设置清除图标 | `string \| #clearIcon` | `'close-circle'` | - | - |
| `dataSource` | 可选择的标签数据 | `TagSelectData[]` | - | - | - |
| `dataEditable` | 标签数据是否可以编辑 | `boolean` | `true` | - | 配置true则可以在下拉面板的选项末尾点击编辑图标进行编辑 |
| `disabled` | 是否禁用 | `boolean` | `false` | - | - |
| `confirmBeforeSelect` | 是否在选择标签之后需要确认 | `boolean \| 'force'` | `false` | - | 配置true或者force时，选择标签后会弹出一个浮层进行确定或者取消，配置force则强制必须确定或者取消才能进行下一步 |
| `confirmBeforeDataRemove` | 是否在删除标签数据时需要确认 | `boolean` | `false` | - | 配置true时，删除标签数据会弹出一个弹窗进行确定或者取消 |
| `createdTagDataModifier` | 修改创建的标签数据 | `(data: TagSelectData) => TagSelectData` | - | - | 标签创建时，会随机选择一个内置的颜色，可以通过该函数修改内部创建的数据 |
| `maxTags` | 选择框内展示的标签最大数量 | `number \| 'responsive'` | `Number.MAX_SAFE_INTEGER` | - | - |
| `tagsLimit` | 可以选择的标签最大数量 | `number` | `Number.MAX_SAFE_INTEGER` | - | - |
| `tagDataLimit` | 面板中允许的最大标签数据量 | `number` | `Number.MAX_SAFE_INTEGER` | - | 超出后不允许添加标签，并且会显示提示 |
| `overlayClassName` | 下拉菜单的 `class`  | `string` | - | - | - |
| `overlayContainer` | 自定义下拉框容器节点  | `string \| HTMLElement \| (trigger?: Element) => string \| HTMLElement` | - | - | - |
| `overlayMatchWidth` | 下拉菜单和选择器同宽  | `boolean \| 'minWidth'` | `true` | - | - |
| `placeholder` | 选择框默认文本 | `string \| #placeholder` | - | - | - |
| `readonly` | 只读模式 | `boolean` | - | - | - |
| `removeConfirmHeader` | 删除标签的确认弹窗头部配置 | `string \| HeaderProps` | - | - | - |
| `removeConfirmTitle` | 删除标签的确认弹窗title | `string \| VNode \| (() => VNodeChild)` | - | - | - |
| `beforeSelectConfirm` | 选择前点击确认，判断是否可以确认选择 | `(data: TagSelectData) => boolean \| Promise<boolean>` | - | - | - |
| `beforeRemoveConfirm` | 删除前点击确认，判断是否可以确认删除 | `(data: TagSelectData) => boolean \| Promise<boolean>` | - | - | - |
| `size` | 设置选择器大小 | `'sm' \| 'md' \| 'lg'` | `md` | - | - |
| `status` | 手动指定校验状态 | `valid \| invalid \| validating` | - | - | - |
| `suffix` | 设置后缀图标 | `string \| #suffix` | `down` | - | - |
| `tagLabelValidator` | 标签创建或编辑的输入校验 | `(input: string) => string \| undefined` | - | 返回非空 `string` 为校验不合法，返回为提示信息 |
| `onClear` | 清除图标被点击后的回调 | `(evt: MouseEvent) => void` | - | - | - |
| `onChange` | 选中值发生改变后的回调 | `(value: (string \| number \| symbol)[] \| undefined, oldValue: (string \| number \| symbol)[] \| undefined) => void` | - | - | - |
| `onFocus` | 获取焦点后的回调 | `(evt: FocusEvent) => void` | - | - | - |
| `onBlur` | 失去焦点后的回调 | `(evt: FocusEvent) => void` | - | - | - |
| `onTagDataChange` | 标签数据编辑之后的回调 | `(data: TagSelectData) => void` | - | - | - |
| `onTagDataRemove` | 标签数据删除之后的回调 | `(data: TagSelectData) => void` | - | - | - |
| `onTagDataAdd` | 标签数据创建添加之后的回调 | `(data: TagSelectData) => void` | - | - | - |
| `onTagSelect` | 标签选择触发之后的回调 | `(data: TagSelectData) => void` | - | - | - |
| `onTagSelectConfirm` | 标签选择之后确认的回调 | `(data: TagSelectData) => void` | - | - | - |
| `onTagSelectCancel` | 标签选择之后取消的回调 | `(data: TagSelectData) => void` | - | - | - |
| `onTagRemove` | 选择的标签被移除之后的回调 | `(data: TagSelectData) => void` | - | - | - |

```ts
interface TagSelectColor {
  key: VKey
  name: string
  labelColor: string
  backgroundColor: string
  indicatorColor?: string
  borderColor?: string
}

interface TagSelectData {
  key: VKey
  label: string
  color: VKey | TagSelectColor
  disabled?: boolean

  [key: string]: any
}
```

#### ProTagSelectSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `alert` | 自定义告警提示 | `{ input: string, inputValidateError: string \| undefined }` | - |
| `clearIcon` | 自定义清除图标 | - | - |
| `suffix` | 自定义选择框的后缀 | - | - |
| `selectedLabel` | 自定义选中标签的文本内容 | `TagSelectData` | - |
| `overflowedLabel` | 自定义超出最多显示多少个标签的内容 | `TagSelectData[]` | 参数为超出的数组 |
| `tagLabel` | 自定义面板中标签的文本内容 | `TagSelectData` | - |
| `optionLabel` | 自定义面板中选项的内容 | `TagSelectData` | - |
| `maxExceededAlert` | 自定义选中的标签超出最大限制时的告警提示 | - | - |
| `placeholder` | 自定义占位符 | - | - |
| `selectConfirmContent` | 自定义选中标签时的确认浮层内容 | `TagSelectData` | - |
| `removeConfirmTitle` | 自定义移除标签数据时的确认弹窗title | `TagSelectData` | - |
| `removeConfirmContent` | 自定义移除标签数据时的确认弹窗内容 | `TagSelectData` | - |

#### ProTagSelectMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `blur` | 失去焦点 | - | - |
| `focus` | 获取焦点 | - | - |
