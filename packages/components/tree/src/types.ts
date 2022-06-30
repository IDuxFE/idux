/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { MergedNode } from './composables/useDataSource'
import type { VirtualScrollToFn } from '@idux/cdk/scroll'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { EmptyProps } from '@idux/components/empty'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export type CheckStrategy = 'all' | 'parent' | 'child'

export const treeProps = {
  checkedKeys: IxPropTypes.array<VKey>(),
  expandedKeys: IxPropTypes.array<VKey>(),
  indeterminateKeys: IxPropTypes.array<VKey>(),
  loadedKeys: IxPropTypes.array<VKey>(),
  selectedKeys: IxPropTypes.array<VKey>(),

  blocked: IxPropTypes.bool,
  cascade: IxPropTypes.bool.def(false),
  checkable: IxPropTypes.bool.def(false),
  childrenKey: IxPropTypes.string,
  checkStrategy: IxPropTypes.oneOf<CheckStrategy>(['all', 'parent', 'child']).def('all'),
  customAdditional: { type: Object as PropType<TreeCustomAdditional>, default: undefined },
  dataSource: IxPropTypes.array<TreeNode>().def(() => []),
  disabled: IxPropTypes.func<(node: TreeNode) => boolean | TreeNodeDisabled>(),
  draggable: IxPropTypes.bool.def(false),
  draggableIcon: { type: String, default: undefined },
  droppable: IxPropTypes.func<TreeDroppable>(),
  empty: IxPropTypes.oneOfType([String, IxPropTypes.object<EmptyProps>()]),
  expandIcon: { type: [String, Array] as PropType<string | [string, string]>, default: undefined },
  getKey: { type: [String, Function] as PropType<string | ((data: TreeNode) => VKey)>, default: undefined },
  height: IxPropTypes.number,
  labelKey: IxPropTypes.string,
  leafLineIcon: IxPropTypes.string,
  loadChildren: IxPropTypes.func<(node: TreeNode) => Promise<TreeNode[]>>(),
  /**
   * @deprecated please use `getKey` instead'
   */
  nodeKey: IxPropTypes.oneOfType([String, IxPropTypes.func<(node: TreeNode) => VKey>()]),
  searchFn: IxPropTypes.func<(node: TreeNode, searchValue?: string) => boolean>(),
  searchValue: IxPropTypes.string,
  selectable: IxPropTypes.oneOfType([Boolean, IxPropTypes.oneOf(['multiple'])]).def(true),
  showLine: IxPropTypes.bool,
  virtual: IxPropTypes.bool.def(false),

  // events
  'onUpdate:checkedKeys': IxPropTypes.emit<<K = VKey>(keys: K[]) => void>(),
  'onUpdate:expandedKeys': IxPropTypes.emit<<K = VKey>(keys: K[]) => void>(),
  'onUpdate:loadedKeys': IxPropTypes.emit<<K = VKey>(keys: K[]) => void>(),
  'onUpdate:selectedKeys': IxPropTypes.emit<<K = VKey>(keys: K[]) => void>(),
  onCheck: IxPropTypes.emit<<K = VKey>(checked: boolean, node: TreeNode<K>) => void>(),
  onCheckedChange: IxPropTypes.emit<<K = VKey>(checkedKeys: K[], checkedNodes: TreeNode<K>[]) => void>(),
  onDragstart: IxPropTypes.emit<<K = VKey>(options: TreeDragDropOptions<K>) => void>(),
  onDragend: IxPropTypes.emit<<K = VKey>(options: TreeDragDropOptions<K>) => void>(),
  onDragenter: IxPropTypes.emit<<K = VKey>(options: TreeDragDropOptions<K>) => void>(),
  onDragleave: IxPropTypes.emit<<K = VKey>(options: TreeDragDropOptions<K>) => void>(),
  onDragover: IxPropTypes.emit<<K = VKey>(options: TreeDragDropOptions<K>) => void>(),
  onDrop: IxPropTypes.emit<<K = VKey>(options: TreeDragDropOptions<K>) => void>(),
  onExpand: IxPropTypes.emit<<K = VKey>(expanded: boolean, node: TreeNode<K>) => void>(),
  onExpandedChange: IxPropTypes.emit<<K = VKey>(expendedKeys: K[], expendedNodes: TreeNode<K>[]) => void>(),
  onLoaded: IxPropTypes.emit<<K = VKey>(loadedKeys: K[], node: TreeNode<K>) => void>(),
  onSelect: IxPropTypes.emit<<K = VKey>(selected: boolean, node: TreeNode<K>) => void>(),
  onSelectedChange: IxPropTypes.emit<<K = VKey>(selectedKeys: K[], selectedNodes: TreeNode<K>[]) => void>(),
  onFocus: IxPropTypes.emit<(evt: FocusEvent) => void>(),
  onBlur: IxPropTypes.emit<(evt: FocusEvent) => void>(),
  onKeydown: IxPropTypes.emit<(evt: KeyboardEvent) => void>(),
  onKeyup: IxPropTypes.emit<(evt: KeyboardEvent) => void>(),
  onNodeClick: IxPropTypes.emit<<K = VKey>(evt: Event, node: TreeNode<K>) => void>(),
  onNodeContextmenu: IxPropTypes.emit<<K = VKey>(evt: Event, node: TreeNode<K>) => void>(),
  onScroll: IxPropTypes.emit<(evt: Event) => void>(),
  onScrolledChange:
    IxPropTypes.emit<<K = VKey>(startIndex: number, endIndex: number, visibleNodes: TreeNode<K>[]) => void>(),
  onScrolledBottom: IxPropTypes.emit<() => void>(),
}

