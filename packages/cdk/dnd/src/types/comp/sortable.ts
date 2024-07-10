/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
  CanDragOptions,
  CanDropOptions,
  DndSortableData,
  DndSortableDirection,
  DndSortableIsStickyOptions,
  DndSortableOnDragArgs,
  DndSortableOnDragEnterArgs,
  DndSortableOnDragLeaveArgs,
  DndSortableOnDragStartArgs,
  DndSortableOnDropArgs,
  DndSortableReorderInfo,
  DndSortableStrategy,
  GetKey,
} from '../sortable'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { Component, DefineComponent, FunctionalComponent, HTMLAttributes, PropType } from 'vue'

export type DndSortableReorderEffect = 'indicator' | 'none'

export const dndSortableProps = {
  tag: [String, Object, Function] as PropType<string | Component | FunctionalComponent>,
  strategy: { type: String as PropType<DndSortableStrategy>, default: undefined },
  dataSource: { type: Array as PropType<any[]>, default: () => [] },
  direction: { type: String as PropType<DndSortableDirection>, default: 'vertical' },
  effect: { type: String as PropType<DndSortableReorderEffect>, default: 'indicator' },
  preview: {
    type: [Boolean, String, Object] as PropType<boolean | 'native' | { offset: { x: number; y: number } }>,
    default: undefined,
  },
  getKey: { type: [Function, String] as PropType<GetKey | string>, default: 'key' },
  childrenKey: String,
  treeIndent: { type: Number, default: undefined },

  isSticky: {
    type: [Boolean, Function] as PropType<boolean | ((options: DndSortableIsStickyOptions) => boolean)>,
    default: undefined,
  },
  isTreeItemExpanded: Function as PropType<(key: VKey, data: DndSortableData) => void>,
  canDrag: { type: [Boolean, Function] as PropType<boolean | ((options: CanDragOptions) => boolean)>, default: true },
  canDrop: { type: [Boolean, Function] as PropType<boolean | ((options: CanDropOptions) => boolean)>, default: true },

  onDragStart: [Function, Array] as PropType<MaybeArray<(args: DndSortableOnDragStartArgs) => void>>,
  onDrag: [Function, Array] as PropType<MaybeArray<(args: DndSortableOnDragArgs) => void>>,
  onDragEnter: [Function, Array] as PropType<MaybeArray<(args: DndSortableOnDragEnterArgs) => void>>,
  onDragLeave: [Function, Array] as PropType<MaybeArray<(args: DndSortableOnDragLeaveArgs) => void>>,
  onDrop: [Function, Array] as PropType<MaybeArray<(args: DndSortableOnDropArgs) => void>>,

  onSortReorder: [Function, Array] as PropType<MaybeArray<(reorderInfo: DndSortableReorderInfo) => void>>,
  onSortChange: [Function, Array] as PropType<MaybeArray<(newDataSource: any[], oldDataSource: any[]) => void>>,
} as const

export const dndSortableItemProps = {
  tag: {
    type: [String, Object, Function] as PropType<string | Component | FunctionalComponent>,
    default: 'div',
  },
  itemKey: { type: [String, Number, Symbol] as PropType<VKey>, required: true },
  direction: String as PropType<DndSortableDirection>,
  isSticky: {
    type: [Boolean, Function] as PropType<boolean | ((options: DndSortableIsStickyOptions) => boolean)>,
    default: undefined,
  },
  canDrag: { type: [Boolean, Function] as PropType<boolean | ((options: CanDragOptions) => boolean)>, default: true },
  canDrop: { type: [Boolean, Function] as PropType<boolean | ((options: CanDropOptions) => boolean)>, default: true },

  onDragStart: [Function, Array] as PropType<MaybeArray<(args: DndSortableOnDragStartArgs) => void>>,
  onDrag: [Function, Array] as PropType<MaybeArray<(args: DndSortableOnDragArgs) => void>>,
  onDragEnter: [Function, Array] as PropType<MaybeArray<(args: DndSortableOnDragEnterArgs) => void>>,
  onDragLeave: [Function, Array] as PropType<MaybeArray<(args: DndSortableOnDragLeaveArgs) => void>>,
  onDrop: [Function, Array] as PropType<MaybeArray<(args: DndSortableOnDropArgs) => void>>,
} as const

export type DndSortableProps = ExtractInnerPropTypes<typeof dndSortableProps>
export type DndSortablePublicProps = ExtractPublicPropTypes<typeof dndSortableProps>
export type DndSortableComponent = DefineComponent<
  Omit<HTMLAttributes, keyof DndSortablePublicProps> & DndSortablePublicProps
>
export type DndSortableInstance = InstanceType<DefineComponent<DndSortableProps>>

export type DndSortableItemProps = ExtractInnerPropTypes<typeof dndSortableItemProps>
export type DndSortableItemPublicProps = ExtractPublicPropTypes<typeof dndSortableItemProps>
export type DndSortableItemComponent = DefineComponent<
  Omit<HTMLAttributes, keyof DndSortableItemPublicProps> & DndSortableItemPublicProps
>
export type DndSortableItemInstance = InstanceType<DefineComponent<DndSortableItemProps>>
