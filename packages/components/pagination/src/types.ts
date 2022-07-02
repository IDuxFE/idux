/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType, VNode } from 'vue'

export type PaginationSize = 'sm' | 'md'
export type PaginationItemType = 'page' | 'prev' | 'next' | 'prev5' | 'next5'
export interface PaginationItemRenderOptions {
  index?: number
  type: PaginationItemType
  active: boolean
  disabled: boolean
  original: VNode
}

export const paginationProps = {
  pageIndex: Number,
  pageSize: Number,
  disabled: {
    type: Boolean,
    default: false,
  },
  pageSizes: Array as PropType<number[]>,
  showQuickJumper: {
    type: Boolean,
    default: undefined,
  },
  showSizeChanger: {
    type: Boolean,
    default: undefined,
  },
  showTitle: {
    type: Boolean,
    default: undefined,
  },
  showTotal: {
    type: Boolean,
    default: undefined,
  },
  simple: {
    type: Boolean,
    default: undefined,
  },
  size: String as PropType<PaginationSize>,
  total: {
    type: Number,
    default: 0,
  },

  // events
  'onUpdate:pageIndex': [Function, Array] as PropType<MaybeArray<(pageIndex: number) => void>>,
  'onUpdate:pageSize': [Function, Array] as PropType<MaybeArray<(pageSize: number) => void>>,
  onChange: [Function, Array] as PropType<MaybeArray<(pageIndex: number, pageSize: number) => void>>,
} as const

export type PaginationProps = ExtractInnerPropTypes<typeof paginationProps>
export type PaginationPublicProps = ExtractPublicPropTypes<typeof paginationProps>
export type PaginationComponent = DefineComponent<
  Omit<HTMLAttributes, keyof PaginationPublicProps> & PaginationPublicProps
>
export type PaginationInstance = InstanceType<DefineComponent<PaginationProps>>

export const paginationItemProps = {
  disabled: {
    type: Boolean,
    default: undefined,
  },
  index: Number,
  type: {
    type: String as PropType<PaginationItemType>,
    required: true,
  },
} as const

export type PaginationItemProps = ExtractInnerPropTypes<typeof paginationItemProps>