export type TreeProps = ExtractInnerPropTypes<typeof treeProps>
export type TreePublicProps = Omit<ExtractPublicPropTypes<typeof treeProps>, 'nodeKey'>
export interface TreeBindings<K = VKey> {
  focus: (options?: FocusOptions) => void
  blur: () => void
  collapseAll: () => void
  expandAll: () => void
  scrollTo: VirtualScrollToFn
  /**
   * get node by it's key
   *
   * @param key
   * @returns node
   */
  getNode: (key: K) => TreeNode<K> | undefined
}
export type TreeComponent = DefineComponent<Omit<HTMLAttributes, keyof TreePublicProps> & TreePublicProps, TreeBindings>
export type TreeInstance = InstanceType<DefineComponent<TreeProps, TreeBindings>>

export type TreeCustomAdditional = <K = VKey>(options: {
  node: TreeNode<K>
  level: number
}) => Record<string, any> | undefined

export interface TreeNode<K = VKey> {
  /**
   * @deprecated please use `customAdditional` instead'
   */
  additional?: {
    class?: any
    style?: any
    [key: string]: unknown
  }
  children?: TreeNode<K>[]
  disabled?: boolean | TreeNodeDisabled
  isLeaf?: boolean
  key?: K
  label?: string
  prefix?: string
  suffix?: string
  [key: string]: unknown
}

export interface TreeNodeDisabled {
  check?: boolean
  drag?: boolean
  drop?: boolean
  select?: boolean
}

export type TreeDroppable = <K = VKey>(
  options: TreeDroppableOptions<K>,
) => TreeDropType | boolean | Promise<TreeDropType | boolean>

export interface TreeDroppableOptions<K = VKey> {
  evt: DragEvent
  dragNode: TreeNode<K>
  dropNode: TreeNode<K>
  isTopHalf: boolean
}

export type TreeDropType = 'before' | 'inside' | 'after'

export interface TreeDragDropOptions<K = VKey> {
  evt: DragEvent
  node: TreeNode<K>
  dragNode?: TreeNode<K>
  dropNode?: TreeNode<K>
  dropType?: TreeDropType
}

// private
export const motionTreeNodeProps = {
  expanded: IxPropTypes.bool,
  expandedNodes: IxPropTypes.array<MergedNode>(),
  node: IxPropTypes.object<MergedNode>(),
  prefixCls: IxPropTypes.string.isRequired,
}

export const treeNodeProps = {
  node: IxPropTypes.object<MergedNode>().isRequired,
  isLeaf: IxPropTypes.bool.isRequired,
  isFirst: IxPropTypes.bool.isRequired,
  isLast: IxPropTypes.bool.isRequired,
  label: IxPropTypes.string,
  level: IxPropTypes.number.isRequired,
  rawNode: IxPropTypes.object<TreeNode>().isRequired,
  expanded: IxPropTypes.bool.isRequired,
  children: IxPropTypes.array<MergedNode>(),
  parentKey: IxPropTypes.oneOfType([String, Number, Symbol]),
  checkDisabled: IxPropTypes.bool,
  dragDisabled: IxPropTypes.bool,
  dropDisabled: IxPropTypes.bool,
  selectDisabled: IxPropTypes.bool,
}

export const treeNodeCheckboxProps = {
  node: IxPropTypes.object<MergedNode>().isRequired,
  checkDisabled: IxPropTypes.bool,
}

export const treeNodeExpandProps = {
  expanded: IxPropTypes.bool.isRequired,
  hasTopLine: IxPropTypes.bool,
  isLeaf: IxPropTypes.bool,
  nodeKey: IxPropTypes.oneOfType([String, Number, Symbol]).isRequired,
  rawNode: IxPropTypes.object<TreeNode>().isRequired,
}

export const treeNodeContentProps = {
  disabled: IxPropTypes.bool,
  nodeKey: IxPropTypes.oneOfType([String, Number, Symbol]).isRequired,
  label: IxPropTypes.string,
  rawNode: IxPropTypes.object<TreeNode>().isRequired,
  selected: IxPropTypes.bool,
}
