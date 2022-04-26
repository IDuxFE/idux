---
category: components
type: 数据录入
title: TreeSelect 树型选择
subtitle:
order: 0
---



## API

### IxTreeSelect

#### TreeSelectProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `v-model:value` | 选中节点的 `key` 数组 | `VKey[]` | - | - | 使用 `control` 时，此配置无效 |
| `v-model:expandedKeys` | 展开节点的 `key` 数组 | `VKey[]` | - | - | - |
| `v-model:loadedKeys` | 已经加载完毕的节点的 `key` 数组 | `VKey[]` | - | - | - |
| `v-model:open` | 下拉菜单是否展开 | `boolean` | - | - | - |
| `autofocus` | 默认获取焦点 | `boolean` | `false` | - | - |
| `autocomplete` | 设置选择器的 `autocomplete` | `string` | `off` | - | - |
| `cascade` | 是否开启级联功能 | `boolean` | `false` | - | 仅在 `multiple` 和 `checkable` 为 `true` 时生效 |
| `checkable` | 是否显示选择框 | `boolean` | `false` | - | 仅在 `multiple` 为 `true` 时生效 |
| `childrenKey` | 替代[TreeSelectNode](#TreeSelectNode)中的`children`字段 | `string` | `children` | ✅ | - |
| `checkStrategy` | 勾选策略 | `'all' \| 'parent' \| 'child'` | `'all'` | - | 设置勾选策略来指定显示的勾选节点，`all` 表示显示全部选中节点；`parent` 表示只显示父节点（当父节点下所有子节点都选中时）；`child` 表示只显示子节点，仅当`cascade`为`true`时，`parent`和`child`才生效 |
| `clearable` | 是否显示清除图标 | `boolean` | `false` | - | - |
| `clearIcon` | 设置清除图标 | `string \| #clearIcon` | `'close-circle'` | ✅ | - |
| `dataSource` | 树型数据数组,参见[TreeSelectNode](#TreeSelectNode) | `TreeSelectNode[]` | `[]` | - | - |
| `disabled` | 是否禁用状态 | `boolean` | `false` | - | 使用 `control` 时，此配置无效 |
| `draggable` | 是否允许拖拽节点 | `boolean` | `false` | - | - |
| `droppable` | 是否允许放置节点,参见[TreeDroppable](/components/tree/zh#TreeDroppable) | `TreeDroppable` | - | - | - |
| `empty` | 空数据时的内容 | `string \|` [EmptyProps](/components/empty/zh#EmptyProps) | - | - | - |
| `expandIcon` | 树组件中的展开图标 | `string` | `right` | ✅ | - |
| `maxLabel` | 最多显示多少个标签，响应式模式会对性能产生损耗 | `number \| 'responsive'` | - | - | - |
| `multiple` | 多选模式 | `boolean` | `false` | - | - |
| `nodeKey` | 替代[TreeSelectNode](#TreeSelectNode)中的`key`字段 | `string \| (node: TreeSelectNode) => VKey` | `key` | ✅ | -
| `labelKey` | 替代[TreeSelectNode](#TreeSelectNode)中的`label`字段 | `string` | `label` | ✅ | -
| `leafLineIcon` | 叶子节点的图标，用于替换默认的连接线 | `string` | - | - | 仅在 `showLine` 时生效 |
| `loadChildren` | 加载子节点数据 | `(node: TreeSelectNode) => Promise<TreeSelectNode[]>` | - | - | - |
| `searchFn` | 搜索函数 | `(node: TreeSelectNode, searchValue?: string) => boolean` | - | - | -
| `searchable` | 是否开启搜索功能 | `boolean \| 'overlay'` | - | - | 当为 `true` 时搜索功能集成在选择器上，当为 `overlay` 时，搜索功能集成在悬浮层上
| `showLine` | 是否显示连接线 | `boolean` | `false` | ✅ | - |
| `size` | 设置选择器大小 | `'sm' \| 'md' \| 'lg'` | `md` | ✅ | - |
| `suffix` | 设置后缀图标 | `string \| #suffix` | `down` | ✅ | - |
| `target` | 自定义浮层容器节点 | `string \| HTMLElement \| () => string \| HTMLElement` | - | ✅ | - |
| `treeDisabled` | 树的禁用节点的函数 | 参考 [Tree](/components/tree/zh#API) | - | - | - |
| `virtual` | 是否开启虚拟滚动 | `boolean` | `false` | - | - |
| `overlayClassName` | 下拉菜单的 `class`  | `string` | - | - | - |
| `overlayMatchWidth` | 下拉菜单和选择器同宽  | `boolean` | `true` | ✅ | - |
| `overlayRender` | 自定义下拉菜单内容的渲染  | `(children:VNode[]) => VNodeTypes` | - | - | - |
| `placeholder` | 选择框默认文本 | `string` | - | - | - |
| `readonly` | 只读模式 | `boolean` | - | - | - |
| `onChange` | 选择值发生变化时触发 | `(value: any, oldValue: any) => void` | - | - | - |
| `onCheck` | 选择框勾选状态发生变化时触发 | `(checked: boolean, node: TreeSelectNode) => void` | - | - | - |
| `onDragStart` | `dragstart` 触发时调用 | `(options: TreeDragDropOptions) => void` | - | - | - |
| `onDragEnd` | `dragend` 触发时调用 | `(options: TreeDragDropOptions) => void` | - | - | - |
| `onDragEnter` | `dragenter` 触发时调用 | `(options: TreeDragDropOptions) => void` | - | - | - |
| `onDragLeave` | `dragleave` 触发时调用 | `(options: TreeDragDropOptions) => void` | - | - | - |
| `onDragOver` | `dragover` 触发时调用 | `(options: TreeDragDropOptions) => void` | - | - | - |
| `onDrop` | `drop` 触发时调用 | `(options: TreeDragDropOptions) => void` | - | - | - |
| `onExpand` | 点击展开图标时触发 | `(expanded: boolean, node: TreeSelectNode) => void` | - | - | - |
| `onExpandedChange` | 展开状态发生变化时触发 | `(expendedKeys: VKey[], expendedNodes: TreeSelectNode[]) => void` | - | - | - |
| `onLoaded` | 子节点加载完毕时触发 | `(loadedKeys: VKey[], node: TreeSelectNode) => void` | - | - | - |
| `onSelect` | 选中状态发生变化时触发 | `(selected: boolean, node: TreeSelectNode) => void` | - | - | - |
| `onNodeClick` | 节点点击事件 | `(evt: Event, node: TreeSelectNode) => void` | - | - | - |
| `onNodeContextmenu` | 节点右击事件 | `(evt: Event, node: TreeSelectNode) => void` | - | - | - |
| `onScroll` | 滚动事件 | `(evt: Event) => void` | - | - | - |
| `onScrolledChange` | 滚动的位置发生变化 | `(startIndex: number, endIndex: number, visibleNodes: TreeSelectNode[]) => void` | - | - | 仅 `virtual` 模式下可用 |
| `onScrolledBottom` | 滚动到底部时触发 | `() => void` | - | - | 仅 `virtual` 模式下可用 |

##### TreeSelectNode

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `additional` | 节点的扩展属性 | `object` | - | - | 可以用于设置节点的 `class`, `style` 或者其他属性 |
| `children` | 子节点数据 | `TreeNode[]` | - | - | - |
| `disabled` | 禁用节点 | `boolean \| TreeNodeDisabled` | - | - | 为 `true` 时，优先级高于 `TreeProps` |
| `isLeaf` | 设置为叶子节点 | `boolean` | - | - | 为 `false`，且设置了 `loadChildren` 时会强制将其作为父节点  |
| `key` | 节点的唯一标识 | `VKey` | - | - | - |
| `label` | 节点的文本 | `string` | - | - | - |
| `prefix` | 前缀图标 | `string` | - | - | - |
| `suffix` | 后缀图标 | `string` | - | - | - |

#### TreeSelectSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `empty` | 自定义当下拉列表为空时显示的内容 | - | - |
| `expandIcon` | 节点展开图标 | `{key: VKey, expanded: boolean, node: TreeSelectNode}` | - |
| `selectedLabel` | 自定义选中的标签 | `{node: RawNode}` | `RawNode`为用户传入的数据结构 |
| `leafLineIcon` | 叶子节点的图标，用于替换默认的连接线 | - | 仅在 `showLine 时生效` |
| `overflowedLabel` | 自定义超出最多显示多少个标签的内容 | `{nodes: RawNode[]}` | 参数为超出的数组 |
| `suffix` | 后缀图标 | - | - |
| `placeholder` | 选择框默认文本 | - | - |
| `treeLabel` | 自定义节点的文本 | `{node: TreeSelectNode}` | - |
| `treePrefix` | 自定义节点的前缀图标 | `{key: VKey, selected: boolean, node: TreeSelectNode}` | - |
| `treeSuffix` | 自定义节点的后缀图标 | `{key: VKey, selected: boolean, node: TreeSelectNode}` | - |

#### TreeSelectMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `blur` | 失去焦点 | - | - |
| `focus` | 获取焦点 | - | - |
| `scrollTo` | 滚动到指定位置 | `(option?: number \| VirtualScrollToOptions) => void` | 仅 `virtual` 模式下可用 |
| `setExpandAll` | 控制树节点是否全部展开 | `(isAll: boolean) => void` | - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | default | seer | 备注 |
| --- | --- | --- | --- |
| `@tree-select-option-font-size` | `@font-size-md` | `@font-size-sm` | - |
| `@tree-select-option-height` | `@height-md` | - | - |
| `@tree-select-option-margin-left` | `@spacing-md` | - | - |
| `@tree-select-option-padding` | `@spacing-sm` | - | - |
| `@tree-select-option-color` | `@text-color` | - | - |
| `@tree-select-option-disabled-color` | `@text-color-disabled` | - | - |
| `@tree-select-option-active-background-color` | `@color-grey-l50` | - | - |
| `@tree-select-option-selected-color` | `@color-primary` | - | - |
| `@tree-select-option-selected-background-color` | `tint(@color-primary, 90%)` | - | - |
| `@tree-select-option-selected-font-weight` | `@font-weight-xl` | - | - |
| `@tree-select-option-container-zindex` | `@zindex-l4-3` | - | - |
| `@tree-select-option-container-padding` | `@spacing-sm` | `8px 12px` | - |
| `@tree-select-option-container-background-color` | `@background-color-component` | - | - |
| `@tree-select-option-container-border-radius` | `@border-radius-sm` | - | - |
| `@tree-select-option-container-box-shadow` | `@shadow-bottom-md` | - | - |
| `@tree-select-border-radius` | - | `@border-radius-sm` | - |
<!--- insert less variable end  --->
