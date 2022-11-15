/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AbstractControl, ValidateStatus } from '@idux/cdk/forms'
import type { PortalTargetType } from '@idux/cdk/portal'
import type { VirtualScrollToFn } from '@idux/cdk/scroll'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { CascaderStrategy } from '@idux/components/cascader'
import type { EmptyProps } from '@idux/components/empty'
import type { FormSize } from '@idux/components/form'
import type { TreeCustomAdditional, TreeDragDropOptions, TreeDroppable, TreeNode } from '@idux/components/tree'
import type { DefineComponent, HTMLAttributes, PropType, VNode, VNodeChild } from 'vue'

export const treeSelectProps = {
  control: { type: [String, Number, Object] as PropType<string | number | AbstractControl>, default: undefined },
  value: { type: null, default: undefined },
  open: { type: Boolean, default: undefined },
  expandedKeys: { type: Array as PropType<VKey[]>, default: undefined },
  loadedKeys: { type: Array as PropType<VKey[]>, default: undefined },

  autocomplete: { type: String, default: 'off' },
  autofocus: { type: Boolean, default: false },
  borderless: { type: Boolean, default: undefined },
  childrenKey: { type: String, default: undefined },
  cascaderStrategy: { type: String as PropType<CascaderStrategy>, default: 'off' },
  checkable: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false },
  clearIcon: { type: String, default: undefined },
  customAdditional: { type: Function as PropType<TreeSelectCustomAdditional>, default: undefined },
  dataSource: { type: Array as PropType<TreeSelectNode[]>, default: () => [] },
  disabled: { type: Boolean, default: false },
  draggable: { type: Boolean, default: false },
  draggableIcon: { type: String, default: undefined },
  droppable: { type: Function as PropType<TreeDroppable>, default: undefined },
  empty: { type: [String, Object] as PropType<'default' | 'simple' | EmptyProps>, default: 'simple' },
  expandIcon: { type: [String, Array] as PropType<string | [string, string]>, default: undefined },
  getKey: { type: [String, Function] as PropType<string | ((data: TreeSelectNode<any>) => any)>, default: undefined },
  labelKey: { type: String, default: undefined },
  leafLineIcon: { type: String, default: undefined },
  loadChildren: {
    type: Function as PropType<(node: TreeSelectNode<any>) => Promise<TreeSelectNode<any>[]>>,
    default: undefined,
  },
  maxLabel: { type: [Number, String] as PropType<number | 'responsive'>, default: Number.MAX_SAFE_INTEGER },
  multiple: { type: Boolean, default: false },
  offset: Array as unknown as PropType<[number, number]>,
  overlayClassName: { type: String, default: undefined },
  overlayContainer: {
    type: [String, HTMLElement, Function] as PropType<PortalTargetType>,
    default: undefined,
  },
  overlayMatchWidth: { type: Boolean, default: undefined },
  overlayRender: { type: Function as PropType<(children: VNode[]) => VNodeChild>, default: undefined },
  placeholder: { type: String, default: undefined },
  readonly: { type: Boolean, default: false },
  searchable: { type: [Boolean, String] as PropType<boolean | 'overlay'>, default: false },
  searchFn: {
    type: [Boolean, Function] as PropType<boolean | ((node: TreeSelectNode, searchValue?: string) => boolean)>,
    default: true,
  },
  size: { type: String as PropType<FormSize>, default: undefined },
  showLine: { type: Boolean, default: undefined },
  status: String as PropType<ValidateStatus>,
  suffix: { type: String, default: undefined },
  treeDisabled: {
    type: Function as PropType<(node: TreeSelectNode<any>) => boolean | TreeSelectNodeDisabled>,
    default: undefined,
  },
  virtual: { type: Boolean, default: false },

  // events
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<(value: any) => void>>,
  'onUpdate:open': [Function, Array] as PropType<MaybeArray<(opened: boolean) => void>>,
  'onUpdate:expandedKeys': [Function, Array] as PropType<MaybeArray<(keys: any[]) => void>>,
  'onUpdate:loadedKeys': [Function, Array] as PropType<MaybeArray<(keys: any[]) => void>>,
  onCheck: [Function, Array] as PropType<MaybeArray<(checked: boolean, node: TreeSelectNode<any>) => void>>,
  onChange: [Function, Array] as PropType<MaybeArray<(value: any, oldValue: any) => void>>,
  onClear: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onDragstart: [Function, Array] as PropType<MaybeArray<(options: TreeDragDropOptions<any>) => void>>,
  onDragend: [Function, Array] as PropType<MaybeArray<(options: TreeDragDropOptions<any>) => void>>,
  onDragenter: [Function, Array] as PropType<MaybeArray<(options: TreeDragDropOptions<any>) => void>>,
  onDragleave: [Function, Array] as PropType<MaybeArray<(options: TreeDragDropOptions<any>) => void>>,
  onDragover: [Function, Array] as PropType<MaybeArray<(options: TreeDragDropOptions<any>) => void>>,
  onDrop: [Function, Array] as PropType<MaybeArray<(options: TreeDragDropOptions<any>) => void>>,
  onExpand: [Function, Array] as PropType<MaybeArray<(expanded: boolean, node: TreeSelectNode<any>) => void>>,
  onExpandedChange: [Function, Array] as PropType<
    MaybeArray<(expendedKeys: any[], expendedNodes: TreeSelectNode<any>[]) => void>
  >,
  onLoaded: [Function, Array] as PropType<MaybeArray<(loadedKeys: any[], node: TreeSelectNode<any>) => void>>,
  onNodeClick: [Function, Array] as PropType<MaybeArray<(evt: Event, node: TreeSelectNode<any>) => void>>,
  onNodeContextmenu: [Function, Array] as PropType<MaybeArray<(evt: Event, node: TreeSelectNode<any>) => void>>,
  onSearch: [Function, Array] as PropType<MaybeArray<(value: string) => void>>,
  onSelect: [Function, Array] as PropType<MaybeArray<(selected: boolean, node: TreeSelectNode<any>) => void>>,
  onScroll: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onScrolledChange: [Function, Array] as PropType<
    MaybeArray<(startIndex: number, endIndex: number, visibleData: TreeSelectNode<any>[]) => void>
  >,
  onScrolledBottom: [Function, Array] as PropType<MaybeArray<() => void>>,

  // private
  overlayHeight: { type: Number, default: 256 },
} as const

export type TreeSelectProps = ExtractInnerPropTypes<typeof treeSelectProps>
export type TreeSelectPublicProps = Omit<ExtractPublicPropTypes<typeof treeSelectProps>, 'overlayHeight'>
export interface TreeSelectBindings<K = VKey> {
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
export type TreeSelectComponent = DefineComponent<
  Omit<HTMLAttributes, keyof TreeSelectPublicProps> & TreeSelectPublicProps,
  TreeSelectBindings
>
export type TreeSelectInstance = InstanceType<DefineComponent<TreeSelectProps, TreeSelectBindings>>

export type TreeSelectCustomAdditional = TreeCustomAdditional

export type TreeSelectNode<K = VKey> = TreeNode<K>

export interface TreeSelectNodeDisabled {
  select?: boolean
  drag?: boolean
  drop?: boolean
}

// private
export const treeSelectorProps = {
  clearable: Boolean,
  suffix: String,
} as const

export type TreeSelectorProps = ExtractInnerPropTypes<typeof treeSelectorProps>
