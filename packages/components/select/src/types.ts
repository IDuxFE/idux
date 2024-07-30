/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { DndSortableOnDragStartArgs, DndSortableOnDropArgs, DndSortableReorderInfo } from '@idux/cdk/dnd'
import type { AbstractControl, ValidateStatus } from '@idux/cdk/forms'
import type { VirtualScrollMode, VirtualScrollToFn } from '@idux/cdk/scroll'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { EmptyProps } from '@idux/components/empty'
import type { FormSize } from '@idux/components/form'
import type { SpinProps } from '@idux/components/spin'
import type { OverlayContainerType } from '@idux/components/utils'
import type { DefineComponent, FunctionalComponent, HTMLAttributes, PropType, VNode, VNodeChild } from 'vue'

export interface SelectDndSortable {
  autoScroll?: boolean
  dragHandle?: boolean | string
}

export const selectPanelProps = {
  activeValue: { type: [String, Number, Symbol] as PropType<VKey>, default: undefined },
  selectedKeys: { type: Array as PropType<VKey[]>, default: undefined },
  childrenKey: { type: String, default: undefined },

  customAdditional: { type: Function as PropType<SelectCustomAdditional>, default: undefined },
  dataSource: { type: Array as PropType<SelectData[]>, default: undefined },
  dndSortable: { type: [Boolean, Object] as PropType<boolean | SelectDndSortable>, default: false },
  empty: { type: [String, Object] as PropType<'default' | 'simple' | EmptyProps>, default: 'simple' },
  getKey: { type: [String, Function] as PropType<string | ((data: SelectData<any>) => any)>, default: undefined },
  labelKey: { type: String, default: undefined },
  multiple: { type: Boolean, default: false },
  multipleLimit: { type: Number, default: Number.MAX_SAFE_INTEGER },
  virtual: { type: Boolean, default: false },
  virtualScrollMode: { type: String as PropType<VirtualScrollMode>, default: undefined },
  virtualItemHeight: { type: Number, default: 32 },

  // events
  'onUpdate:activeValue': [Function, Array] as PropType<MaybeArray<(value: any) => void>>,
  onOptionClick: [Function, Array] as PropType<MaybeArray<(option: SelectData<any>, evt: MouseEvent) => void>>,
  onScroll: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onScrolledChange: [Function, Array] as PropType<
    MaybeArray<(startIndex: number, endIndex: number, visibleData: SelectData<any>[]) => void>
  >,
  onScrolledBottom: [Function, Array] as PropType<MaybeArray<() => void>>,
  onDndSortReorder: [Function, Array] as PropType<MaybeArray<(reorderInfo: DndSortableReorderInfo) => void>>,
  onDndSortChange: [Function, Array] as PropType<
    MaybeArray<(newDataSource: SelectData[], oldDataSource: SelectData[]) => void>
  >,

  // private
  _virtualScrollHeight: { type: [Number, String] as PropType<number | 'auto' | '100%'>, default: 256 },
  _onDragStart: Function as PropType<(args: DndSortableOnDragStartArgs) => void>,
  _onDrop: Function as PropType<(args: DndSortableOnDropArgs) => void>,
} as const

export const selectProps = {
  control: {
    type: [String, Number, Object, Array] as PropType<string | number | (string | number)[] | AbstractControl>,
    default: undefined,
  },
  value: { type: [String, Number, Symbol, Array] as PropType<MaybeArray<VKey>>, default: undefined },
  open: { type: Boolean, default: undefined },

  allowInput: { type: Boolean, default: false },
  autocomplete: { type: String, default: 'off' },
  autofocus: { type: Boolean, default: false },
  borderless: { type: Boolean, default: undefined },
  childrenKey: { type: String, default: undefined },
  clearable: { type: Boolean, default: false },
  clearIcon: { type: String, default: undefined },
  customAdditional: { type: Object as PropType<SelectCustomAdditional>, default: undefined },
  dataSource: { type: Array as PropType<SelectData[]>, default: undefined },
  dndSortable: { type: [Boolean, Object] as PropType<boolean | SelectDndSortable>, default: false },
  disabled: { type: Boolean, default: false },
  empty: { type: [String, Object] as PropType<'default' | 'simple' | EmptyProps>, default: 'simple' },
  getKey: { type: [String, Function] as PropType<string | ((data: SelectData) => VKey)>, default: undefined },
  labelKey: { type: String, default: undefined },
  maxLabel: { type: [Number, String] as PropType<number | 'responsive'>, default: Number.MAX_SAFE_INTEGER },
  multiple: { type: Boolean, default: false },
  multipleLimit: { type: Number, default: Number.MAX_SAFE_INTEGER },
  offset: Array as unknown as PropType<[number, number]>,
  overlayClassName: { type: String, default: undefined },
  overlayContainer: {
    type: [String, HTMLElement, Function] as PropType<OverlayContainerType>,
    default: undefined,
  },
  overlayMatchWidth: { type: [Boolean, String] as PropType<boolean | 'minWidth'>, default: undefined },
  overlayRender: { type: Function as PropType<(children: VNode[]) => VNodeChild>, default: undefined },
  placeholder: { type: String, default: undefined },
  readonly: { type: Boolean, default: false },
  searchable: { type: [Boolean, String] as PropType<boolean | 'overlay'>, default: false },
  searchFn: { type: [Boolean, Function] as PropType<boolean | SelectSearchFn>, default: true },
  searchPlaceholder: { type: String, default: undefined },
  size: { type: String as PropType<FormSize>, default: undefined },
  status: String as PropType<ValidateStatus>,
  suffix: { type: String, default: undefined },
  spin: { type: [Boolean, Object] as PropType<boolean | SpinProps>, default: undefined },
  virtual: { type: Boolean, default: false },
  virtualScrollMode: { type: String as PropType<VirtualScrollMode>, default: undefined },
  virtualItemHeight: { type: Number, default: undefined },

  // events
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<(value: any) => void>>,
  'onUpdate:open': [Function, Array] as PropType<MaybeArray<(opened: boolean) => void>>,
  onChange: [Function, Array] as PropType<MaybeArray<(value: any, oldValue: any) => void>>,
  onClear: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onFocus: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onBlur: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onSearch: [Function, Array] as PropType<MaybeArray<(searchText: string) => void>>,
  onScroll: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onScrolledChange: [Function, Array] as PropType<
    MaybeArray<(startIndex: number, endIndex: number, visibleData: SelectData<any>[]) => void>
  >,
  onScrolledBottom: [Function, Array] as PropType<MaybeArray<() => void>>,
  onDndSortReorder: [Function, Array] as PropType<MaybeArray<(reorderInfo: DndSortableReorderInfo) => void>>,
  onDndSortChange: [Function, Array] as PropType<
    MaybeArray<(newDataSource: SelectData[], oldDataSource: SelectData[]) => void>
  >,

  // private
  overlayHeight: { type: Number, default: 256 },
} as const

