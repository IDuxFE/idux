/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { MergedNode } from './composables/useDataSource'
import type { VirtualScrollToFn } from '@idux/cdk/scroll'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { EmptyProps } from '@idux/components/empty'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export type CheckStrategy = 'all' | 'parent' | 'child'

export const treeProps = {
  checkedKeys: Array as PropType<VKey[]>,
  expandedKeys: Array as PropType<VKey[]>,
  indeterminateKeys: Array as PropType<VKey[]>,
  loadedKeys: Array as PropType<VKey[]>,
  selectedKeys: Array as PropType<VKey[]>,

  blocked: {
    type: Boolean,
    default: undefined,
  },
  cascade: {
    type: Boolean,
    default: false,
  },
  checkable: {
    type: Boolean,
    default: false,
  },
  childrenKey: String,
  checkStrategy: {
    type: String as PropType<CheckStrategy>,
    default: 'all',
  },
  customAdditional: { type: Object as PropType<TreeCustomAdditional>, default: undefined },
  dataSource: {
    type: Array as PropType<TreeNode[]>,
    default: (): TreeNode[] => [],
  },
  disabled: Function as PropType<(node: TreeNode) => boolean | TreeNodeDisabled>,
  draggable: {
    type: Boolean,
    default: false,
  },
  draggableIcon: { type: String, default: undefined },
  droppable: Function as PropType<TreeDroppable>,
  empty: [String, Object] as PropType<string | EmptyProps>,
  expandIcon: { type: [String, Array] as PropType<string | [string, string]>, default: undefined },
  getKey: { type: [String, Function] as PropType<string | ((data: TreeNode) => VKey)>, default: undefined },
  height: Number,
  labelKey: String,
  leafLineIcon: String,
  loadChildren: Function as PropType<(node: TreeNode) => Promise<TreeNode[]>>,
  /**
   * @deprecated please use `getKey` instead'
   */
  nodeKey: [String, Function] as PropType<string | ((node: TreeNode) => VKey)>,
  searchFn: Function as PropType<(node: TreeNode, searchValue?: string) => boolean>,
  searchValue: String,
  selectable: {
    type: [Boolean, String] as PropType<boolean | 'multiple'>,
    default: true,
  },
  showLine: {
    type: Boolean,
    default: undefined,
  },
  virtual: {
    type: Boolean,
    default: false,
  },

  // events
  'onUpdate:checkedKeys': [Function, Array] as PropType<MaybeArray<<K = VKey>(keys: K[]) => void>>,
  'onUpdate:expandedKeys': [Function, Array] as PropType<MaybeArray<<K = VKey>(keys: K[]) => void>>,
  'onUpdate:loadedKeys': [Function, Array] as PropType<MaybeArray<<K = VKey>(keys: K[]) => void>>,
  'onUpdate:selectedKeys': [Function, Array] as PropType<MaybeArray<<K = VKey>(keys: K[]) => void>>,
  onCheck: [Function, Array] as PropType<MaybeArray<<K = VKey>(checked: boolean, node: TreeNode<K>) => void>>,
  onCheckedChange: [Function, Array] as PropType<
    MaybeArray<<K = VKey>(checkedKeys: K[], checkedNodes: TreeNode<K>[]) => void>
  >,
  onDragstart: [Function, Array] as PropType<MaybeArray<<K = VKey>(options: TreeDragDropOptions<K>) => void>>,
  onDragend: [Function, Array] as PropType<MaybeArray<<K = VKey>(options: TreeDragDropOptions<K>) => void>>,
  onDragenter: [Function, Array] as PropType<MaybeArray<<K = VKey>(options: TreeDragDropOptions<K>) => void>>,
  onDragleave: [Function, Array] as PropType<MaybeArray<<K = VKey>(options: TreeDragDropOptions<K>) => void>>,
  onDragover: [Function, Array] as PropType<MaybeArray<<K = VKey>(options: TreeDragDropOptions<K>) => void>>,
  onDrop: [Function, Array] as PropType<MaybeArray<<K = VKey>(options: TreeDragDropOptions<K>) => void>>,
  onExpand: [Function, Array] as PropType<MaybeArray<<K = VKey>(expanded: boolean, node: TreeNode<K>) => void>>,
  onExpandedChange: [Function, Array] as PropType<
    MaybeArray<<K = VKey>(expendedKeys: K[], expendedNodes: TreeNode<K>[]) => void>
  >,
  onLoaded: [Function, Array] as PropType<MaybeArray<<K = VKey>(loadedKeys: K[], node: TreeNode<K>) => void>>,
  onSelect: [Function, Array] as PropType<MaybeArray<<K = VKey>(selected: boolean, node: TreeNode<K>) => void>>,
  onSelectedChange: [Function, Array] as PropType<
    MaybeArray<<K = VKey>(selectedKeys: K[], selectedNodes: TreeNode<K>[]) => void>
  >,
  onFocus: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onBlur: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onKeydown: [Function, Array] as PropType<MaybeArray<(evt: KeyboardEvent) => void>>,
  onKeyup: [Function, Array] as PropType<MaybeArray<(evt: KeyboardEvent) => void>>,
  onNodeClick: [Function, Array] as PropType<MaybeArray<<K = VKey>(evt: Event, node: TreeNode<K>) => void>>,
  onNodeContextmenu: [Function, Array] as PropType<MaybeArray<<K = VKey>(evt: Event, node: TreeNode<K>) => void>>,
  onScroll: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onScrolledChange: [Function, Array] as PropType<
    MaybeArray<<K = VKey>(startIndex: number, endIndex: number, visibleNodes: TreeNode<K>[]) => void>
  >,
  onScrolledBottom: [Function, Array] as PropType<MaybeArray<() => void>>,
} as const

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
  expanded: {
    type: Boolean,
    default: undefined,
  },
  expandedNodes: Array as PropType<MergedNode[]>,
  node: Object as PropType<MergedNode>,
  prefixCls: {
    type: String,
    required: true,
  },
} as const

