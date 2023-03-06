/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { VirtualScrollToFn } from '@idux/cdk/scroll'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { TooltipProps } from '@idux/components/tooltip'
import type { DefineComponent, HTMLAttributes, PropType, VNodeChild } from 'vue'

import {
  type TableColumnBase,
  type TableColumnExpandable,
  type TableColumnIndexable,
  type TableColumnSelectable,
  ɵTableProps,
} from '@idux/components/table'

export const proTableProps = {
  ...ɵTableProps,
  columns: { type: Array as PropType<ProTableColumn[]>, default: () => [] },
  layoutTool: { type: [Boolean, Object] as PropType<boolean | ProTableLayoutToolPublicProps>, default: true },
  toolbar: { type: Array as PropType<Array<VNodeChild>>, default: undefined },

  // events
  onColumnsChange: [Function, Array] as PropType<MaybeArray<(columns: ProTableColumn[]) => void>>,
} as const

export type ProTableProps = ExtractInnerPropTypes<typeof proTableProps>
export type ProTablePublicProps = ExtractPublicPropTypes<typeof proTableProps>
export interface ProTableBindings {
  scrollTo: VirtualScrollToFn
}
export type ProTableComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ProTablePublicProps> & ProTablePublicProps,
  ProTableBindings
>
export type ProTableInstance = InstanceType<DefineComponent<ProTableProps, ProTableBindings>>

export const proTableLayoutToolProps = {
  changeSize: { type: Boolean, default: undefined },
  className: { type: String, default: undefined },
  placeholder: { type: String, default: undefined },
  resetable: { type: Boolean, default: undefined },
  searchable: { type: Boolean, default: undefined },
  searchValue: { type: String, default: undefined },
  visible: { type: Boolean, default: undefined },

  'onUpdate:searchValue': [Function, Array] as PropType<MaybeArray<(searchValue: string) => void>>,
  'onUpdate:visible': [Function, Array] as PropType<MaybeArray<(visible: boolean) => void>>,
  onReset: [Function, Array] as PropType<MaybeArray<(evt: MouseEvent) => boolean | void>>,
} as const

export type ProTableLayoutToolProps = ExtractInnerPropTypes<typeof proTableLayoutToolProps>
export type ProTableLayoutToolPublicProps = ExtractPublicPropTypes<typeof proTableLayoutToolProps>
export type ProTableLayoutToolComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ProTableLayoutToolPublicProps> & ProTableLayoutToolPublicProps
>
export type ProTableLayoutToolInstance = InstanceType<DefineComponent<ProTableLayoutToolProps>>

export type ProTableColumn<T = any, K = VKey> =
  | ProTableColumnBase<T, K>
  | ProTableColumnExpandable<T, K>
  | ProTableColumnSelectable<T, K>
  | ProTableColumnIndexable<T>

export interface ProTableColumnBase<T = any, K = VKey>
  extends TableColumnBase<T, K>,
    ProTableColumnResizable,
    ProTableColumnLayoutConfig {
  copyable?: boolean
  editable?: boolean
  tooltip?: string | TooltipProps
  tooltipIcon?: string

  children?: ProTableColumn<T, K>[]
}

export interface ProTableColumnExpandable<T = any, K = VKey>
  extends Omit<TableColumnExpandable<T, K>, keyof ProTableColumnBase>,
    ProTableColumnBase<T, K> {}

export interface ProTableColumnSelectable<T = any, K = VKey>
  extends TableColumnSelectable<T, K>,
    ProTableColumnResizable,
    ProTableColumnLayoutConfig {}

export interface ProTableColumnIndexable<T = any>
  extends TableColumnIndexable<T>,
    ProTableColumnResizable,
    ProTableColumnLayoutConfig {}

export type ProTableColumnLayoutConfig = {
  layoutable?: boolean
  changeFixed?: boolean
  changeIndex?: boolean
  changeVisible?: boolean
  visible?: boolean
}

export type ProTableColumnResizable = {
  maxWidth?: number | string
  minWidth?: number | string
  resizable?: boolean
}

// private
export const proTableLayoutToolContentProps = {
  placeholder: { type: String, default: undefined },
  resetable: { type: Boolean, required: true },
  searchable: { type: Boolean, required: true },
  searchValue: { type: String, default: undefined },

  'onUpdate:searchValue': [Function, Array] as PropType<MaybeArray<(searchValue: string) => void>>,
  onReset: [Function, Array] as PropType<MaybeArray<(evt: MouseEvent) => boolean | void>>,
} as const
