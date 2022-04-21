/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { VirtualScrollToFn } from '@idux/cdk/scroll'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { EmptyProps } from '@idux/components/empty'
import type { FormSize } from '@idux/components/form'
import type { TreeCheckStrategy, TreeDragDropOptions, TreeDroppable, TreeNode } from '@idux/components/tree'
import type { DefineComponent, HTMLAttributes, PropType, VNode, VNodeChild } from 'vue'

import { controlPropDef } from '@idux/cdk/forms'
import { ɵPortalTargetDef } from '@idux/cdk/portal'

export const treeSelectProps = {
  control: controlPropDef,
  value: { type: null, default: undefined },
  open: { type: Boolean, default: undefined },
  expandedKeys: { type: Array as PropType<VKey[]>, default: undefined },
  loadedKeys: { type: Array as PropType<VKey[]>, default: undefined },

  autocomplete: { type: String, default: 'off' },
  autofocus: { type: Boolean, default: false },
  borderless: { type: Boolean, default: undefined },
  childrenKey: { type: String, default: undefined },
  cascade: { type: Boolean, default: false },
  checkable: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false },
  clearIcon: { type: String, default: undefined },
  checkStrategy: { type: String as PropType<TreeCheckStrategy>, default: 'all' },
  dataSource: { type: Array as PropType<TreeSelectNode[]>, default: () => [] },
  disabled: { type: Boolean, default: false },
  draggable: { type: Boolean, default: false },
  droppable: { type: Function as PropType<TreeDroppable>, default: undefined },
  empty: { type: [String, Object] as PropType<string | EmptyProps>, default: undefined },
  expandIcon: { type: String, default: undefined },
  labelKey: { type: String, default: undefined },
  leafLineIcon: { type: String, default: undefined },
  loadChildren: { type: Function as PropType<(node: TreeSelectNode) => Promise<TreeSelectNode[]>>, default: undefined },
  /**
   * @deprecated
   */
  maxLabelCount: { type: [Number, String] as PropType<number | 'responsive'>, default: undefined },
  maxLabel: { type: [Number, String] as PropType<number | 'responsive'>, default: Number.MAX_SAFE_INTEGER },
  multiple: { type: Boolean, default: false },
  nodeKey: { type: [String, Function] as PropType<string | ((node: TreeSelectNode) => VKey)>, default: undefined },
  overlayClassName: { type: String, default: undefined },
  overlayMatchWidth: { type: Boolean, default: undefined },
  overlayRender: { type: Function as PropType<(children: VNode[]) => VNodeChild>, default: undefined },
  placeholder: { type: String, default: undefined },
  readonly: { type: Boolean, default: false },
  searchable: { type: [Boolean, String] as PropType<boolean | 'overlay'>, default: false },
  searchFn: { type: Function as PropType<(node: TreeSelectNode, searchValue?: string) => boolean>, default: undefined },
  size: { type: String as PropType<FormSize>, default: undefined },
  showLine: { type: Boolean, default: undefined },
  suffix: { type: String, default: undefined },
  target: ɵPortalTargetDef,
  treeDisabled: {
    type: Function as PropType<(node: TreeSelectNode) => boolean | TreeSelectNodeDisabled>,
    default: undefined,
  },
  virtual: { type: Boolean, default: false },

  // events
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<(value: any) => void>>,
  'onUpdate:open': [Function, Array] as PropType<MaybeArray<(opened: boolean) => void>>,
  'onUpdate:expandedKeys': [Function, Array] as PropType<MaybeArray<(keys: VKey[]) => void>>,
  'onUpdate:loadedKeys': [Function, Array] as PropType<MaybeArray<(keys: VKey[]) => void>>,
  onCheck: [Function, Array] as PropType<MaybeArray<(checked: boolean, node: TreeSelectNode) => void>>,
  onChange: [Function, Array] as PropType<MaybeArray<(value: any, oldValue: any) => void>>,
  onClear: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onDragstart: [Function, Array] as PropType<MaybeArray<(options: TreeDragDropOptions) => void>>,
  onDragend: [Function, Array] as PropType<MaybeArray<(options: TreeDragDropOptions) => void>>,
  onDragenter: [Function, Array] as PropType<MaybeArray<(options: TreeDragDropOptions) => void>>,
  onDragleave: [Function, Array] as PropType<MaybeArray<(options: TreeDragDropOptions) => void>>,
  onDragover: [Function, Array] as PropType<MaybeArray<(options: TreeDragDropOptions) => void>>,
  onDrop: [Function, Array] as PropType<MaybeArray<(options: TreeDragDropOptions) => void>>,
  onExpand: [Function, Array] as PropType<MaybeArray<(expanded: boolean, node: TreeSelectNode) => void>>,
  onExpandedChange: [Function, Array] as PropType<
    MaybeArray<(expendedKeys: VKey[], expendedNodes: TreeSelectNode[]) => void>
  >,
  onLoaded: [Function, Array] as PropType<MaybeArray<(loadedKeys: VKey[], node: TreeSelectNode) => void>>,
  onNodeClick: [Function, Array] as PropType<MaybeArray<(evt: Event, node: TreeSelectNode) => void>>,
  onNodeContextmenu: [Function, Array] as PropType<MaybeArray<(evt: Event, node: TreeSelectNode) => void>>,
  onSearch: [Function, Array] as PropType<MaybeArray<(value: string) => void>>,
  onSearchedChange: [Function, Array] as PropType<
    MaybeArray<(searchedKeys: VKey[], searchedNodes: TreeSelectNode[]) => void>
  >,
  onSelect: [Function, Array] as PropType<MaybeArray<(selected: boolean, node: TreeSelectNode) => void>>,
  onScroll: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onScrolledChange: [Function, Array] as PropType<
    MaybeArray<(startIndex: number, endIndex: number, visibleData: TreeSelectNode[]) => void>
  >,
  onScrolledBottom: [Function, Array] as PropType<MaybeArray<() => void>>,

  // private
  overlayHeight: { type: Number, default: 256 },
} as const

export type TreeSelectProps = ExtractInnerPropTypes<typeof treeSelectProps>
export type TreeSelectPublicProps = Omit<
  ExtractPublicPropTypes<typeof treeSelectProps>,
  'maxLabelCount' | 'overlayHeight'
>
export interface TreeSelectBindings {
  focus: (options?: FocusOptions) => void
  blur: () => void
  scrollTo: VirtualScrollToFn
  setExpandAll: (isAll: boolean) => void
}
export type TreeSelectComponent = DefineComponent<
  Omit<HTMLAttributes, keyof TreeSelectPublicProps> & TreeSelectPublicProps,
  TreeSelectBindings
>
export type TreeSelectInstance = InstanceType<DefineComponent<TreeSelectProps, TreeSelectBindings>>

export type TreeSelectNode = TreeNode

export interface TreeSelectNodeDisabled {
  select?: boolean
  drag?: boolean
  drop?: boolean
}

// private
export const treeSelectorProps = {
  clearable: Boolean,
  suffix: String,
}
export type TreeSelectorProps = ExtractInnerPropTypes<typeof treeSelectorProps>
