/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ItemData {
  key: VKey
  [prop: string]: any
}

export const overflowItemProps = {
  prefixCls: {
    type: String,
    required: true,
  },
  display: {
    type: Boolean,
    default: true,
  },
  itemKey: {
    type: [Number, String, Symbol] as PropType<VKey>,
    required: true,
  },
  data: Object as PropType<ItemData>,
  onSizeChange: Function as PropType<(entry: ResizeObserverEntry | undefined, key?: VKey) => void>,
} as const

export const overflowProps = {
  maxLabel: {
    type: [Number, String] as PropType<number | 'responsive'>,
    default: Number.MAX_SAFE_INTEGER,
  },
  getKey: {
    type: Function as PropType<(item: ItemData) => any>,
    required: true,
  },
  prefixCls: {
    type: String,
    required: true,
  },
  dataSource: {
    type: Array,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    default: () => [],
  },
} as const

export type OverflowProps = ExtractInnerPropTypes<typeof overflowProps>
export type OverflowItemProps = ExtractInnerPropTypes<typeof overflowItemProps>
export type OverflowPublicProps = ExtractPublicPropTypes<typeof overflowProps>
export type OverflowComponent = DefineComponent<Omit<HTMLAttributes, keyof OverflowPublicProps> & OverflowPublicProps>
export type OverflowInstance = InstanceType<DefineComponent<OverflowProps>>