export const treeNodeProps = {
  node: {
    type: Object as PropType<MergedNode>,
    required: true,
  },
  isLeaf: {
    type: Boolean,
    required: true,
  },
  isFirst: {
    type: Boolean,
    required: true,
  },
  isLast: {
    type: Boolean,
    required: true,
  },
  label: String,
  level: {
    type: Number,
    required: true,
  },
  rawNode: {
    type: Object as PropType<TreeNode>,
    required: true,
  },
  expanded: {
    type: Boolean,
    required: true,
  },
  children: Array as PropType<MergedNode[]>,
  parentKey: [String, Number, Symbol] as PropType<VKey>,
  checkDisabled: {
    type: Boolean,
    default: undefined,
  },
  dragDisabled: {
    type: Boolean,
    default: undefined,
  },
  dropDisabled: {
    type: Boolean,
    default: undefined,
  },
  selectDisabled: {
    type: Boolean,
    default: undefined,
  },
} as const

export const treeNodeCheckboxProps = {
  node: {
    type: Object as PropType<MergedNode>,
    required: true,
  },
  checkDisabled: {
    type: Boolean,
    default: undefined,
  },
} as const

export const treeNodeExpandProps = {
  expanded: {
    type: Boolean,
    required: true,
  },
  hasTopLine: {
    type: Boolean,
    default: undefined,
  },
  isLeaf: {
    type: Boolean,
    default: undefined,
  },
  nodeKey: {
    type: [String, Number, Symbol] as PropType<VKey>,
    required: true,
  },
  rawNode: {
    type: Object as PropType<TreeNode>,
    required: true,
  },
} as const

export const treeNodeContentProps = {
  disabled: {
    type: Boolean,
    default: undefined,
  },
  nodeKey: {
    type: [String, Number, Symbol] as PropType<VKey>,
    required: true,
  },
  label: String,
  rawNode: {
    type: Object as PropType<TreeNode>,
    required: true,
  },
  selected: {
    type: Boolean,
    default: undefined,
  },
} as const
