/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { DndSortableOnDragStartArgs, DndSortableOnDropArgs, DndSortableReorderInfo } from '@idux/cdk/dnd'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { DefineComponent, FunctionalComponent, HTMLAttributes, PropType, VNodeChild } from 'vue'

import { SelectData } from '@idux/components/select'

export type TabsMode = 'default' | 'primary'
export type TabsPlacement = 'top' | 'bottom' | 'start' | 'end'
export type TabsSize = 'lg' | 'md'
export type TabsType = 'card' | 'line' | 'segment'

export interface TabsDndSortable {
  autoScroll?: boolean
  dragHandle?: boolean | string
}

export const tabsProps = {
  selectedKey: { type: [Number, String, Symbol] as PropType<VKey>, default: undefined },

  allTabsPanelOpen: { type: Boolean, default: undefined },
  addable: { type: Boolean, default: false },
  closable: { type: Boolean, default: false },
  dataSource: { type: Array as PropType<TabsData[]>, default: undefined },
  dndSortable: { type: [Boolean, Object] as PropType<boolean | TabsDndSortable>, default: false },
  forceRender: { type: Boolean, default: false },
  mode: { type: String as PropType<TabsMode>, default: 'default' },
  placement: { type: String as PropType<TabsPlacement>, default: 'top' },
  size: { type: String as PropType<TabsSize>, default: undefined },
  showAllTabsPanel: { type: Boolean, default: undefined },
  type: { type: String as PropType<TabsType>, default: 'card' },

  'onUpdate:selectedKey': [Function, Array] as PropType<MaybeArray<(key: any) => void>>,
  'onUpdate:allTabsPanelOpen': [Function, Array] as PropType<MaybeArray<(opened: boolean) => void>>,
  onAdd: [Function, Array] as PropType<MaybeArray<() => void | boolean | Promise<boolean>>>,
  onClose: [Function, Array] as PropType<MaybeArray<(key: any) => void | boolean | Promise<boolean>>>,
  /**
   * @deprecated
   */
  onTabClick: [Function, Array] as PropType<MaybeArray<(key: any, evt: Event) => void>>,
  onBeforeLeave: [Function, Array] as PropType<
    MaybeArray<(key: any, oldKey?: any) => void | boolean | Promise<boolean>>
  >,
  onDndSortReorder: [Function, Array] as PropType<MaybeArray<(reorderInfo: DndSortableReorderInfo) => void>>,
  onDndSortChange: [Function, Array] as PropType<
    MaybeArray<(newDataSource: TabsData[], oldDataSource: TabsData[]) => void>
  >,
} as const

export type TabsProps = ExtractInnerPropTypes<typeof tabsProps>
export type TabsPublicProps = Omit<ExtractPublicPropTypes<typeof tabsProps>, 'onTabClick'>
export type TabsComponent = DefineComponent<Omit<HTMLAttributes, keyof TabsPublicProps> & TabsPublicProps>
export type TabsInstance = InstanceType<DefineComponent<TabsProps>>

export interface TabProps {
  closable?: boolean
  content?: string
  disabled?: boolean
  forceRender?: boolean
  title?: string
}
export type TabComponent = FunctionalComponent<Omit<HTMLAttributes, keyof TabProps> & TabProps>

export interface TabsData<K = VKey> extends TabProps {
  key: K
  customContent?: string | ((data: { key: VKey; content?: string; selected?: boolean }) => VNodeChild)
  customTitle?:
    | string
    | ((data: { key: VKey; disabled?: boolean; selected?: boolean; title?: string; overflowed: boolean }) => VNodeChild)
  [key: string]: any
}

// private
export const tabNavProps = {
  closable: { type: Boolean, default: undefined },
  disabled: { type: Boolean, default: undefined },
  selected: { type: Boolean, default: undefined },
  title: { type: String, default: undefined },
  onSelected: { type: Function, required: true },
} as const

export const tabPaneProps = {
  content: { type: String, default: undefined },
  forceRender: { type: Boolean, default: undefined },
  selected: { type: Boolean, default: undefined },
} as const

export const moreSelectPaneProps = {
  dataSource: { type: Array as PropType<SelectData[]>, default: () => [] },
  visible: { type: Boolean, default: false },
  onSortReorder: Function as PropType<(reorderInfo: DndSortableReorderInfo) => void>,

  // private
  _virtualScrollHeight: { type: Number, default: 186 },
  _onDragStart: Function as PropType<(args: DndSortableOnDragStartArgs) => void>,
  _onDrop: Function as PropType<(args: DndSortableOnDropArgs) => void>,
} as const
