/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable  @typescript-eslint/no-explicit-any */

import type { ExtractInnerPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { CascaderStrategy } from '@idux/components/cascader'
import type { DatePanelProps, DateRangePanelProps } from '@idux/components/date-picker'
import type { SelectData } from '@idux/components/select'
import type { TreeDragDropOptions, TreeDroppable } from '@idux/components/tree'
import type { TreeSelectNode } from '@idux/components/tree-select'
import type { PropType } from 'vue'

export type SelectPanelData = Required<Pick<SelectData, 'key' | 'label'>> & SelectData
export type TreeSelectPanelData = TreeSelectNode &
  Required<Pick<TreeSelectNode, 'key' | 'label'>> & {
    children?: TreeSelectPanelData[]
  }

export const proSearchSelectPanelProps = {
  value: { type: Array as PropType<VKey[]>, default: undefined },
  dataSource: { type: Array as PropType<SelectPanelData[]>, default: undefined },
  multiple: { type: Boolean, default: false },
  showSelectAll: { type: Boolean, default: true },
  allSelected: Boolean,
  searchValue: { type: String, default: undefined },
  searchFn: Function as PropType<(data: SelectPanelData, searchValue?: string) => boolean>,
  setOnKeyDown: Function as PropType<(onKeyDown: ((evt: KeyboardEvent) => boolean) | undefined) => void>,
  virtual: { type: Boolean, default: false },

  onChange: [Function, Array] as PropType<MaybeArray<(value: VKey[]) => void>>,
  onConfirm: [Function, Array] as PropType<MaybeArray<() => void>>,
  onCancel: [Function, Array] as PropType<MaybeArray<() => void>>,
  onSearch: [Function, Array] as PropType<MaybeArray<(searchValue: string) => void>>,
  onSelectAllClick: [Function, Array] as PropType<MaybeArray<() => void>>,
} as const
export type ProSearchSelectPanelProps = ExtractInnerPropTypes<typeof proSearchSelectPanelProps>

export const proSearchTreeSelectPanelProps = {
  value: { type: Array as PropType<VKey[]>, default: undefined },
  dataSource: { type: Array as PropType<TreeSelectPanelData[]>, default: undefined },
  multiple: { type: Boolean, default: false },
  checkable: { type: Boolean, default: false },
  expandedKeys: { type: Array as PropType<VKey[]>, default: undefined },
  cascaderStrategy: { type: String as PropType<CascaderStrategy>, default: 'off' },
  draggable: { type: Boolean, default: false },
  draggableIcon: { type: String, default: undefined },
  droppable: { type: Function as PropType<TreeDroppable>, default: undefined },

  expandIcon: { type: [String, Array] as PropType<string | [string, string]>, default: undefined },
  loadChildren: {
    type: Function as PropType<(node: TreeSelectPanelData) => Promise<TreeSelectPanelData[]>>,
    default: undefined,
  },
  leafLineIcon: { type: String, default: undefined },
  showLine: { type: Boolean, default: undefined },
  searchValue: { type: String, default: undefined },
  searchFn: Function as PropType<(node: TreeSelectPanelData, searchValue?: string) => boolean>,
  virtual: { type: Boolean, default: false },

  onChange: Function as PropType<(value: VKey[]) => void>,
  onConfirm: Function as PropType<() => void>,
  onCancel: Function as PropType<() => void>,

  onCheck: [Function, Array] as PropType<MaybeArray<(checked: boolean, node: TreeSelectPanelData) => void>>,
  onDragstart: [Function, Array] as PropType<MaybeArray<(options: TreeDragDropOptions<any>) => void>>,
  onDragend: [Function, Array] as PropType<MaybeArray<(options: TreeDragDropOptions<any>) => void>>,
  onDragenter: [Function, Array] as PropType<MaybeArray<(options: TreeDragDropOptions<any>) => void>>,
  onDragleave: [Function, Array] as PropType<MaybeArray<(options: TreeDragDropOptions<any>) => void>>,
  onDragover: [Function, Array] as PropType<MaybeArray<(options: TreeDragDropOptions<any>) => void>>,
  onDrop: [Function, Array] as PropType<MaybeArray<(options: TreeDragDropOptions<any>) => void>>,
  onExpand: [Function, Array] as PropType<MaybeArray<(expanded: boolean, node: TreeSelectPanelData) => void>>,
  onSelect: [Function, Array] as PropType<MaybeArray<(selected: boolean, node: TreeSelectPanelData) => void>>,
  onSearch: [Function, Array] as PropType<MaybeArray<(searchValue: string) => void>>,
  onLoaded: [Function, Array] as PropType<MaybeArray<(loadedKeys: any[], node: TreeSelectPanelData) => void>>,
} as const
export type ProSearchTreeSelectPanelProps = ExtractInnerPropTypes<typeof proSearchTreeSelectPanelProps>

export const proSearchDatePanelProps = {
  panelType: {
    type: String as PropType<'datePicker' | 'dateRangePicker'>,
    required: true,
  },
  value: { type: [Date, Array] as PropType<Date | Date[]>, default: undefined },
  cellTooltip: Function as PropType<(cell: { value: Date; disabled: boolean }) => string | void>,
  disabledDate: Function as PropType<(date: Date) => boolean>,
  defaultOpenValue: [Date, Array] as PropType<Date | Date[]>,
  type: {
    type: String as PropType<DatePanelProps['type']>,
    default: 'date',
  },
  timePanelOptions: [Object, Array] as PropType<
    DatePanelProps['timePanelOptions'] | DateRangePanelProps['timePanelOptions']
  >,
  onChange: Function as PropType<(value: Date | Date[] | undefined) => void>,
  onConfirm: Function as PropType<() => void>,
  onCancel: Function as PropType<() => void>,
} as const
export type ProSearchDatePanelProps = ExtractInnerPropTypes<typeof proSearchDatePanelProps>
