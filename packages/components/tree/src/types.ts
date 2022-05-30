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
  'onUpdate:checkedKeys': IxPropTypes.emit<(keys: VKey[]) => void>(),
  'onUpdate:expandedKeys': IxPropTypes.emit<(keys: VKey[]) => void>(),
  'onUpdate:loadedKeys': IxPropTypes.emit<(keys: VKey[]) => void>(),
  'onUpdate:selectedKeys': IxPropTypes.emit<(keys: VKey[]) => void>(),
  onCheck: IxPropTypes.emit<(checked: boolean, node: TreeNode) => void>(),
  onCheckedChange: IxPropTypes.emit<(checkedKeys: VKey[], checkedNodes: TreeNode[]) => void>(),
  onDragstart: IxPropTypes.emit<(options: TreeDragDropOptions) => void>(),
  onDragend: IxPropTypes.emit<(options: TreeDragDropOptions) => void>(),
  onDragenter: IxPropTypes.emit<(options: TreeDragDropOptions) => void>(),
  onDragleave: IxPropTypes.emit<(options: TreeDragDropOptions) => void>(),
  onDragover: IxPropTypes.emit<(options: TreeDragDropOptions) => void>(),
  onDrop: IxPropTypes.emit<(options: TreeDragDropOptions) => void>(),
  onExpand: IxPropTypes.emit<(expanded: boolean, node: TreeNode) => void>(),
  onExpandedChange: IxPropTypes.emit<(expendedKeys: VKey[], expendedNodes: TreeNode[]) => void>(),
  onLoaded: IxPropTypes.emit<(loadedKeys: VKey[], node: TreeNode) => void>(),
  onSelect: IxPropTypes.emit<(selected: boolean, node: TreeNode) => void>(),
  onSelectedChange: IxPropTypes.emit<(selectedKeys: VKey[], selectedNodes: TreeNode[]) => void>(),
  onFocus: IxPropTypes.emit<(evt: FocusEvent) => void>(),
  onBlur: IxPropTypes.emit<(evt: FocusEvent) => void>(),
  onKeydown: IxPropTypes.emit<(evt: KeyboardEvent) => void>(),
  onKeyup: IxPropTypes.emit<(evt: KeyboardEvent) => void>(),
  onNodeClick: IxPropTypes.emit<(evt: Event, node: TreeNode) => void>(),
  onNodeContextmenu: IxPropTypes.emit<(evt: Event, node: TreeNode) => void>(),
  onScroll: IxPropTypes.emit<(evt: Event) => void>(),
  onScrolledChange: IxPropTypes.emit<(startIndex: number, endIndex: number, visibleNodes: TreeNode[]) => void>(),
  onScrolledBottom: IxPropTypes.emit<() => void>(),
}

export type TreeProps = ExtractInnerPropTypes<typeof treeProps>
export type TreePublicProps = Omit<ExtractPublicPropTypes<typeof treeProps>, 'nodeKey'>
export interface TreeBindings {
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
  getNode: (key: VKey) => TreeNode | undefined
}
export type TreeComponent = DefineComponent<Omit<HTMLAttributes, keyof TreePublicProps> & TreePublicProps, TreeBindings>
export type TreeInstance = InstanceType<DefineComponent<TreeProps, TreeBindings>>

export type TreeCustomAdditional = (options: { node: TreeNode; level: number }) => Record<string, any> | undefined

export interface TreeNode {
  /**
   * @deprecated please use `customAdditional` instead'
   */
  additional?: {
    class?: any
    style?: any
    [key: string]: unknown
  }
  children?: TreeNode[]
  disabled?: boolean | TreeNodeDisabled
  isLeaf?: boolean
  key?: VKey
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

export type TreeDroppable = (options: TreeDroppableOptions) => TreeDropType | boolean | Promise<TreeDropType | boolean>

export interface TreeDroppableOptions {
  evt: DragEvent
  dragNode: TreeNode
  dropNode: TreeNode
  isTopHalf: boolean
}

export type TreeDropType = 'before' | 'inside' | 'after'

export interface TreeDragDropOptions {
  evt: DragEvent
  node: TreeNode
  dragNode?: TreeNode
  dropNode?: TreeNode
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
