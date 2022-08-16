## API

### IxProTree

#### ProTreeProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:checkedKeys` | 选中选择框节点的 `key` 数组 | `VKey[]` | - | - | - |
| `v-model:expandedKeys` | 展开节点的 `key` 数组 | `VKey[]` | - | - | - |
| `v-model:loadedKeys` | 已经加载完毕的节点的 `key` | `VKey[]` | - | - | - |
| `v-model:selectedKeys` | 选中节点的 `key` 数组 | `VKey[]` | - | - | - |
| `v-model:collapsed` | 树是否收缩 | `boolean` | - | - | 不设置时没有收缩展开功能 |
| `v-model:searchValue` | 用于搜索的值 | `string` | - | - | - |
| `checkable` | 是否显示选择框 | `boolean` | `false` | - | - |
| `checkOnClick` | 是否允许点击节点进行勾选 | `boolean` | `false` | - | 仅在`checkable`为`true`时生效 |
| `childrenKey` | 替代[TreeNode](#TreeNode)中的`children`字段 | `string` | `children` | - | - |
| `cascaderStrategy` | 勾选策略 | `'all' \| 'parent' \| 'child'` | `'all'` | - | 设置勾选策略来指定显示的勾选节点，`all` 表示显示全部选中节点；`parent` 表示只显示父节点（当父节点下所有子节点都选中时）；`child` 表示只显示子节点，仅当`cascade`为`true`时，`parent`和`child`才生效 |
| `clearIcon` | 设置搜索框清除图标 | `string \| #clearIcon` | `'close-circle'` | ✅ | - |
| `collapsedWidth` | 树收缩时的宽度 | `number` | `44` | - | - |
| `collapseIcon` | 树展开收缩时的图标 | `[string, string]` | `['collapse', 'uncollapse']` | ✅ | [`展开时图标`,`未展开时图标`] |
| `customAdditional` | 自定义节点的额外属性 | `TreeCustomAdditional` | - | - | 例如 `class`, 或者原生事件 |
| `dataSource` | 树型数据数组,参见[TreeNode](#TreeNode) | `TreeNode[]` | `[]` | - | - |
| `disabled` | 禁用节点的函数 | `(node: TreeNode) => boolean \| TreeNodeDisabled` | - | - | - |
| `draggable` | 是否允许拖拽节点 | `boolean` | `false` | - | - |
| `draggableIcon` | 拖拽节点图标 | `string \| #draggableIcon` | `holder` | - | - |
| `droppable` | 是否允许放置节点,参见[TreeDroppable](#TreeDroppable) | `TreeDroppable` | - | - | - |
| `empty` | 空数据时的内容 | `string \| EmptyProps \| #empty` | - | - | - |
| `expandIcon` | 树节点展开图标 | `string \| [string, string] \| #expandIcon="{key: VKey, expanded: boolean, node: TreeNode}"` | `['minus-square', 'plus-square']` | - | 当为数组时表示[`展开时图标`,`未展开时图标`] |
| `header` | 树的头部 | `string \| HeaderProps \| #header="{expanded, onClick}"` | - | - | - |
| `getKey` | 获取数据的唯一标识 | `string \| (record: any) => VKey` | `key` | - | - |
| `labelKey` | 替代[TreeNode](#TreeNode)中的`label`字段 | `string` | `label` | - | - |
| `leafLineIcon` | 叶子节点的图标，用于替换默认的连接线 | `string \| #leafLineIcon` | - | - | 仅在 `showLine` 时生效 |
| `loadChildren` | 加载子节点数据 | `(node: TreeNode) => Promise<TreeNode[]>` | - | - | - |
| `searchable` | 是否拥有搜索功能 | `boolean` | `true` | - | - |
| `searchFn` | 搜索函数 | `(node: TreeNode, searchValue?: string) => boolean` | - | - | - |
| `selectable` | 是否允许选择 | `boolean \| 'multiple'` | `true` | - | 为 `multiple` 时表示允许多选 |
| `showLine` | 是否显示连接线 | `boolean` | `true` | - | - |
| `placeholder` | 搜索框的`placeholder` | `string` | - | - | - |
| `onCheck` | 选择框勾选状态发生变化时触发 | `(checked: boolean, node: TreeNode) => void` | - | - | - |
| `onCheckedChange` | 选择框勾选状态发生变化时触发 | `(checkedKeys: VKey[], checkedNodes: TreeNode[]) => void` | - | - | - |
| `onDragStart` | `dragstart` 触发时调用 | `(options: TreeDragDropOptions) => void` | - | - | - |
| `onDragEnd` | `dragend` 触发时调用 | `(options: TreeDragDropOptions) => void` | - | - | - |
| `onDragEnter` | `dragenter` 触发时调用 | `(options: TreeDragDropOptions) => void` | - | - | - |
| `onDragLeave` | `dragleave` 触发时调用 | `(options: TreeDragDropOptions) => void` | - | - | - |
| `onDragOver` | `dragover` 触发时调用 | `(options: TreeDragDropOptions) => void` | - | - | - |
| `onDrop` | `drop` 触发时调用 | `(options: TreeDragDropOptions) => void` | - | - | - |
| `onExpand` | 点击展开图标时触发 | `(expanded: boolean, node: TreeNode) => void` | - | - | - |
| `onExpandedChange` | 展开状态发生变化时触发 | `(expendedKeys: VKey[], expendedNodes: TreeNode[]) => void` | - | - | - |
| `onLoaded` | 子节点加载完毕时触发 | `(loadedKeys: VKey[], node: TreeNode) => void` | - | - | - |
| `onSelect` | 选中状态发生变化时触发 | `(selected: boolean, node: TreeNode) => void` | - | - | - |
| `onSelectedChange` | 选中状态发生变化时触发 | `(selectedKeys: VKey[], selectedNodes: TreeNode[]) => void` | - | - | - |
| `onNodeClick` | 节点点击事件 | `(evt: Event, node: TreeNode) => void` | - | - | - |
| `onSearch` | 开启搜索功能后，输入后的回调 | `(searchValue: string) => void` | - | - | 通常用于服务端搜索 |
| `onNodeContextmenu` | 节点右击事件 | `(evt: Event, node: TreeNode) => void` | - | - | - |

#### ProTreeSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `label` | 自定义节点的文本 | `{node: TreeNode}` | - |
| `header` | 自定义头部 | - | - |
| `empty` | 自定义空数据状态 | - | - |
| `expandIcon` | 自定义展开节点 | `{key: VKey,  expanded: boolean, node: TreeNode}` | - |
| `prefix` | 自定义节点的前缀图标 | `{key: VKey,  selected: boolean, node: TreeNode}` | - |
| `suffix` | 自定义节点的后缀图标 | `{key: VKey, selected: boolean, node: TreeNode}` | - |

#### ProTreeMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `collapseAll` | 收起所有节点 | - | - |
| `expandAll` | 展开所有节点 | - | - |
| `getNode` | 获取指定节点数据 | ` (key: VKey) => TreeNode \| undefined ` | |