export type SelectPanelProps = ExtractInnerPropTypes<typeof selectPanelProps>
export type SelectPanelPublicProps = Omit<ExtractPublicPropTypes<typeof selectPanelProps>, '_virtualScrollHeight'>
export interface SelectPanelBindings {
  scrollTo: VirtualScrollToFn
  changeActiveIndex: (offset: number) => void
}
export type SelectPanelComponent = DefineComponent<
  Omit<HTMLAttributes, keyof SelectPanelPublicProps> & SelectPanelPublicProps,
  SelectPanelBindings
>
export type SelectPanelInstance = InstanceType<DefineComponent<SelectPanelProps, SelectPanelBindings>>

export type SelectProps = ExtractInnerPropTypes<typeof selectProps>
export type SelectPublicProps = Omit<ExtractPublicPropTypes<typeof selectProps>, 'overlayHeight'>
export interface SelectBindings {
  blur: () => void
  focus: (options?: FocusOptions) => void
  scrollTo: VirtualScrollToFn
}
export type SelectComponent = DefineComponent<
  Omit<HTMLAttributes, keyof SelectPublicProps> & SelectPublicProps,
  SelectBindings
>
export type SelectInstance = InstanceType<DefineComponent<SelectProps, SelectBindings>>

export type SelectCustomAdditional = (options: {
  data: SelectData<any>
  index: number
}) => Record<string, any> | undefined

export interface SelectOptionProps<K = VKey> {
  disabled?: boolean
  key?: K
  label?: string | number

  customLabel?: string | ((data: SelectOptionProps<K>) => VNodeChild)

  [key: string]: any
}
export type SelectOptionPublicProps = SelectOptionProps
export type SelectOptionComponent = FunctionalComponent<
  Omit<HTMLAttributes, keyof SelectOptionPublicProps> & SelectOptionPublicProps
>

export interface SelectOptionGroupProps<K = VKey> {
  children?: SelectOptionProps<K>[]
  key?: K
  label?: string | number

  customLabel?: string | ((data: SelectOptionGroupProps<K>) => VNodeChild)

  [key: string]: any
}
export type SelectOptionGroupPublicProps = SelectOptionGroupProps
export type SelectOptionGroupComponent = FunctionalComponent<
  Omit<HTMLAttributes, keyof SelectOptionGroupPublicProps> & SelectOptionGroupPublicProps
>

export type SelectData<K = VKey> = SelectOptionProps<K> | SelectOptionGroupProps<K>
export interface FlattenedOption {
  key: VKey
  label: string
  disabled?: boolean
  rawData: SelectData
  type: 'group' | 'item'
  parentKey?: VKey
}

export type SelectSearchFn = (data: SelectData<any>, searchText: string) => boolean

export const optionProps = {
  disabled: { type: Boolean, default: false },
  index: { type: Number, required: true },
  label: { type: [String, Number] as PropType<string | number>, default: undefined },
  optionKey: { type: [String, Number, Symbol] as PropType<VKey>, required: true },
  rawData: { type: Object as PropType<SelectOptionProps>, required: true },
  parentKey: { type: [String, Number, Symbol] as PropType<VKey>, default: undefined },
} as const

export type OptionProps = ExtractInnerPropTypes<typeof optionProps>

export const optionGroupProps = {
  label: { type: [String, Number] as PropType<string | number>, default: undefined },
  index: { type: Number, required: true },
  rawData: { type: Object as PropType<SelectOptionGroupProps>, required: true },
} as const

export type OptionGroupProps = ExtractInnerPropTypes<typeof optionGroupProps>
