/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VirtualScrollToFn } from '@idux/cdk/scroll'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export interface CheckableListData {
  key?: VKey
  label?: string
  disabled?: boolean
  [key: string]: unknown
}

export interface CheckableListScroll {
  height?: string | number
  fullHeight?: boolean
}

export const checkableListProps = {
  dataSource: Array as PropType<CheckableListData[]>,
  checkable: {
    type: Boolean,
    default: true,
  },
  removable: {
    type: Boolean,
    default: false,
  },
  checked: Function as PropType<(item: CheckableListData) => boolean>,
  customAdditional: { type: Function as PropType<CheckableListCustomAdditional>, default: undefined },
  disabled: Function as PropType<(item: CheckableListData) => boolean>,
  getKey: Function as PropType<(item: CheckableListData) => VKey>,
  labelKey: String,
  virtual: {
    type: Boolean,
    default: false,
  },
  scroll: Object as PropType<CheckableListScroll>,
  onCheckChange: [Function, Array] as PropType<MaybeArray<(item: CheckableListData, checked: boolean) => void>>,
  onRemove: [Function, Array] as PropType<MaybeArray<(item: CheckableListData) => void>>,
  onScroll: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onScrolledChange: [Function, Array] as PropType<
    MaybeArray<(startIndex: number, endIndex: number, visibleData: unknown[]) => void>
  >,
  onScrolledBottom: [Function, Array] as PropType<MaybeArray<() => void>>,
} as const

export const checkableListItemProps = {
  checked: {
    type: Boolean,
    default: false,
  },
  checkable: {
    type: Boolean,
    default: true,
  },
  removable: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  label: String,
  value: {
    type: [String, Number, Symbol] as PropType<VKey>,
    required: true,
  },
  onCheckChange: [Function, Array] as PropType<MaybeArray<(checked: boolean) => void>>,
  onRemove: [Function, Array] as PropType<MaybeArray<() => void>>,
} as const

export interface CheckableListApi {
  scrollTo: VirtualScrollToFn
}

export type CheckableListProps = ExtractInnerPropTypes<typeof checkableListProps>
export type CheckableListItemProps = ExtractInnerPropTypes<typeof checkableListItemProps>
export type CheckableListPublicProps = ExtractPublicPropTypes<typeof checkableListProps>
export type CheckableListComponent = DefineComponent<
  Omit<HTMLAttributes, keyof CheckableListPublicProps> & CheckableListPublicProps,
  CheckableListApi
>
export type CheckableListInstance = InstanceType<DefineComponent<CheckableListProps, CheckableListApi>>

export type CheckableListCustomAdditional = (options: {
  data: CheckableListData
  index: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) => Record<string, any> | undefined
