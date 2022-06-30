/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { EmptyProps } from '@idux/components/empty'
import type { HeaderProps } from '@idux/components/header'
import type {
  TreeCheckStrategy,
  TreeCustomAdditional,
  TreeDragDropOptions,
  TreeDroppable,
  TreeNode,
  TreeNodeDisabled,
} from '@idux/components/tree'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export const proTreeProps = {
  checkedKeys: { type: Array as PropType<VKey[]>, default: undefined },
  expandedKeys: { type: Array as PropType<VKey[]>, default: undefined },
  loadedKeys: { type: Array as PropType<VKey[]>, default: undefined },
  selectedKeys: { type: Array as PropType<VKey[]>, default: undefined },

  checkable: { type: Boolean, default: false },
  childrenKey: { type: String, default: undefined },
  cascaderStrategy: { type: String as PropType<TreeCheckStrategy>, default: 'all' },
  clearIcon: { type: String, default: undefined },
  customAdditional: { type: Object as PropType<TreeCustomAdditional>, default: undefined },
  collapsed: { type: Boolean, default: undefined },
  collapsedWidth: { type: Number, default: 44 },
  collapseIcon: { type: Array as PropType<string[]>, default: undefined },
  dataSource: { type: Array as PropType<TreeNode[]>, default: undefined },
  disabled: { type: Function as PropType<(node: TreeNode) => boolean | TreeNodeDisabled>, default: undefined },
  empty: { type: [String, Object] as PropType<string | EmptyProps>, default: undefined },
  draggable: { type: Boolean, default: false },
  draggableIcon: { type: String, default: undefined },
  droppable: { type: Function as PropType<TreeDroppable>, default: undefined },
  expandIcon: {
    type: [String, Array] as PropType<string | [string, string]>,
    default: () => ['minus-square', 'plus-square'],
  },
  getKey: { type: [String, Function] as PropType<string | ((data: TreeNode) => VKey)>, default: undefined },
  header: { type: [String, Object] as PropType<string | HeaderProps>, default: undefined },
  labelKey: { type: String, default: undefined },
  leafLineIcon: { type: String, default: undefined },
  loadChildren: { type: Function as PropType<(node: TreeNode) => Promise<TreeNode[]>>, default: undefined },
  showLine: { type: Boolean, default: true },
  searchValue: { type: String, default: undefined },
  searchable: { type: Boolean, default: true },
  searchFn: { type: Function as PropType<(node: TreeNode, searchValue?: string) => boolean>, default: undefined },
  selectable: { type: [Boolean, String] as PropType<boolean | 'multiple'>, default: true },
  placeholder: { type: String, default: undefined },
  virtual: { type: Boolean, default: false },

  // events
  onCheck: [Function, Array] as PropType<MaybeArray<<K = VKey>(checked: boolean, node: TreeNode<K>) => void>>,
  onClear: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onCollapsed: [Function, Array] as PropType<MaybeArray<(collapsed: boolean) => void>>,
  onDragstart: [Function, Array] as PropType<MaybeArray<<K = VKey>(options: TreeDragDropOptions<K>) => void>>,
  onDragend: [Function, Array] as PropType<MaybeArray<<K = VKey>(options: TreeDragDropOptions<K>) => void>>,
  onDragenter: [Function, Array] as PropType<MaybeArray<<K = VKey>(options: TreeDragDropOptions<K>) => void>>,
  onDragleave: [Function, Array] as PropType<MaybeArray<<K = VKey>(options: TreeDragDropOptions<K>) => void>>,
  onDragover: [Function, Array] as PropType<MaybeArray<<K = VKey>(options: TreeDragDropOptions<K>) => void>>,
  onDrop: [Function, Array] as PropType<MaybeArray<<K = VKey>(options: TreeDragDropOptions<K>) => void>>,
  onNodeClick: [Function, Array] as PropType<MaybeArray<<K = VKey>(evt: Event, node: TreeNode<K>) => void>>,
  onNodeContextmenu: [Function, Array] as PropType<MaybeArray<<K = VKey>(evt: Event, node: TreeNode<K>) => void>>,
  onLoaded: [Function, Array] as PropType<MaybeArray<<K = VKey>(loadedKeys: K[], node: TreeNode<K>) => void>>,
  onExpand: [Function, Array] as PropType<MaybeArray<<K = VKey>(expanded: boolean, node: TreeNode<K>) => void>>,
  onSelect: [Function, Array] as PropType<MaybeArray<<K = VKey>(selected: boolean, node: TreeNode<K>) => void>>,
  onScroll: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onScrolledChange: [Function, Array] as PropType<
    MaybeArray<<K = VKey>(startIndex: number, endIndex: number, visibleData: TreeNode<K>[]) => void>
  >,
  onScrolledBottom: [Function, Array] as PropType<MaybeArray<() => void>>,
  onSearch: [Function, Array] as PropType<MaybeArray<(searchText: string) => void>>,
  onExpandedChange: [Function, Array] as PropType<
    MaybeArray<<K = VKey>(expendedKeys: K[], expendedNodes: TreeNode<K>[]) => void>
  >,
  onCheckedChange: [Function, Array] as PropType<
    MaybeArray<<K = VKey>(checkedKeys: K[], checkedNodes: TreeNode<K>[]) => void>
  >,
  onSelectedChange: [Function, Array] as PropType<
    MaybeArray<<K = VKey>(selectedKeys: K[], selectedNodes: TreeNode<K>[]) => void>
  >,
  'onUpdate:collapsed': [Function, Array] as PropType<MaybeArray<(collapsed: boolean) => void>>,
  'onUpdate:checkedKeys': [Function, Array] as PropType<MaybeArray<<K = VKey>(keys: K[]) => void>>,
  'onUpdate:expandedKeys': [Function, Array] as PropType<MaybeArray<<K = VKey>(keys: K[]) => void>>,
  'onUpdate:loadedKeys': [Function, Array] as PropType<MaybeArray<<K = VKey>(keys: K[]) => void>>,
  'onUpdate:selectedKeys': [Function, Array] as PropType<MaybeArray<<K = VKey>(keys: K[]) => void>>,
} as const

export interface ProTreeBindings<K = VKey> {
  expandAll: () => void
  collapseAll: () => void
  /**
   * get node by it's key
   *
   * @param key
   * @returns node
   */
  getNode: (key: K) => TreeNode<K> | undefined
}

export type ProTreeProps = ExtractInnerPropTypes<typeof proTreeProps>
export type ProTreePublicProps = ExtractPublicPropTypes<typeof proTreeProps>
export type ProTreeComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ProTreePublicProps> & ProTreePublicProps,
  ProTreeBindings
>
export type ProTreeInstance = InstanceType<DefineComponent<ProTreeProps, ProTreeBindings>>
