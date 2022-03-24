/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { VirtualScrollToFn } from '@idux/cdk/scroll'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { EmptyProps } from '@idux/components/empty'
import type { FormSize } from '@idux/components/form'
import type { TreeCheckStrategy, TreeDragDropOptions, TreeDroppable, TreeNode } from '@idux/components/tree'
import type { DefineComponent, HTMLAttributes, VNode, VNodeTypes } from 'vue'

import { controlPropDef } from '@idux/cdk/forms'
import { ɵPortalTargetDef } from '@idux/cdk/portal'
import { IxPropTypes } from '@idux/cdk/utils'

export const treeSelectProps = {
  value: IxPropTypes.any,
  expandedKeys: IxPropTypes.array<VKey>(),
  loadedKeys: IxPropTypes.array<VKey>(),
  control: controlPropDef,
  open: IxPropTypes.bool,

  autofocus: IxPropTypes.bool.def(false),
  childrenKey: IxPropTypes.string,
  cascade: IxPropTypes.bool.def(false),
  checkable: IxPropTypes.bool.def(false),
  clearable: IxPropTypes.bool.def(false),
  checkStrategy: IxPropTypes.oneOf<TreeCheckStrategy>(['all', 'parent', 'child']).def('all'),
  dataSource: IxPropTypes.array<TreeSelectNode>().def(() => []),
  disabled: IxPropTypes.bool.def(false),
  draggable: IxPropTypes.bool.def(false),
  droppable: IxPropTypes.func<TreeDroppable>(),
  empty: IxPropTypes.oneOfType([String, IxPropTypes.object<EmptyProps>()]),
  expandIcon: IxPropTypes.string,
  maxLabelCount: IxPropTypes.oneOfType([IxPropTypes.number, IxPropTypes.oneOf(['responsive'])]),
  maxLabel: IxPropTypes.oneOfType([IxPropTypes.number, IxPropTypes.oneOf(['responsive'])]).def(Number.MAX_SAFE_INTEGER),
  multiple: IxPropTypes.bool.def(false),
  labelKey: IxPropTypes.string,
  leafLineIcon: IxPropTypes.string,
  loadChildren: IxPropTypes.func<(node: TreeSelectNode) => Promise<TreeSelectNode[]>>(),
  nodeKey: IxPropTypes.oneOfType([String, IxPropTypes.func<(node: TreeSelectNode) => VKey>()]),
  overlayClassName: IxPropTypes.string,
  overlayRender: IxPropTypes.func<(children: VNode[]) => VNodeTypes>(),
  placeholder: IxPropTypes.string,
  readonly: IxPropTypes.bool.def(false),
  searchable: IxPropTypes.oneOfType([Boolean, IxPropTypes.oneOf(['overlay'])]).def(false),
  searchFn: IxPropTypes.func<(node: TreeSelectNode, searchValue?: string) => boolean>(),
  size: IxPropTypes.oneOf<FormSize>(['sm', 'md', 'lg']),
  suffix: IxPropTypes.string,
  showLine: IxPropTypes.bool,
  target: ɵPortalTargetDef,
  treeDisabled: IxPropTypes.func<(node: TreeSelectNode) => boolean | TreeSelectNodeDisabled>(),
  virtual: IxPropTypes.bool.def(false),

  // events
  'onUpdate:value': IxPropTypes.emit<(value: any) => void>(),
  'onUpdate:expandedKeys': IxPropTypes.emit<(keys: VKey[]) => void>(),
  'onUpdate:loadedKeys': IxPropTypes.emit<(keys: VKey[]) => void>(),
  onCheck: IxPropTypes.emit<(checked: boolean, node: TreeSelectNode) => void>(),
  onChange: IxPropTypes.emit<(value: any, oldValue: any, node?: TreeSelectNode | TreeSelectNode[]) => void>(),
  onClear: IxPropTypes.emit<(evt: Event) => void>(),
  onDragstart: IxPropTypes.emit<(options: TreeDragDropOptions) => void>(),
  onDragend: IxPropTypes.emit<(options: TreeDragDropOptions) => void>(),
  onDragenter: IxPropTypes.emit<(options: TreeDragDropOptions) => void>(),
  onDragleave: IxPropTypes.emit<(options: TreeDragDropOptions) => void>(),
  onDragover: IxPropTypes.emit<(options: TreeDragDropOptions) => void>(),
  onDrop: IxPropTypes.emit<(options: TreeDragDropOptions) => void>(),
  onExpand: IxPropTypes.emit<(expanded: boolean, node: TreeSelectNode) => void>(),
  onExpandedChange: IxPropTypes.emit<(expendedKeys: VKey[], expendedNodes: TreeSelectNode[]) => void>(),
  onLoaded: IxPropTypes.emit<(loadedKeys: VKey[], node: TreeSelectNode) => void>(),
  onSelect: IxPropTypes.emit<(selected: boolean, node: TreeSelectNode) => void>(),
  onBlur: IxPropTypes.emit<(evt: FocusEvent) => void>(),
  onFocus: IxPropTypes.emit<(evt: FocusEvent) => void>(),
  onNodeClick: IxPropTypes.emit<(evt: Event, node: TreeSelectNode) => void>(),
  onNodeContextmenu: IxPropTypes.emit<(evt: Event, node: TreeSelectNode) => void>(),
  onSearchedChange: IxPropTypes.emit<(searchedKeys: VKey[], searchedNodes: TreeSelectNode[]) => void>(),
  onScroll: IxPropTypes.emit<(evt: Event) => void>(),
  onScrolledChange:
    IxPropTypes.emit<(startIndex: number, endIndex: number, visibleOptions: TreeSelectNode[]) => void>(),
  onScrolledBottom: IxPropTypes.emit<() => void>(),

  // private
  overlayHeight: IxPropTypes.number.def(256),
}

export type TreeSelectProps = ExtractInnerPropTypes<typeof treeSelectProps>
export type TreeSelectPublicProps = ExtractPublicPropTypes<typeof treeSelectProps>
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
  clearable: IxPropTypes.bool,
  suffix: IxPropTypes.string,
}
export type TreeSelectorProps = ExtractInnerPropTypes<any>
