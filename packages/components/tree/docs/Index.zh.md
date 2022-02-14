---
category: components
type: 数据展示
title: Tree
subtitle: 树
order: 0
---



## API

### IxTree

#### TreeProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:checkedKeys` | 选中选择框节点的 `key` 数组 | `VKey[]` | - | - | - |
| `v-model:expandedKeys` | 展开节点的 `key` 数组 | `VKey[]` | - | - | - |
| `v-model:loadedKeys` | 已经加载完毕的节点的 `key` | `VKey[]` | - | - | - |
| `v-model:selectedKeys` | 选中节点的 `key` 数组 | `VKey[]` | - | - | - |
| `blocked` | 节点整行撑开 | `boolean` | `false` | ✅ | - |
| `cascade` | 是否开启级联功能 | `boolean` | `false` | - | - |
| `checkable` | 是否显示选择框 | `boolean` | `false` | - | - |
| `childrenKey` | 替代[TreeNode](#TreeNode)中的`children`字段 | `string` | `children` | - | - |
| `checkStrategy` | 勾选策略 | `'all' \| 'parent' \| 'child'` | `'all'` | - | 设置勾选策略来指定显示的勾选节点，`all` 表示显示全部选中节点；`parent` 表示只显示父节点（当父节点下所有子节点都选中时）；`child` 表示只显示子节点，仅当`cascade`为`true`时，`parent`和`child`才生效 |
| `dataSource` | 树型数据数组,参见[TreeNode](#TreeNode) | `TreeNode[]` | `[]` | - | - |
| `disabled` | 禁用节点的函数 | `(node: TreeNode) => boolean \| TreeNodeDisabled` | - | - | - |
| `draggable` | 是否允许拖拽节点 | `boolean` | `false` | - | - |
| `droppable` | 是否允许放置节点,参见[TreeDroppable](#TreeDroppable) | `TreeDroppable` | - | - | - |
| `empty` | 空数据时的内容 | `string \| EmptyProps \| #empty` | - | - | - |
| `expandIcon` | 展开图标 | `string \| #expandIcon="{key: VKey, expanded: boolean, node: TreeNode}"` | `right` | ✅ | - |
| `height` | 设置虚拟滚动容器高度 | `number` | - | - | - |
| `labelKey` | 替代[TreeNode](#TreeNode)中的`label`字段 | `string` | `label` | - | -
| `leafLineIcon` | 叶子节点的图标，用于替换默认的连接线 | `string \| #leafLineIcon` | - | - | 仅在 `showLine` 时生效 |
| `loadChildren` | 加载子节点数据 | `(node: TreeNode) => Promise<TreeNode[]>` | - | - | - |
| `nodeKey` | 替代[TreeNode](#TreeNode)中的`key`字段 | `string \| (node: TreeNode) => VKey` | `key` | ✅ | -
| `searchFn` | 搜索函数 | `(node: TreeNode, searchValue?: string) => boolean` | - | - | -
| `searchValue` | 用于搜索的值 | `string` | - | - | -
| `selectable` | 是否允许选择 | `boolean \| 'multiple'` | `true` | - | 为 `multiple` 时表示允许多选 |
| `showLine` | 是否显示连接线 | `boolean` | `false` | ✅ | - |
| `virtual` | 是否开启虚拟滚动 | `boolean` | `false` | - | 需要设置 `height` |
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
| `onSearchedChange` | 搜索状态发生变化时调用 | `(searchedKeys: VKey[], searchedNodes: TreeNode[]) => void` | - | - | - |
| `onSelect` | 选中状态发生变化时触发 | `(selected: boolean, node: TreeNode) => void` | - | - | - |
| `onSelectedChange` | 选中状态发生变化时触发 | `(selectedKeys: VKey[], selectedNodes: TreeNode[]) => void` | - | - | - |
| `onNodeClick` | 节点点击事件 | `(evt: Event, node: TreeNode) => void` | - | - | - |
| `onNodeContextmenu` | 节点右击事件 | `(evt: Event, node: TreeNode) => void` | - | - | - |
| `onScroll` | 滚动事件 | `(evt: Event) => void` | - | - | - |
| `onScrolledChange` | 滚动的位置发生变化 | `(startIndex: number, endIndex: number, visibleNodes: TreeNode[]) => void` | - | - | 仅 `virtual` 模式下可用 |
| `onScrolledBottom` | 滚动到底部时触发 | `() => void` | - | - | 仅 `virtual` 模式下可用 |

##### TreeNode

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `additional` | 节点的扩展属性 | `object` | - | - | 可以用于设置节点的 `class`, `style` 或者其他属性 |
| `children` | 子节点数据 | `TreeNode[]` | - | - | 如果不设置，可以通过设置 `childrenKey` 来使用其他字段名 |
| `disabled` | 禁用节点 | `boolean \| TreeNodeDisabled` | - | - | 为 `true` 时，优先级高于 `TreeProps` |
| `isLeaf` | 设置为叶子节点 | `boolean` | - | - | 为 `false`，且设置了 `loadChildren` 时会强制将其作为父节点  |
| `key` | 节点的唯一标识 | `VKey` | - | - | 如果不设置，则需要通过 `TreeProps` 中的 `nodeKey` 设置唯一值 |
| `label` | 节点的文本 | `string` | - | - | - |
| `prefix` | 前缀图标 | `string` | - | - | - |
| `suffix` | 后缀图标 | `string` | - | - | - |

##### TreeDroppable

```ts
export type TreeDroppable = (options: TreeDroppableOptions) => TreeDropType | boolean | Promise<TreeDropType | boolean>

export interface TreeDroppableOptions {
  evt: DragEvent
  dragNode: TreeNode
  dropNode: TreeNode
  isTopHalf: boolean // 鼠标是否在 `dropNode` 的上半部分
}

/**
 * 'before': 插入到该节点之前
 * 'inside': 插入到该节点之内
 * 'after':  插入到该节点之后
 */
export type TreeDropType = 'before' | 'inside' | 'after'
```

#### TreeSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `label` | 自定义节点的文本 | `{node: TreeNode}` | - |
| `prefix` | 自定义节点的前缀图标 | `{key: VKey,  selected: boolean, node: TreeNode}` | - |
| `suffix` | 自定义节点的后缀图标 | `{key: VKey, selected: boolean, node: TreeNode}` | - |

#### TreeMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `blur` | 失去焦点 | - | - |
| `focus` | 获取焦点 | - | - |
| `scrollTo` | 滚动到指定位置 | `(option?: number \| VirtualScrollToOptions) => void` | 仅 `virtual` 模式下可用 |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@tree-node-prefix` | `~'@{tree-prefix}-node'` | - | - |
| `@tree-background-color` | `@background-color-component` | - | - |
| `@tree-background-color-focused` | `@background-color-selected-light` | - | - |
| `@tree-box-shadow-size` | `2px` | - | - |
| `@tree-box-shadow-color` | `@color-primary-l20` | - | - |
| `@tree-node-disabled-color` | `@text-color-disabled` | - | - |
| `@tree-node-hover-background-color` | `@color-graphite-l50` | - | - |
| `@tree-node-selected-background-color` | `@color-graphite-l40` | - | - |
| `@tree-node-line-width` | `1px` | - | - |
| `@tree-node-line-border` | `1px dashed @border-color` | - | - |
| `@tree-node-padding-vertical` | `(@spacing-xs / 2)` | - | - |
| `@tree-node-checkbox-margin` | `0 @spacing-sm 0 @spacing-xs` | - | - |
| `@tree-node-content-height` | `@height-sm` | - | - |
| `@tree-node-content-label-padding` | `0 @spacing-xs` | - | - |
| `@tree-node-content-label-highlight-color` | `@color-primary` | - | - |
<!--- insert less variable end  --->